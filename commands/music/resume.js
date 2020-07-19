exports.run = async (bot, message, contenido) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);

	if (serverQueue === undefined) {

		return;

	}

	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) {

		return message.channel.send("El bot no esta conectado a este canal canal de audio");

	}

	if (!serverQueue.dispatcher.paused) {

		return message.channel.send("La musica no esta pausada");

	}

	if (serverQueue.status === "paused") {

		message.channel.send("Reanudando la " + require ("../musica/playlist").obtenerInfoCancion(bot, message));
		serverQueue.status = "playing";
		return serverQueue.dispatcher.resume();

	} else {

		return message.channel.send("La musica no esta pausada");

	}

}

exports.conf = {

	comando: "resume",
	help: "Continua la cancion pausada",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
