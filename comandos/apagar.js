exports.run = async (bot, message, args) => {

	if (message.member.hasPermission("ADMINISTRATOR")) {

		return require('../funciones/controlBOT').apagar(bot, message);

	} else {

		return message.channel.send("No puedes apagar el bot!!");

	}

}

exports.conf = {

	comando: "apagar",
	help: "Apagar el bot",
	permisos: ["ADMINISTRATOR"],
	usuarioID: [""],
	categoria: ["Administracion"]

}
