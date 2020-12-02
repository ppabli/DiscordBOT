class Song {

	title;
	description;
	album;
	URL;
	artist;
	requester;

	constructor(title, description, album, URL, artist, requester) {

		this.title = title;
		this.description = description;
		this.album = album;
		this.URL = URL;
		this.artist = artist;
		this.requester = requester;

	}

}

module.exports = {Song}