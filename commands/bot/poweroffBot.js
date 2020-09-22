
run = message => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		let embed = new DISCORD.MessageEmbed()
			.setAuthor(BOT.user.tag)
			.setDescription("MiBOT poweroff")
			.setColor(OTHER.generateColor())
			.addField("User name and ID:", `User name: ${message.author.username}\n ID: ${message.author.id}`)
			.setFooter(`Requested by: ${message.author.tag}`)
			.setTimestamp();

		message.react('✅').then(x => BOT.destroy());

		console.log(`${message.author.username} with ID ${message.author.id} poweroff MiBOT`);

		BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

		message.channel.send("```MiBOT successfully poweroff!```");

		return;

	} else {

		return message.channel.send("You can not poweroff MiBOT");

	}

}

conf = {

	command: "poweroffBot",
	help: "Poweroff MiBOT",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}