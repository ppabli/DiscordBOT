exports.apagar = (bot, message) => {
	
	let apagadoEmbed = new Discord.RichEmbed()
	.setAuthor("MiBOT")
	.setDescription("Apagado del MiBOT")
	.setColor(require ("../funciones/otros").generarColor())
	.addField("Nombre de usuario e ID:", `Usuario: ${message.author.username}\n ID: ${message.author.id}`)
	.setFooter(`Solicitado por: ${message.author.tag}`);
	
	message.react('✅').then(message => bot.destroy());
	
	console.log(`${message.author.username} con ID ${message.author.id} ha apagado MiBOT`);
	
	bot.guilds.get(message.guild.id).channels.find(x => x.name === "incidencias").send(apagadoEmbed);
	
	message.channel.send("```MiBOT se ha apagado correctamente!```");
	
	return;
	
}

exports.reiniciar = (bot, message) => {
	
	let reinicioEmbed = new Discord.RichEmbed()
	.setAuthor("MiBOT")
	.setDescription("Reinicio del MiBOT")
	.setColor(require ("../funciones/otros").generarColor())
	.addField("Nombre de usuario e ID:", `Usuario: ${message.author.username}\n ID: ${message.author.id}`)
	.setFooter(`Solicitado por: ${message.author.tag}`);
	
	message.react('✅').then(message => bot.destroy()).then(() => bot.login(config.TOKEN));
	
	console.log(`${message.author.username} con ID ${message.author.id} ha reiniciado MiBOT`);
	bot.guilds.get(message.guild.id).channels.find(x => x.name === "incidencias").send(reinicioEmbed);
	message.channel.send("```MiBOT se ha reiniciado correctamente!```");
	return;
	
}
