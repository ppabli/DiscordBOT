exports.run = async (bot, message, args, reason, pool) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);

	if (message.member.hasPermission("ADMINISTRATOR")) {

		if (serverQueue) {

			message.channel.send("Se ha borrado la playlist");

			serverQueue.songs = []
			serverQueue.status = "playing";
			serverQueue.action = "siguiente";
			serverQueue.dispatcher.end();

			return;

		} else {

			return message.channel.send("No tenemos una playlist activa");

		}

	} else {

		return message.channel.send("No tienes permisos para usar este comando");

	}

}

exports.conf = {

	comando: "borrarplaylist",
	help: "Elimina la playlist",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
