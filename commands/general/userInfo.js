run = message => {

	let antiquity = TIME.transformMS(new Date().getTime() - message.member.joinedTimestamp);
	let daysSinceCreation = new Date(message.member.joinedTimestamp);

	let roles = message.member.roles.cache.map(r => r.name);
	roles.pop();

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("User information")
		.setColor(OTHER.generateColor())
		.addField('User name: ', message.member.user.username)
		.addField('User ID: ', message.member.user.id)
		.addField('User TAG: ', message.member.user.tag)
		.addField('Roles:', roles.length != 0 ? roles.join(', ') : '0 roles')
		.addField('Here since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
		.addField('Joined this server: ', `${daysSinceCreation.getFullYear()}-${daysSinceCreation.getMonth() + 1 < 10 ? '0' + (daysSinceCreation.getMonth() + 1): daysSinceCreation.getMonth() + 1}-${daysSinceCreation.getDate() < 10 ? '0' + daysSinceCreation.getDate(): daysSinceCreation.getDate()} | ${daysSinceCreation.getHours() < 10 ? '0' + daysSinceCreation.getHours(): daysSinceCreation.getHours()}:${daysSinceCreation.getMinutes() < 10 ? '0' + daysSinceCreation.getMinutes() :daysSinceCreation.getMinutes()}:${daysSinceCreation.getSeconds() < 10 ? '0' + daysSinceCreation.getSeconds():daysSinceCreation.getSeconds()}`)
		.setFooter(`Requested by: ${message.member.user.tag}`);

	return message.channel.send(embed);

}

conf = {

	command: "userInfo",
	help: "Get user info",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}