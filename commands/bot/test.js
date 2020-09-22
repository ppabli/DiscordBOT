run = message => {

	if (message.member.hasPermission("ADMINISTRATOR")) {

		return message.channel.send("Test command");

	}

}

conf = {

	command: "test",
	help: "Test command",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}