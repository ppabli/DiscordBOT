run = async (message) => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		message.delete();

		let embed = new DISCORD.MessageEmbed()
			.setAuthor("MiBOT")
			.setDescription("MiBOT reboot")
			.setColor(OTHER.generateColor())
			.addField("User name and ID:", `User name: ${message.author.username}\n ID: ${message.author.id}`)
			.setFooter(`Requested by: ${message.author.tag}`);

		BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

		control.rebootBot();

	} else {

		return message.channel.send("You can not reboot MiBOT");

	}

}

conf = {

	command: "restartBot",
	help: "Restart MiBOT",
	permits: ["ADMINISTRATOR"],
	usersID: ["296687569503256587"],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}