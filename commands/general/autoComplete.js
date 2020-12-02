run = async (message) => {

	/*TODO FIX */

	if (!args[0]) {

		return message.channel.send("Necesito algun argumento para comparar");

	}

	let miembros = [];
	let ids = [];

	message.guild.members.cache.map(member => {

		miembros.push(member.user.username);
		ids.push(member.id);

	});

	let match = SS.findBestMatch(args.join(' '), miembros);
	let usuario = match.bestMatch.target;

	let miembro = message.guild.members.get(ids[miembros.indexOf(usuario)]);

	return message.channel.send(`Querias decir: ${miembro}`);

}

conf = {

	command: "autoComplete",
	help: "Autocomplete the user name",
	permits: [],
	usersID: [],
	channelsID: [],
	category: __dirname.split(SEPARATOR).pop()

}

module.exports = {run, conf}