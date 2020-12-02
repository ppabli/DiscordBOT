exports.run = async message => {

	if (SERVERS[message.guild.id]) {

		let playlist = SERVERS[message.guild.id].playlist;

		let fixedContent = message.content.replace(/'/g, '"');

		if (fixedContent.match(/"(.*?)"/g)) {

			let songs = fixedContent.match(/"(.*?)"/g).map(s => s.replace(/"/g, ''));

			for(let song in songs) {

				await playlist.addSong(songs[song], message.author.tag);
	
			}

		}

	} else {

		return message.channel.send("There is no playlist in this server");

	}

}

exports.conf = {

	command: "addSong",
	help: "Add song to the server playlist",
	permits: [],
	usersID: [],
	channelsID: [595982947153084426],
	category: __dirname.split(SEPARATOR).pop()

}