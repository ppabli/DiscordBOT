exports.run = async (bot, message, args) => {

	return message.channel.send("Hola!!");

}

exports.conf = {

	comando: "hola",
	help: "No hace nada",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
