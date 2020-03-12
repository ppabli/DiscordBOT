exports.run = async (bot, message, args, reason, pool) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);
	serverQueue.action = "anterior";
	return serverQueue.dispatcher.end();

}

exports.conf = {

	comando: "anterior",
	help: "Salta a la anterior cancion de la playlist",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
