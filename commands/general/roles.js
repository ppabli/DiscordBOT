run = (message) => {

	/* TODO Fix run */

	let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

	if (!role) {

		role = message.member.highestRole;

	}

	let rolEmbed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setColor(OTHER.generateColor())
		.setTitle(`Rol: ${role.name}`)
		.addField('Members count: ', role.members.size, true)
		.addField('Color (HEX): ', role.hexColor, true)
		.addField('Created: ', role.createdAt.toDateString(), true)
		.addField('Editable: ', role.editable.toString(), true)
		.addField('Administrable: ', role.managed.toString(), true)
		.addField('Rol ID: ', role.id, true)
		.setFooter(`Requested by: ${message.author.tag}`);

	return message.channel.send(rolEmbed);

}

conf = {

	command: "roles",
	help: "Get rol info",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}