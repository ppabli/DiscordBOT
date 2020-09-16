run = message => {

	let memberList = LIST.getMembers(message.guild);

	for (member in memberList) {

		let antiquity = TIME.transformMS(new Date().getTime() - memberList[member].joinedTimestamp);
		let daysSinceCreation = new Date(memberList[member].joinedTimestamp);

		let roles = memberList[member].roles.cache.map(r => r.name);
		roles.pop();

		let embed = new DISCORD.MessageEmbed()
			.setAuthor(BOT.user.tag)
			.setColor(OTHER.generateColor())
			.setDescription("Total server users: " + message.member.guild.memberCount)
			.addField('User name: ', memberList[member].user.username)
			.addField('User ID: ', memberList[member].user.id)
			.addField('Roles:', roles.length != 0 ? roles.join(', ') : '0 roles')
			.addField('Here since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
			.addField('Joined this server: ', daysSinceCreation.toUTCString())
			.setFooter(`Requested by: ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);

	}

	return message.channel.send("All done!!");

}

conf = {

	command: "users",
	help: "Show server users",
	permits: ["ADMINISTRATOR"],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}
