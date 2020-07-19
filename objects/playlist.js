const ytdl = require('ytdl-core');
const queue = new Map();
const YouTube = require ("simple-youtube-api");
const youtube = new YouTube(config.GOOGLE_API_KEY);

exports.meterCancion = async (bot, message, args) => {

	let serverQueue = queue.get(message.guild.id);

	let nombreCancion = "";

	for (contador in args) {

		nombreCancion = nombreCancion + args[contador] + " ";

	}

	let video = undefined;

	try {

		video = await yotube.getVideo(nombreCancion, 1);

	} catch (error) {

		try {

			let videos = await youtube.searchVideos(nombreCancion, 1);
			video = await youtube.getVideoByID(videos[0].id, 1);

		} catch (error) {

			return message.channel.send("No encontre ningun video");

		}

	}

	if (serverQueue) {

		for (contador in serverQueue.songs) {

			if (serverQueue.songs[contador].url.toString() === ("https://www.youtube.com/watch?v=" + video.id) || serverQueue.songs[contador].title.toString() === video.title.toString()) {

				serverQueue.action = "saltar";
				serverQueue.contador = contador;
				return serverQueue.dispatcher.end();

			}

		}

	}

	let song = {

		title: video.title,
		url: "https://www.youtube.com/watch?v=" + video.id,
		requester: message.author.tag,

	};

	if (serverQueue === undefined) {

		const queueConstruct = {

			textChannel: message.channel,
			voiceChannel: message.member.voiceChannel,
			connection: undefined,
			dispatcher: undefined,
			songs: [],
			contador: 0,
			action: undefined,
			status: undefined,

		}

		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		queueConstruct.connection = await message.member.voiceChannel.join();

		return require("./playlist").reproducir(bot, message);

	} else {

		serverQueue.songs.push(song);

		let embed = new Discord.RichEmbed()
		.setAuthor("MiBOT")
		.setTitle("Playlist de MiBOT")
		.setColor(require ("../functions/otros").generarColor())
		.setFooter(`Solicitado por: MiBOT`)
		.addField("Posicion de la canción: ", " ```" + serverQueue.songs.indexOf(song) + "``` ")
		.addField("Canción: ", " ```" + song.title + "``` ")
		.addField("Solicitada por: ", " ```" + song.requester + "``` ")
		.addField("URL: ", " ```" + song.url + "``` ")
		.setDescription("Se ha añadido a la playlist: ");

		return message.channel.send(embed);

	}

}

exports.reproducir = (bot, message) => {

	let serverQueue = require ("./playlist").obtenerQueue(message);

	if (!serverQueue) {

		return message.channel.send("No hay ninguna playlist almacenada");

	}

	if (serverQueue.status === "paused") {

		serverQueue.dispatcher.resume();

	}
	
	if (serverQueue.songs.length <= 0) {

		queue.set(message.guild.id, undefined);
		return;

	}

	if (serverQueue.contador >= serverQueue.songs.length) {

		serverQueue.contador = 0;

	}

	if (serverQueue.contador < 0) {

		serverQueue.contador = serverQueue.songs.length - 1;

	}

	let embed = new Discord.RichEmbed()
	.setAuthor("MiBOT")
	.setTitle("Playlist de MiBOT")
	.setColor(require ("../functions/otros").generarColor())
	.setFooter(`Solicitado por: MiBOT`)
	.addField("Posicion de la canción: ", " ```" + serverQueue.songs.indexOf(serverQueue.songs[serverQueue.contador]) + "``` ")
	.addField("Canción: ", " ```" + serverQueue.songs[serverQueue.contador].title + "``` ")
	.addField("Solicitada por: ", " ```" + serverQueue.songs[serverQueue.contador].requester + "``` ")
	.addField("URL: ", " ```" + serverQueue.songs[serverQueue.contador].url + "``` ")
	.setDescription("Se va a reproducir: ");

	message.channel.send(embed);

	serverQueue.status = "playing";

	return serverQueue.dispatcher = serverQueue.connection.playStream(ytdl(serverQueue.songs[serverQueue.contador].url, {filter: 'audioonly'})).on('end', () => {require ("./playlist").siguiente(bot, message)});

}

exports.siguiente = (bot, message) => {

	let serverQueue = require ("./playlist").obtenerQueue(message);

	if (serverQueue.connection === null) {

		return;

	}
	
	if (serverQueue.action === "siguiente") {

		serverQueue.action = undefined;
		serverQueue.contador = serverQueue.contador + 1;
		return require("./playlist").reproducir(bot, message);

	}
	
	if (serverQueue.action === "anterior") {

		serverQueue.action = undefined;
		serverQueue.contador = serverQueue.contador - 1;
		return require("./playlist").reproducir(bot, message);

	}

	if (serverQueue.action === "saltar"){

		serverQueue.action = undefined;
		return require("./playlist").reproducir(bot, message);

	}

	if (serverQueue.action === undefined) {

		serverQueue.contador = serverQueue.contador + 1;
		return require("./playlist").reproducir(bot, message);

	}

}

exports.obtenerContador = (message) => {

	let serverQueue = require ("./playlist").obtenerQueue(message);
	return serverQueue.contador;

}

exports.setContador = (message, contador) => {

	let serverQueue = require ("./playlist").obtenerQueue(message);
	serverQueue.contador = contador;
	return;

}

exports.obtenerQueue = message => {

	return queue.get(message.guild.id);

}

exports.obtenerInfoCancion = (bot, message) => {

	let serverQueue = require ("./playlist").obtenerQueue(message);
	return ("cancion: **" + serverQueue.songs[serverQueue.contador].title + "** | Solicitada por: **" + serverQueue.songs[serverQueue.contador].requester + "**. ");

}