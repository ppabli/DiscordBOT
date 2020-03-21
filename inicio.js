const mariadb = require('mariadb');

pool = mariadb.createPool({

	host: config.DDBBHost,
	user: config.DDBBUser,
	password: config.DDBBPassword,
	database: config.DDBBBase

});

exports.ready = (bot) => {

	let listar = require('./funciones/listar');

	require('./funciones/cargarComandos').cargarComandos();

	console.log(listar.obtenerResumen(bot));
	console.log("Lista servidores: ");

	var listaServidores = listar.obtenerListaServidores(bot);

	for(server in listaServidores) {

		console.log(listaServidores[server].name + " - " + listar.obtenerListaMiembros(bot, server).length);

		//TODO Crear la base da datos para guardar los servidores del bot
		//TODO Meter el servidor con sus datos en la base de datos

	}

	bot.user.setPresence({

		status: "online",
		game: {

			name: "Sirviendo a los Dorados | -help",
			type: "PLAYING"

		}

	});

}

exports.comandos = (bot, message) => {

	if (message.content.indexOf(config.PREFIX) === 0) {

		const cmds = require('./funciones/cargarComandos').obtenerComandos();

		let cont = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
		let args = cont.slice(1);
		let reason = args.join(" ").slice(22);
		let comando = cont.shift().toLowerCase();

		if (cmds[comando]) {

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

				console.log("Comando: " + comando + " | Autor: " + message.author.tag + " | Servidor: " + message.guild.name + " | Canal: " + message.channel.name + " | Hora: " + require('./funciones/tiempo').horaActual() + " | Dia: " + require('./funciones/tiempo').diaActual());

				cmds[comando].run(bot, message, args, reason);

				pool.query("select codigo from usuarios where id = '" + message.author.id + "'").then((res) => pool.query("insert into comandos values (" + 0 + ", '" + comando + "', '" +  res[0].codigo + "', '" + message.guild.name + "', '" + message.channel.name + "',  now())"));

				return;

			} else {

				return message.channel.send("No tienes permiso para ejecutar este comando");

			}

		} else {

			let comandoRecomendado = require('./funciones/recomendarComandos').recomendarComandos(message, comando);

			//TODO Comprobar si el metodo de setTitle funciona correctamente
			let embed = new Discord.RichEmbed()
			.setTitle("Problema")
			.setDescription("No se reconoce el comando")
			.setAuthor("MiBOT")
			.addField("El comando introducido no existe:", comando, true)
			.addField("A lo mejor querías usar el comando:", "```-" + comandoRecomendado + "```", false)
			.addField("Si quieres ver todos los comandos usa:", "```-help```", true)
			.setFooter(`Solicitado por: ${message.author.tag}`);

			return message.channel.send(embed);

		}

	}

}

exports.nuevoMiembro = (bot, member) => {

	let role = member.guild.roles.find(x => x.name === "miembro");
	member.addRole(role);

	//TODO Meter el la referencia al servidor

	pool.query("insert into usuarios values (" + 0 + ", '" + member.user.username + "', '" + member.user.tag + "', '" + member.id + "', now())");

	let nuevoMiembroEmbed = new Discord.RichEmbed()
	.setAuthor("MiBOT")
	.setDescription("Nuevo Miembro")
	.setColor("#000000")
	.addField("Nombre de usuario e ID:", `Usuario: ${member.user.tag}\n ID: ${member.id}`)
	.setFooter(`Solicitado por: MiBOT#2602`);

	bot.guilds.get(member.guild.id).channels.find(x => x.name === "incidencias").send(nuevoMiembroEmbed);

}

exports.salidaMiembro = (bot, member) => {

	let salidaMiembroEmbed = new Discord.RichEmbed()
	.setAuthor("MiBOT")
	.setDescription("Salida Miembro")
	.setColor("#000000")
	.addField("Nombre de usuario e ID:", `Usuario: ${member.user.tag}\n ID: ${member.id}`)
	.setFooter(`Solicitado por: MiBOT#2602`);

	//TODO Meter el la referencia al servidor

	pool.query("delete from usuarios where id = '" + member.id + "'");

	bot.guilds.get(member.guild.id).channels.find(x => x.name === "incidencias").send(salidaMiembroEmbed);

}
