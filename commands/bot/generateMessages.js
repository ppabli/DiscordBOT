run = message => {

	let messageArray = message.content.split(" ");
	let languages = messageArray.slice(1);

	let channels = BOT.guilds.cache.find(g => g.name == message.guild.name).channels.cache.filter(c => c.messages != undefined && (c.id == CONFIG.WELCOME_CHANNEL_ID || c.id == CONFIG.ROLES_CHANNEL_ID)).map(c => c);

	let messages = MESSAGES.getMessages();

	for (channel in channels) {

		let embed = new DISCORD.MessageEmbed()
			.setAuthor(BOT.user.tag)
			.setColor(OTHER.generateColor())
			.setFooter(`Requested by: ${BOT.user.tag}`)
			.setTimestamp();

		if (messages[channels[channel].id]) {

			let finalTitle = "";
			let finalDescription = "";

			for (language in languages) {

				if (messages[channels[channel].id]["titles"][languages[language]]) {

					finalTitle += `${languages[language].toUpperCase()}: ${messages[channels[channel].id]["titles"][languages[language]]}\n`;

				}

				if (messages[channels[channel].id]["descriptions"][languages[language]]) {

					finalDescription += `${languages[language].toUpperCase()}: ${messages[channels[channel].id]["descriptions"][languages[language]]}\n`;

				}

			}

			embed.setTitle(finalTitle);
			embed.setDescription(finalDescription);

			for (field in messages[channels[channel].id]["fields"]) {

				let finalFieldDescription = "";

				for (language in languages) {

					if (messages[channels[channel].id]["fields"][field]["descriptions"][languages[language]]) {

						finalFieldDescription += `${languages[language].toUpperCase()}: ${messages[channels[channel].id]["fields"][field]["descriptions"][languages[language]]}\n`;

					}

				}

				embed.addField(messages[channels[channel].id]["fields"][field]["emojiName"], finalFieldDescription);

			}

			channels[channel].send(embed);

		}

	}

}

conf = {

	command: "generateMessages",
	help: "Generate messages",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}