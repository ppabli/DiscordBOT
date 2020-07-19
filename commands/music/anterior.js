run = async (message, contenido) => {

	/* TODO Fix run command */

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);
	serverQueue.action = "anterior";
	return serverQueue.dispatcher.end();

}

conf = {

	command: "anterior",
	help: "Salta a la anterior cancion de la playlist",
	permits: [],
	usersID: [],
	category: [__dirname.split('/')[__dirname.split('/').length - 1]]

}

module.exports = {run, config}