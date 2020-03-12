exports.run = async (bot, message) => {

	let tiempo = require('../funciones/tiempo').convertirMS(bot.uptime);
	let uptime = tiempo.d + " Dias : " + tiempo.h + " Horas : " + tiempo.m + " Minutos : " + tiempo.s + " Segundos";

	let tiempoEmbed = new discord.RichEmbed()
	.setAuthor("MiBOT")
	.setColor(require ("../funciones/otros").generarColor())
	.addField("**Tiempo Activo :**", `${uptime}`)
	.setFooter(`Solicitado por: ${message.author.tag}`);

	return message.channel.send(tiempoEmbed);

}

exports.conf = {

	comando: "tiempo",
	help: "Muestra el tiempo activo del bot",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
