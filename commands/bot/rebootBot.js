run = message => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		return CONTROL.rebootBot(message);

	} else {

		return message.channel.send("You can not reboot MiBOT");

	}

}

conf = {

	command: "restartBot",
	help: "Restart MiBOT",
	permits: ["ADMINISTRATOR"],
	usersID: ["296687569503256587"],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}