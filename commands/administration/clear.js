run = message => {

	let messageArray = message.content.split(" ");
	let args = messageArray.slice(1);
	let number = null;

	if (args[0] === "all") {

		number = 100;

	} else {

		if (args[0] != null) {

			number = Number(args[0]) + 1;

		} else {

			number = 0;

		}

	}

	if (message.member.hasPermission("ADMINISTRATOR")) {

		if (number === 0) {

			return message.channel.send("Enter a number");

		} else {

			return message.channel.bulkDelete(number).catch(e => message.channel.send(`Error removing messages: ${e}`));

		}

	} else {

		return message.channel.send("You can not clear channels");

	}

}

conf = {

	command: "clear",
	help: "Clear channel messages",
	permits: ["ADMINISTRATOR"],
	usersID: [],
	channelsID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}