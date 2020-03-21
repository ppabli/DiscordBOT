exports.run = async (bot, message, args, reason) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);

	if (!message.member.voiceChannel) {

		return message.channel.send("Necesitas estar en un canal de audio");

	}

	if (!message.guild.me.voiceChannel) {

		return message.channel.send("El bot no esta conectado a ningun canal de audio");

	}

	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) {

		return message.channel.send("El bot no esta conectado a este canal canal de audio");

	}
	
	if (serverQueue) {

		serverQueue.connection = null;
		serverQueue.status = undefined;
		serverQueue.dispatcher.end();
		message.member.voiceChannel.leave();

	} else {

		message.member.voiceChannel.leave();

	}

	return message.channel.send("Adios...");

}

exports.conf = {

	comando: "leave",
	help: "Hace que el bot abandone el canal de audio",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
