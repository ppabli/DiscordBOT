class Playlist {

	server;
	audioChannel;
	textChannel;
	index;
	connection;
	dispatcher;
	songs;
	status;
	volume;

	constructor(server) {

		this.server = server;
		this.textChannel = server.channels.cache.find(c => c.id == CONFIG.MUSIC_TEXT_CHANNEL_ID);
		this.audioChannel = server.channels.cache.find(c => c.id == CONFIG.MUSIC_AUDIO_CHANNEL_ID);
		this.index = 0;
		this.songs = [];
		this.status = 0;
		this.volume = 5;

		this.joinChannel();

	}

	reset() {

		this.server = server;
		this.index = 0;
		this.songs = [];
		this.status = 0;
		this.volume = 5;

	}

	async joinChannel() {

		if (this.audioChannel) {

			this.connection = await this.audioChannel.join();

		}

	}

	leftChannel() {

		this.server.voiceConnection.disconnect();

	}

	async addSong(songName, tag) {

		try {

			const songInfo = await YTDL.getInfo(songName);

			let song = new SONG.Song(songInfo.videoDetails.media.song, songInfo.videoDetails.shortDescription, songInfo.videoDetails.media.album, songInfo.url, songInfo.videoDetails.media.artist, tag);

			this.songs.push(song);

			return this.textChannel.send("Song added to the server queue");

		} catch (error) {

			return this.textChannel.send("Error adding song. Please try later");

		}

	}

	async play() {

		if (this.songs.length && this.connection) {

			this.dispatcher = this.connection.play(YTDL(this.songs[this.index].URL));

			this.status = "Playing";
			this.textChannel.send(`Now playing: ${this.songs[this.index].title}`);

			this.dispatcher.setVolumeLogarithmic(this.volume / 5);

			this.dispatcher.on("finish", () => {

				this.next();

			});

		} else {

			return this.textChannel.send("No songs");

		}

	}

	pause() {

		if (this.status == "Playing") {
	
			this.status = "Paused"
			this.dispatcher.end();

		} else {

			return this.textChannel.send("No music running");

		}

	}

	next() {

		if (this.index + 1 >= this.songs.length) {

			this.index = 0;

		} else {

			this.index++;

		}

		this.play();

	}

	previous() {

		if (this.index - 1 < 0) {

			this.index = this.songs.length - 1;

		} else {

			this.index--;

		}

		this.play();

	}

	async generatePlaylist(message) {

		for (song in this.songs) {

			let embed = new DISCORD.MessageEmbed()
				.setAuthor(BOT.user.tag)
				.setColor(OTHER.generateColor())
				.setDescription("Playlist")
				.addField("Song title: ", this.songs[song].title)
				.addField("Requested by: ", `<@${this.songs[song].tag}>`)
				.setFooter(`Requested by: ${message.author.tag}`)
				.setTimestamp();

			this.textChannel.send(embed);

		}

	}

	async removeSong(index) {

		if (this.songs.length) {

			if (isNaN(index)) {

				for (song in this.songs) {

					if (songs[song].title.test(index)) {

						index = song;
						break;

					}

				}

			}

			if (this.index == index) {

				this.next();

			}

			if (index >= this.songs.length) {

				return this.textChannel.send("Invalid index");

			}

			let songData = this.songs[index];

			this.songs.splice(index, 1);
			this.textChannel.send(`Song removed from server playlist`);

		} else {

			this.textChannel.send("No songs");

		}

	}

}

module.exports = {Playlist}