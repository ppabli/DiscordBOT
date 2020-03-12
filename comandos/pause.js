exports.run = async (bot, message, args, reason, pool) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);

	if (!serverQueue) {

		return message.channel.send("No existe una playlist en este servidor");

	}

	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) {

		return message.channel.send("El bot no esta conectado a este canal canal de audio");

	}

	if (serverQueue.dispatcher.paused) {

		return message.channel.send("La musica ya esta pausada");

	}

	if(serverQueue.status === "playing") {

		message.channel.send("Pausando la " + require ("../musica/playlist").obtenerInfoCancion(bot, message));
		serverQueue.status = "paused";
		return serverQueue.dispatcher.pause();

	} else {

		return message.channel.send("No se esta reproduciendo musica");

	}

}

exports.conf = {

	comando: "pause",
	help: "Pausa la cancion actual",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
