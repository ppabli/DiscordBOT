run = async message => {

	if (message.member.hasPermission("ADMINISTRATOR") && message.author.id === '296687569503256587') {

		return CONTROL.rebootServer(message);

	} else {

		return message.channel.send("You can not reboot the server");

	}

}

conf = {

	command: "rebootServer",
	help: "Reboot the computer where MiBOT is running",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}