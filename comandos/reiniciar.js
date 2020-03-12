exports.run = async (bot, message, args) => {

	if (!message.member.hasPermission("ADMINISTRATOR")) {

		return message.channel.send("No puedes usar el comando porque no eres DEVELOPER");

	} else {

		return require('../funciones/controlBOT').reiniciar(bot, message);

	}

}

exports.conf = {

	comando: "reiniciar",
	help: "Reinicia el bot",
	permisos: ["ADMINISTRATOR"],
	usuarioID: [""],
	categoria: ["Administracion"]

}
