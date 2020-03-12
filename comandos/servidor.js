exports.run = async (bot, message) => {

	return message.channel.send(`Nombre del servidor: ${message.guild.name}\nMiembros: ${message.guild.memberCount}`);

}

exports.conf = {

	comando: "servidor",
	help: "Muestra los datos del servidor",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
