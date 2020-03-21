exports.run = async (bot, message, args, reason) => {

	let lista = require('../funciones/listar');
	let listaMiembros = lista.obtenerListaMiembros(message.guild);

	for (usuario in listaMiembros) {

		pool.query("insert into usuarios values (" + 0 + ", '" + listaMiembros[usuario].user.username + "', '" + listaMiembros[usuario].user.tag + "', '" + listaMiembros[usuario].user.id + "', now())");

	}

	return;

}

exports.conf = {

	comando: "db_guardarusuarios",
	help: "Guarda los usuarios en la base de datos",
	permisos: ["ADMINISTRATOR"],
	usuarioID: [""],
	categoria: ["Administracion"]

}