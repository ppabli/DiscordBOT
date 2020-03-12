const sm = require('string-similarity');
const cmds = require('./cargarComandos').obtenerComandos();

exports.recomendarComandos = (message, args) => {

	let comandos = [];

	for(comando in cmds) {

		let tienePermisos = false;
		let tieneID = false;

		for (contador in cmds[comando].conf.permisos) {

			if (cmds[comando].conf.permisos[contador].toString() === "") {

				tienePermisos = true;

			} else {

				if (message.member.hasPermission(cmds[comando].conf.permisos[contador].toString())) {

					tienePermisos = true;

				} else {

					tienePermisos = false;

				}

			}

		}

		for (contador in cmds[comando].conf.usuarioID) {

			if (cmds[comando].conf.usuarioID[0].toString() === "") {

				tieneID = true;

			} else {

				if (message.author.id === cmds[comando].conf.usuarioID[contador].toString()) {

					tieneID = true;
					break;

				}

			}

		}

		if (tieneID === true && tienePermisos === true) {

			comandos.push(cmds[comando].conf.comando);

		} else {

			continue;

		}

	}

	let match = sm.findBestMatch(args, comandos);
	let comandoRecomendado = match.bestMatch.target;

	return comandoRecomendado;

}
