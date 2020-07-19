run = async (message) => {

	/*TODO FIX Roles */

	let memberList = LIST.getMembers(message.guild);

	for (member in memberList) {

		let antiquity = TIME.transformMS(new Date().getTime() - memberList[member].joinedTimestamp);
		let daysSinceCreation = new Date(memberList[member].joinedTimestamp);

		let roles = [];

		let embed = new DISCORD.MessageEmbed()
			.setAuthor("MiBOT")
			.setColor(OTHER.generateColor())
			.setDescription("Total server users: " + message.member.guild.memberCount)
			.addField('User name: ', memberList[member].user.username)
			.addField('User ID: ', memberList[member].user.id)
			.addField('User TAG: ', memberList[member].user.tag)
			// addField('Roles:', roles.length != 0 ? roles.join(', ') : '0 roles')
			.addField('Here since', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
			.addField('Joined this server: ', `${daysSinceCreation.getFullYear()}-${daysSinceCreation.getMonth() + 1 < 10 ? '0' + (daysSinceCreation.getMonth() + 1): daysSinceCreation.getMonth() + 1}-${daysSinceCreation.getDate() < 10 ? '0' + daysSinceCreation.getDate(): daysSinceCreation.getDate()} | ${daysSinceCreation.getHours() < 10 ? '0' + daysSinceCreation.getHours(): daysSinceCreation.getHours()}:${daysSinceCreation.getMinutes() < 10 ? '0' + daysSinceCreation.getMinutes() :daysSinceCreation.getMinutes()}:${daysSinceCreation.getSeconds() < 10 ? '0' + daysSinceCreation.getSeconds():daysSinceCreation.getSeconds()}`)
			.setFooter(`Requested by: ${memberList[member].user.user.tag}`);

		message.channel.send(embed);

	}

	return;

}

conf = {

	command: "users",
	help: "Show server users",
	permits: ["ADMINISTRATOR"],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}
