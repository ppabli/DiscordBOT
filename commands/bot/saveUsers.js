run = message => {

	let userList = message.guild.members.cache.map(m => m);

	for (user in userList) {

		POOL.query("insert into users values (" + 0 + ", '" + userList[user].user.username + "', '" + userList[user].user.tag + "', '" + userList[user].user.id + "', now())");

	}

	return message.channel.send("All done");

}

conf = {

	command: "saveUsers",
	help: "Save server users in the database",
	permits: ["ADMINISTRATOR"],
	usersID: [CONFIG.OWNER_ID],
	category: __dirname.split(SEPARATOR).pop()


}

module.exports = {run, conf}