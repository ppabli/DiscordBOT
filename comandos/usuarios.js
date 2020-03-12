exports.run = async (bot, message, args, reason, conn) => {

	let listarMiembros = require('../funciones/listar');
	listarMiembros.cargarListaMiembros(bot, message);

	let listaMiembros = listarMiembros.obtenerListaMiembros();

	for (usuario in listaMiembros) {

		let embed = new discord.RichEmbed()
		.setAuthor("MiBOT")
		.setColor(require ("../funciones/otros").generarColor())
		.setDescription("Miembros de este servidor | Usuarios totales: " + message.member.guild.memberCount)
		.setFooter(`Solicitado por: ${message.author.tag}`);

		embed.addField("Nombre: ", " **" + listaMiembros[usuario].user.username + "**");
		embed.addField("Tag: ", " **" + listaMiembros[usuario].user.tag + "**");
		embed.addField("ID: ", "**" + listaMiembros[usuario].user.id + "**");
		embed.addField("Usuario creado: ", "**" + listaMiembros[usuario].user.createdAt + "**");

		message.channel.send(embed);

	}

	return;

}

exports.conf = {

	comando: "usuarios",
	help: "Muestra todos los usuarios del server",
	permisos: ["ADMINISTRATOR"],
	usuarioID: [""],
	categoria: ["Administracion"]

}
