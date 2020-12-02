exports.run = async message => {

	if (SERVERS[message.guild.id]) {

		let playlist = SERVERS[message.guild.id].playlist;
		playlist.previous();

	} else {

		return message.channel.send("There is no playlist in this server");

	}
}

exports.conf = {

	command: "previousSong",
	help: "Play the previous song in the server playlist",
	permits: [],
	usersID: [],
	channelsID: [595982947153084426],
	category: __dirname.split(SEPARATOR).pop()

}