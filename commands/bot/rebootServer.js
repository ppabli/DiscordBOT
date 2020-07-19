run = async (message) => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		message.delete();

		let embed = new DISCORD.MessageEmbed()
			.setAuthor("MiBOT")
			.setDescription("Server reboot")
			.setColor(OTHER.generarColor())
			.addField("User name and ID:", `User name: ${message.author.username}\n ID: ${message.author.id}`)
			.setFooter(`Requested by: ${message.author.tag}`);

		BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

		control.reboot();

	} else {

		return message.channel.send("No puedes apagar el servidor!!");

	}

}

conf = {

	command: "rebootServer",
	help: "Reboot the computer where MiBOT is running",
	permits: ["ADMINISTRATOR"],
	usersID: ["296687569503256587"],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}