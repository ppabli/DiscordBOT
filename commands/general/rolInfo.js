run = message => {

	let rol = message.mentions.roles.first();

	if (rol) {

		let antiquity = TIME.transformMS(new Date().getTime() - rol.createdAt);
		let daysSinceCreation = new Date(rol.createdAt);

		let rolEmbed = new DISCORD.MessageEmbed()
			.setAuthor("MiBOT")
			.setColor(OTHER.generateColor())
			.setTitle(`Rol: ${rol.name}`)
			.addField('Members count: ', rol.members.size)
			.addField('Color (HEX): ', rol.hexColor)
			.addField('Age', `${antiquity.years} years - ${antiquity.days} days - ${antiquity.hours} hours - ${antiquity.minutes} minutes - ${antiquity.seconds} seconds`)
			.addField('Since: ', `${daysSinceCreation.getFullYear()}-${daysSinceCreation.getMonth() + 1 < 10 ? '0' + (daysSinceCreation.getMonth() + 1): daysSinceCreation.getMonth() + 1}-${daysSinceCreation.getDate() < 10 ? '0' + daysSinceCreation.getDate(): daysSinceCreation.getDate()} | ${daysSinceCreation.getHours() < 10 ? '0' + daysSinceCreation.getHours(): daysSinceCreation.getHours()}:${daysSinceCreation.getMinutes() < 10 ? '0' + daysSinceCreation.getMinutes() :daysSinceCreation.getMinutes()}:${daysSinceCreation.getSeconds() < 10 ? '0' + daysSinceCreation.getSeconds():daysSinceCreation.getSeconds()}`)
			.addField('Editable: ', rol.editable)
			.addField('Administrable: ', rol.managed)
			.addField('Rol ID: ', rol.id)
			.setFooter(`Requested by: ${message.author.tag}`);

		return message.channel.send(rolEmbed);

	} else {

		return message.channel.send("You need to tag some rol");

	}

}

conf = {

	command: "rolInfo",
	help: "Get rol info",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}