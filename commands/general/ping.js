run = message => {

	let messagePing = Date.now();

	let revisionPing = Date.now() - messagePing;

	let pingEmbed = new DISCORD.MessageEmbed()
		.setAuthor(BOT.user.tag)
		.setColor(OTHER.generateColor())
		.addField('MiBOT PING: ', `~ ${Math.floor(BOT.ws.ping)} ms`)
		.addField('Message PING: ', `~ ${Math.round(BOT.ws.ping + revisionPing)} ms`)
		.setFooter(`Requested by: ${message.author.tag}`)
		.setTimestamp();

	return message.channel.send(pingEmbed);

}

conf = {

	command: "ping",
	help: "Ping info",
	permits: [],
	usersID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}