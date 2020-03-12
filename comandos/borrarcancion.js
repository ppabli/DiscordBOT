const youtubeAPI = require("simple-youtube-api");
const youtube = new youtubeAPI(config.GOOGLE_API_KEY);

exports.run = async (bot, message, args, reason, pool) => {

	let serverQueue = require("../musica/playlist").obtenerQueue(message);

	let nombreCancion = "";

	let cancionesBorrar = [];

	let numeroCanciones = 0;

	if (!message.member.hasPermission("ADMINISTRATOR")) {

		return message.channel.send("No tienes permisos para usar este comando");

	}

	if (!serverQueue) {

		return message.channel.send("No tenemos una playlist activa");

	}

	if (serverQueue.songs.length === 0) {

		return message.channel.send("No tenemos canciones en la playlist");

	}

	if (args.length === 0) {

		return message.channel.send("Necesito la posicion o el nombre de la cancion");

	}

	for (contador in args) {

		if (args[contador].toString() === " " && nombreCancion.toString() != "") {

			nombreCancion = nombreCancion + args[contador];

			continue;

		}

		if (args[contador].toString() === "|" && nombreCancion.toString() != "") {

			cancionesBorrar.push(nombreCancion);
			nombreCancion = "";

			continue;

		}

		if (isNaN(args[contador]) && args[contador].toString() != "|" && args[contador].toString() != " ") {

			nombreCancion = nombreCancion + args[contador];

			continue;

		}

		if (!(isNaN(args[contador])) && args[contador].toString() != "|" && args[contador].toString() != " ") {

			cancionesBorrar.push(args[contador]);

			continue;

		}

	}

	if (nombreCancion != "") {

		cancionesBorrar.push(nombreCancion);
		nombreCancion = "";

	}

	numeroCanciones = serverQueue.songs.length - 1;

	while (cancionesBorrar.length > 0) {

		for (canciones in cancionesBorrar) {

			if (!(isNaN(cancionesBorrar[canciones]))) {

				if (numeroCanciones >= cancionesBorrar[canciones]) {

					message.channel.send("Se ha eliminado la cancion: **" + serverQueue.songs[canciones].title + "** | Solicitada por: **" + serverQueue.songs[canciones].requester + "**. ");
					serverQueue.songs.splice(canciones, 1);
					cancionesBorrar.splice(canciones, 1);

				} else {

					message.channel.send("No hemos encontrado esa cancion en la playlist. Error 0");
					cancionesBorrar.splice(canciones, 1);

				}

			} else {

				let video = undefined;

				try {

					video = await yotube.getVideo(cancionesBorrar[canciones], 1);

				} catch (error) {
	
					try {

						let videos = await youtube.searchVideos(cancionesBorrar[canciones], 1);
						video = await youtube.getVideoByID(videos[0].id, 1);

					} catch (error) {

						return message.channel.send("No encontre ningun video");

					}

				}

				for (contador3 in serverQueue.songs) {

					if ((serverQueue.songs[contador3].url.toString() === ("https://www.youtube.com/watch?v=" + video.id)) || (serverQueue.songs[contador3].title.toString() === video.title.toString())) {

					message.channel.send("Se ha eliminado la cancion: **" + serverQueue.songs[contador3].title + "** | Solicitada por: **" + serverQueue.songs[contador3].requester + "**. ");
					serverQueue.songs.splice(contador3, 1);
					cancionesBorrar.splice(contador3, 1);

					} else {

						message.channel.send("No hemos encontrado esa cancion en la playlist. Error 1");
						cancionesBorrar.splice(contador3, 1);

					}

				}

			}

		}

	}

	if (serverQueue.songs.length === 0 && cancionesBorrar.length === 0) {

		serverQueue.status = "playing";
		serverQueue.action = "siguiente";
		serverQueue.dispatcher.end();

	}

	return;

}

exports.conf = {

	comando: "borrarcancion",
	help: "Elimina la cancion seleccionada",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}