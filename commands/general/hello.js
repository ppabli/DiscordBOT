run = async (message) => {

	return message.channel.send("Hello bru!!");

}

conf = {

	command: "hello",
	help: "Nothing",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]

}

module.exports = {run, conf}