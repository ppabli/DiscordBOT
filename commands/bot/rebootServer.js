run = async message => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		let embed = new DISCORD.MessageEmbed()
			.setAuthor(BOT.user.tag)
			.setDescription("Server reboot")
			.setColor(OTHER.generateColor())
			.addField("User name and ID:", `User name: ${message.author.username}\n ID: ${message.author.id}`)
			.setFooter(`Requested by: ${message.author.tag}`)
			.setTimestamp();

		BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

		if (OS.platform() === 'win32') {

			EXEC("shutdown -r");

		} else {

			EXEC('sudo reboot');

		}

	} else {

		return message.channel.send("You can not reboot the server");

	}

}

conf = {

	command: "rebootServer",
	help: "Reboot the computer where MiBOT is running",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	channelsID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}