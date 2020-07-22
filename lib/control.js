
poweroffServer = message => {

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("Server poweroff")
		.setColor(OTHER.generateColor())
		.addField("User name and ID:", `User name: ${message.author.username}\n ID: ${message.author.id}`)
		.setFooter(`Requested by: ${message.author.tag}`);

	BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

	if (OS.platform() === 'win32') {

		EXEC("shutdown -p");

	} else {

		EXEC('sudo poweroff');

	}

}

rebootServer = message => {

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("Server reboot")
		.setColor(OTHER.generateColor())
		.addField("User name and ID:", `User name: ${message.author.username}\n ID: ${message.author.id}`)
		.setFooter(`Requested by: ${message.author.tag}`);

	BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

	if (OS.platform() === 'win32') {

		EXEC("shutdown -r");

	} else {

		EXEC('sudo reboot');

	}

}

poweroffBot = message => {

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("MiBOT poweroff")
		.setColor(OTHER.generateColor())
		.addField("User name and ID:", `User name: ${message.author.name}\n ID: ${message.author.id}`)
		.setFooter(`Requested by: ${message.author.tag}`);

	message.react('✅').then(x => BOT.destroy());

	console.log(`${message.author.username} with ID ${message.author.id} poweroff MiBOT`);

	BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

	message.channel.send("```MiBOT successfully poweroff!```");

	return;

}

rebootBot = message => {

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("MiBOT reboot")
		.setColor(OTHER.generateColor())
		.addField("User name and ID:", `User name: ${message.author.name}\n ID: ${message.author.id}`)
		.setFooter(`Requested by: ${message.author.tag}`);

	message.react('✅').then(x => BOT.destroy()).then(() => BOT.login(CONFIG.TOKEN));

	console.log(`${message.author.username} with ID ${message.author.id} rebooted MiBOT`);

	BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

	message.channel.send("```MiBOT successfully rebooted!```");

	return;

}

module.exports = {poweroffBot, poweroffServer, rebootBot, rebootServer}