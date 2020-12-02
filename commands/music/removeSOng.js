exports.run = async message => {

	if (SERVERS[message.guild.id]) {

		let playlist = SERVERS[message.guild.id].playlist;

		let index = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/g).slice(1);

		playlist.removeSong(index);

	} else {

		return message.channel.send("There is no playlist in this server");

	}

}

exports.conf = {

	command: "removeSong",
	help: "Remove song from the server playlist",
	permits: [],
	usersID: [],
	channelsID: [595982947153084426],
	category: __dirname.split(SEPARATOR).pop()

}