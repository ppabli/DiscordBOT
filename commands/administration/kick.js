run = async message => {

	if (message.member.hasPermission("KICK_MEMBERS", {checkAdmin: true, checkOwner: true})){

		if (message.mentions.members.size != 0) {

			let content = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/g);
			let reason = content.slice((1 + message.mentions.users.size)).join(" ").replace(/<@.*>/, "");

			if (reason){

				let users = message.mentions.members.map(u => u);

				for (user in users) {

					let embed = new DISCORD.MessageEmbed()
						.setAuthor(BOT.user.tag)
						.setColor(OTHER.generateColor())
						.setDescription("Bans")
						.addField("Banned: ", `${users[user].user.username} | ID ${users[user].user.id}`)
						.addField("Banned by: ", `<@${message.author.tag}> | ID ${message.author.id}`)
						.addField("Channel: ", message.channel)
						.addField("Reason: ", reason)
						.setFooter(`Requested by: ${BOT.user.tag} | ${new Date().toUTCString()}`);

					try {

						await users[user].kick(reason);

						return BOT.guilds.cache.find(g => g.id === message.guild.id).channels.cache.find(c => c.id === "734392551729266689").send(embed);

					} catch (error) {

						console.log(error);
						return message.channel.send("Error");

					}

				}

			} else {

				return message.channel.send("We need a reason to kick");

			}

		} else {

			return message.channel.send("Tag the users you want to kick");

		}

	} else {

		return message.channel.send("Nop");

	}

}

conf = {

	command: "kick",
	help: "Kick server user",
	permits: ["KICK_MEMBERS"],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}