
run = message => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		return CONTROL.poweroffBot(message);

	} else {

		return message.channel.send("You can not poweroff MiBOT");

	}

}

conf = {

	command: "poweroffBot",
	help: "Poweroff MiBOT",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}