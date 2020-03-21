exports.obtenerListaMiembros = (server) => {

	let listaMiembros = [];

	server.members.cache.map(m => listaMiembros.push(m));

	return listaMiembros;

}

exports.obtenerListaServidores = bot => {

	let listaServidores = [];

	bot.guilds.cache.map(g => listaServidores.push(g));

	return listaServidores;

}
