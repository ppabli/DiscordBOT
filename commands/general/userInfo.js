run = message => {

	let antiquity = TIME.transformMS(new Date().getTime() - message.member.joinedTimestamp);
	let daysSinceCreation = new Date(message.member.joinedTimestamp);

	let roles = message.member.roles.cache.map(r => r.name);
	roles.pop();

	let embed = new DISCORD.MessageEmbed()
		.setAuthor(BOT.user.tag)
		.setDescription("User information")
		.setColor(OTHER.generateColor())
		.addField('User name: ', message.member.user.username)
		.addField('User ID: ', message.member.user.id)
		.addField('User TAG: ', message.member.user.tag)
		.addField('Roles:', roles.length != 0 ? roles.join(', ') : '0 roles')
		.addField('Here since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
		.addField('Joined this server: ', daysSinceCreation.toUTCString())
		.setFooter(`Requested by: ${message.member.user.tag} | ${new Date().toUTCString()}`);

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