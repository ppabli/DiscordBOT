exports.obtenerListaMiembros = (bot, message) => {

	let listaMiembros = [];

	bot.guilds.cache.get(message.guild.id).members.cache.map(m => listaMiembros.push(m));

	return listaMiembros;
}

exports.obtenerListaServidores = bot => {

	let listaServidores = [];

	bot.guilds.cache.map(g => listaServidores.push(g));

	return listaServidores;

}

//TODO No funciona
exports.obtenerResumen = bot => {

	return (`Estoy listo, conectado en ${bot.guilds.size} servidores para ${bot.users.size} miembros`);

}
