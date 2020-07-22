run = message => {

	let antiquity = TIME.transformMS(BOT.uptime);
	let daysSinceCreation = new Date(new Date().getTime() - BOT.uptime);

	let tiempoEmbed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setColor(OTHER.generateColor())
		.addField('Since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
		.addField('Created: ', `${daysSinceCreation.getFullYear()}-${daysSinceCreation.getMonth() + 1 < 10 ? '0' + (daysSinceCreation.getMonth() + 1): daysSinceCreation.getMonth() + 1}-${daysSinceCreation.getDate() < 10 ? '0' + daysSinceCreation.getDate(): daysSinceCreation.getDate()} | ${daysSinceCreation.getHours() < 10 ? '0' + daysSinceCreation.getHours(): daysSinceCreation.getHours()}:${daysSinceCreation.getMinutes() < 10 ? '0' + daysSinceCreation.getMinutes() :daysSinceCreation.getMinutes()}:${daysSinceCreation.getSeconds() < 10 ? '0' + daysSinceCreation.getSeconds():daysSinceCreation.getSeconds()}`)
		.setFooter(`Requested by: ${message.author.tag}`);

	return message.channel.send(tiempoEmbed);

}

conf = {

	command: "time",
	help: "Bot active time",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}
