exports.run = async (bot, message, args) => {

	if (message.member.hasPermission("ADMINISTRATOR")) {

		return message.channel.send("Comando de pruebas");

	}

}

exports.conf = {

	comando: "pruebas",
	help: "Comando de pruebas",
	permisos: ["ADMINISTRATOR"],
	usuarioID: ["296687569503256587"],
	categoria: ["Otros"]

}
