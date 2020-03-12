exports.run = async (bot, message) => {

	return message.channel.send(`Usuario: ${message.author.username}\nTag: ${message.author.tag}\nID: ${message.author.id}`);

}

exports.conf = {

	comando: "info",
	help: "Propociona informacion del servidor",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
