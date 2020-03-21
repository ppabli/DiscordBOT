const controlServidor = require('../funciones/controlServidor.js');

exports.run = async (bot, message, args) => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		message.delete();

		let embed = new discord.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("Reinicio del servidor (W)")
		.setColor(require ("../funciones/otros").generarColor())
		.addField("Nombre de usuario e ID:", `Usuario: ${message.author.username}\n ID: ${message.author.id}`)
		.setFooter(`Solicitado por: ${message.author.tag}`);

		bot.guilds.get(member.guild.id).channels.find(x => x.name === "incidencias").send(embed);

		controlServidor.restart();

	} else {

		return message.channel.send("No puedes apagar el servidor!!");

	}

}

exports.conf = {

	comando: "restart",
	help: "Reinicia el servidor en Windows",
	permisos: ["ADMINISTRATOR"],
	usuarioID: ["296687569503256587"],
	categoria: ["Administracion"]

}
