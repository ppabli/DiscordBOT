run = message => {

	return message.channel.send("Hello bru!!");

}

conf = {

	command: "hello",
	help: "Nothing",
	permits: [],
	usersID: [],
	channelsID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}