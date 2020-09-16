run = message => {

	let commands = COMMANDS.getComands();

	let command = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/g).shift();

	for(command in commands) {

		let totalCommands = 0;

		let embed = new DISCORD.MessageEmbed()
			.setAuthor(BOT.user.tag)
			.setColor(OTHER.generateColor())
			.setFooter(`Requested by: ${message.author.tag}`)
			.setTimestamp();

		if (commands[command]) {

			let havePermits = false;
			let haveID = false;

			if (commands[command].conf.permits.length == 0) {

				havePermits = true;

			} else {

				for (i in commands[command].conf.permits) {

					if (message.member.hasPermission(commands[command].conf.permits[i])) {

						havePermits = true;

					} else {

						havePermits = false;

					}

				}

			}

			if (commands[command].conf.usersID.length == 0) {

				haveID = true;

			} else {

				for (userID in commands[command].conf.usersID) {

					if (message.author.id === commands[command].conf.usersID[userID]) {

						haveID = true;

						break;

					}

				}

			}

			if (haveID === true && havePermits === true) {

				embed.addField(CONFIG.PREFIX + commands[command].conf.command, commands[command].conf.help);
				totalCommands++;

			}

		}

		embed.setDescription("MiBOT help | Category: " + commands[command].conf.category + "\n\n Total commands: " + totalCommands);

		if (totalCommands === 0) {

			continue;

		} else {

			message.channel.send(embed);

		}

	}

	return message.channel.send("All done");

}

conf = {

	command: "help",
	help: "Muestra la ayuda de los comandos",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}