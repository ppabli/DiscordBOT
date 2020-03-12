const sm = require('string-similarity');

exports.run = async (bot, message, args) => {

	if (!args[0]) {

		return message.channel.send("Necesito algun argumento para comparar");

	}

	let miembros = [];
	let ids = [];

	message.guild.members.forEach(member => {

		miembros.push(member.user.username);
		ids.push(member.id);

	});

	let match = sm.findBestMatch(args.join(' '), miembros);
	let usuario = match.bestMatch.target;

	let miembro = message.guild.members.get(ids[miembros.indexOf(usuario)]);

	return message.channel.send(`Querias decir: ${miembro}`);

}

exports.conf = {

	comando: "autocompletar",
	help: "Autocompleta en nombre del usuario",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
