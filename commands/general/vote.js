run = message => {

	message.react("✅");
	message.react("❌");

	return;

}

conf = {

	command: "vote",
	help: "Start votation",
	permits: [],
	usersID: [],
	channelsID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}