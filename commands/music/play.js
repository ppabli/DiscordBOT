exports.run = async (bot, message, contenido) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);

	if (!message.member.voiceChannel) {

		return message.channel.send("Necesitas estar en un canal de audio");

	}

	if (!message.guild.me.voiceChannel) {

		return message.channel.send("Necesito estar en un canal de audio");

	}

	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) {

		return message.channel.send("El bot no esta conectado a este canal de audio");

	}

	if (args[0] && isNaN(args[0])) {

		return require ("../musica/playlist").meterCancion(bot, message, args);

	}

	if (serverQueue) {

		if (!args[0]) {

			return require ("../musica/playlist").reproducir(bot, message, args);

		}

		if (!(isNaN(args[0]))) {

			serverQueue.action = "saltar";
			serverQueue.contador = args[0];
			return serverQueue.dispatcher.end();

		}

	} else {

		return message.channel.send("No tenemos una playlist activa");

	}

}

exports.conf = {

	comando: "play",
	help: "Ni puta idea de lo que hace esta mierda",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
