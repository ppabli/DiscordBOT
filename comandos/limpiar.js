exports.run = async (bot, message) => {

	let messageArray = message.content.split(" ");
	let args = messageArray.slice(1);
	let cantidad;

	if (args[0] === "todo") {

		cantidad = 100;

	} else {

		if (args[0] != null) {

			cantidad = Number(args[0]) + 1;

		} else {

			cantidad = 0;

		}

	}

	if (!message.member.hasPermission("ADMINISTRATOR")) {

		return message.channel.send("No tienes permiso para limpiar canales");

	} else {

		if (cantidad === 0) {

			return message.channel.send("Tienes que especificar un numero");

		} else {

			return message.channel.bulkDelete(cantidad).catch(error => message.channel.send(`Error al borrar los mensajes: ${error}`));

		}

	}

}

exports.conf = {

	comando: "limpiar",
	help: "Limpia los mensaje de un canal",
	permisos: ["ADMINISTRATOR"],
	usuarioID: [""],
	categoria: ["Administracion"]

}
