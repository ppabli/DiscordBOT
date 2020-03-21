exports.run = async (bot, message, args, reason) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);
	serverQueue.action = "siguiente";
	return serverQueue.dispatcher.end();

}

exports.conf = {

	comando: "siguiente",
	help: "Salta a la siguiente cancion de la playlist",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
