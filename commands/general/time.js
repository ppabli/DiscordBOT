run = message => {

	let antiquity = TIME.transformMS(BOT.uptime);
	let daysSinceCreation = new Date(new Date().getTime() - BOT.uptime);

	let tiempoEmbed = new DISCORD.MessageEmbed()
		.setAuthor(BOT.user.tag)
		.setColor(OTHER.generateColor())
		.addField('Since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
		.addField('Created: ', daysSinceCreation.toUTCString())
		.setFooter(`Requested by: ${message.author.tag}`)
		.setTimestamp();

	return message.channel.send(tiempoEmbed);

}

conf = {

	command: "time",
	help: "Bot active time",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}
