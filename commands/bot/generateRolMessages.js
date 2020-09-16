run = message => {

	let channels = BOT.guilds.cache.find(g => g.name == message.guild.name).channels.cache.filter(c => c.messages != undefined && (c.id == CONFIG.WELCOME_CHANNEL_ID || c.id == CONFIG.ROLES_CHANNEL_ID)).map(c => c);

	for (channel in channels) {

		let embed = new DISCORD.MessageEmbed()
			.setAuthor(BOT.user.tag)
			.setColor(OTHER.generateColor())
			.setFooter(`Requested by: ${BOT.user.tag}`)
			.setTimestamp();

		if (channels[channel].id == CONFIG.WELCOME_CHANNEL_ID) {

			embed
				.setTitle("Auto role welcome message")
				.setDescription("To gain access to the server reacto to the message with: ")
				.addField('👍🏻', "Gain access to full public server");

		} else {

			let roles = ROLES.getAutoRoles();

			embed
				.setTitle("Auto role optional roles message")
				.setDescription("Reacto to one of the next emojis to gain the optional role and gain exclusive access to text and voice channels");

			for (rol in roles) {

				embed
					.addField(roles[rol].emojiName, roles[rol].description);

			}

		}

		channels[channel].send(embed);

	}

}

conf = {

	command: "generateRolMessages",
	help: "Generate messages where users can interect with reactions",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}