exports.run = async (bot, message, contenido) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);

	if (message.guild.me.voiceChannel) {

		return message.channel.send("El bot ya esta en un canal de audio");

	}

	if (!message.member.voiceChannel) {

		return message.channel.send("Necesitas estar en un canal de audio");

	}

	if (message.guild.me.voiceChannelID === message.member.voiceChannelID) {

		return message.channel.send("El bot ya esta conectado a este canal canal de audio");

	}

	if (serverQueue) {

		if (!serverQueue.connection || serverQueue.connection === null) {

			serverQueue.connection = await message.member.voiceChannel.join();

		}

	} else {

		message.member.voiceChannel.join();

	}

	return message.channel.send("Hola...");

}

exports.conf = {

	comando: "join",
	help: "Une el bot al canal de audio",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"],

}
