run = (message) => {

	let antiquity = TIME.transformMS(new Date().getTime() - message.guild.joinedTimestamp);
	let daysSinceCreation = new Date(message.guild.joinedTimestamp);

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("Server information")
		.setColor(OTHER.generateColor())
		.addField('Server name: ', message.guild.name)
		.addField('Server ID: ', message.guild.id)
		.addField('Server region: ', message.guild.region)
		.addField('Server owner ID:', message.guild.ownerID)
		.addField('Server member count:', message.guild.memberCount)
		.addField('Since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
		.addField('Created: ', `${daysSinceCreation.getFullYear()}-${daysSinceCreation.getMonth() + 1 < 10 ? '0' + (daysSinceCreation.getMonth() + 1): daysSinceCreation.getMonth() + 1}-${daysSinceCreation.getDate() < 10 ? '0' + daysSinceCreation.getDate(): daysSinceCreation.getDate()} | ${daysSinceCreation.getHours() < 10 ? '0' + daysSinceCreation.getHours(): daysSinceCreation.getHours()}:${daysSinceCreation.getMinutes() < 10 ? '0' + daysSinceCreation.getMinutes() :daysSinceCreation.getMinutes()}:${daysSinceCreation.getSeconds() < 10 ? '0' + daysSinceCreation.getSeconds():daysSinceCreation.getSeconds()}`)
		.setFooter(`Requested by: ${message.author.tag}`);

	return message.channel.send(embed);

}

conf = {

	command: "serverInfo",
	help: "Server info",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}