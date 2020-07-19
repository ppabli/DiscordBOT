run = async (message) => {

	listaMiembros = LIST.getMembers(message.guild);

	for (usuario in listaMiembros) {

		POOL.query("insert into usuarios values (" + 0 + ", '" + listaMiembros[usuario].user.username + "', '" + listaMiembros[usuario].user.tag + "', '" + listaMiembros[usuario].user.id + "', now())");

	}

	return;

}

conf = {

	command: "saveUsers",
	help: "Save server users in the database",
	permits: ["ADMINISTRATOR"],
	usersID: [],
	category: __dirname.split(SEPARATOR)[__dirname.split(SEPARATOR).length - 1]


}

module.exports = {run, conf}