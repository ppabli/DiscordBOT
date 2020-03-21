const discord = require("discord.js");

exports.run = async (bot, message, args) => {

	let pingMensaje = Date.now();

	let pingCorrecion = Date.now() - pingMensaje;

	let pingEmbed = new discord.MessageEmbed()
	.setColor(require ("../funciones/otros").generarColor())
	.addField('Ping MiBOT: ', '~' + Math.floor(bot.ping) + 'ms')
	.addField('Ping del mensaje: ', '~' + Math.round(pingCorrecion) + 'ms')
	.setFooter(`Solicitado por: ${message.author.tag}`);

	return message.channel.send(pingEmbed);

}

exports.conf = {

	comando: "ping",
	help: "Propociona informacion sobre el ping",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
