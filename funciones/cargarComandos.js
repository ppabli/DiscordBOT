const fs = require('fs');
const categorias = ["General", "Musica", "Administracion", "Otros"];
var cmds = {};

exports.cargarComandos = () => {

	fs.readdir('./comandos/', (err, files) => {

		if (err) {

			return console.log(err);

		}

		let jsfiles = files.filter(f => f.split('.').pop() === 'js');

		if (jsfiles.length <= 0) {

			return console.log("No se han encontrado comandos");

		}

		console.log(jsfiles.length + ' comandos encontrados');

		jsfiles.forEach((f, i) => {

			try {

				let cmd = require(`../comandos/${f}`);
				let name = cmd.conf.comando;

				console.log(`Cargando el comando ${name} ... Cargado`);
				cmds[name] = {run:cmd.run, conf:cmd.conf};

			} catch(err) {

				console.log(err);

			}

		});

	});

}

exports.obtenerComandos = () => {

	return cmds;

}

exports.obtenerCategorias = () => {

	return categorias;

}
