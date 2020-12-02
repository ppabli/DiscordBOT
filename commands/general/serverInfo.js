run = message => {

	let antiquity = TIME.transformMS(new Date().getTime() - message.guild.joinedTimestamp);
	let daysSinceCreation = new Date(message.guild.joinedTimestamp);

	let embed = new DISCORD.MessageEmbed()
		.setAuthor(BOT.user.tag)
		.setDescription("Server information")
		.setColor(OTHER.generateColor())
		.addField('Server name: ', message.guild.name)
		.addField('Server ID: ', message.guild.id)
		.addField('Server region: ', message.guild.region)
		.addField('Server owner ID:', message.guild.ownerID)
		.addField('Server member count:', message.guild.memberCount)
		.addField('Since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
		.addField('Created: ', daysSinceCreation.toUTCString())
		.setFooter(`Requested by: ${message.author.tag}`)
		.setTimestamp();

	return message.channel.send(embed);

}

conf = {

	command: "serverInfo",
	help: "Server info",
	permits: [],
	usersID: [],
	channelsID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}