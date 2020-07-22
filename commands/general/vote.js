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
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}