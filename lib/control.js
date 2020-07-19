
poweroffServer = () => {

	/* TODO Fix */

	console.log(process.platform);

	exec('sudo poweroff');

}

rebootServer = () => {

	/* TODO Fix */

	console.log(process.platform);

	exec('sudo reboot');

}

poweroffBot = message => {

	let embed = new discord.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("MiBOT poweroff")
		.setColor(OTHER.generateColor())
		.addField("User name and ID:", `User name: ${message.author.name}\n ID: ${message.author.id}`)
		.setFooter(`Requested by: ${message.author.tag}`);

	message.react('✅').then(x => BOT.destroy());

	console.log(`${message.author.username} with ID ${message.author.id} poweroff MiBOT`);

	BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.name === 'incidencias').send(embed);

	message.channel.send("```MiBOT successfully poweroff!```");

	return;

}

rebootBot = message => {

	let embed = new discord.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("MiBOT reboot")
		.setColor(OTHER.generateColor())
		.addField("User name and ID:", `User name: ${message.author.name}\n ID: ${message.author.id}`)
		.setFooter(`Solicitado por: ${message.author.tag}`);

	message.react('✅').then(x => BOT.destroy()).then(() => BOT.login(CONFIG.TOKEN));

	console.log(`${message.author.username} with ID ${message.author.id} rebooted MiBOT`);

	BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.name === 'incidencias').send(embed);

	message.channel.send("```MiBOT successfully rebooted!```");

	return;

}

module.exports = {poweroffBot, poweroffServer, rebootBot, rebootServer}