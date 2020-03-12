exports.run = async (bot, message, args, reason, pool) => {

	let serverQueue = require ("../musica/playlist").obtenerQueue(message);

	if (serverQueue) {

		if (serverQueue.songs.length === 0) {

			return message.channel.send("La playlist esta vacia");

		}

		for (canciones in serverQueue.songs){

			let embed = new discord.RichEmbed()
			.setAuthor("MiBOT")
			.setTitle("Playlist de MiBOT")
			.setColor(require ("../funciones/otros").generarColor())
			.setFooter(`Solicitado por: ${message.author.tag}`)
			.addField("Posicion de la canción: ", " ```" + canciones + "``` ")
			.addField("Canción: ", " ```" + serverQueue.songs[canciones].title + "``` ")
			.addField("Solicitada por: ", " ```" + serverQueue.songs[canciones].requester + "``` ")
			.addField("URL: ", " ```" + serverQueue.songs[canciones].url + "``` ")
			.setDescription("Información de la canción: ");

			message.channel.send(embed);

		}

		return;

	} else {

		return message.channel.send("No tenemos una queue activa");

	}

}

exports.conf = {

	comando: "playlist",
	help: "Obtiene la playlist del servidor",
	permisos: [""],
	usuarioID: [""],
	categoria: ["Musica"]

}
