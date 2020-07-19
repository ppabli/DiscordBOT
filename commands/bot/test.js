run = async (message, content) => {

	if (message.member.hasPermission("ADMINISTRATOR")) {

		return message.channel.send("Test command");

	}

}

conf = {

	command: "test",
	help: "Test command",
	permits: ["ADMINISTRATOR"],
	usersID: ["296687569503256587"],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}