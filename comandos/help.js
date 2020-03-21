exports.run = async (bot, message) => {

	let cmds = require ('../funciones/cargarComandos.js').obtenerComandos();
	let categorias = require ('../funciones/cargarComandos.js').obtenerCategorias();

	for (categoria in categorias) {

		let totalComandos = 0;

		let embed = new discord.MessageEmbed()
		.setAuthor("MiBOT")
		.setColor(require ("../funciones/otros").generarColor())
		.setFooter(`Solicitado por: ${message.author.tag}`);

		for (comando in cmds) {

			if (cmds[comando].conf.categoria.toString() === categorias[categoria].toString()) {

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

					embed.addField(config.PREFIX + cmds[comando].conf.comando, cmds[comando].conf.help);
					totalComandos = totalComandos + 1;

				} else {

					continue;

				}

			} else {

				continue;

			}

		}

		embed.setDescription("Ayuda para el uso de los comandos de MiBOT | Categoria: " + categorias[categoria].toString() + "\n\rComandos totales: " + totalComandos + "\n\r")

		if (totalComandos === 0) {

			continue;

		} else {

			message.channel.send(embed);

		}

	}

	return; 

}

exports.conf = {

	comando: "help",
	help: "Muestra la ayuda de los comandos",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
