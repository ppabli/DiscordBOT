exports.run = async (bot, message, args, reason) => {

	var incidencias = message.guild.channels.find(x => x.name === "incidencias");

	if (!message.member.hasPermission("KICK_MEMBERS")) {

		return message.channel.send("**Nop**");

	} else {

		if (!message.mentions.users.first()) {

			return message.channel.send("**Escribe el nombre del usuario o usuarios que quieras expulsar**");

		} else {

			if (!reason) {

				return message.channel.send("**Necesitas un motivo para expulsar a alguien**");

			} else {

				let ment = message.mentions.users;
				let text = [];

				ment.forEach(m => {

					if (!message.guild.member(m).kickable) {

						message.channel.send("**No puedes expulsar a: **" + m.username);

					} else {

						let embed = new discord.RichEmbed()
						.setAuthor("MiBOT")
						.setColor(require ("../funciones/otros").generarColor())
						.setDescription("Expulsiones")
						.addField("Se ha expulsado ", `${m.username} con ID ${m.id}`)
						.addField("Expulsado por", `<@${message.author.id}> con ID ${message.author.id}`)
						.addField("Expulsado en: ", message.channel)
						.addField("Motivo: ", reason)
						.setFooter(`Solicitado por: ${message.author.tag}`);
						
						message.guild.member(m).kick().then(() => {

							incidencias.send(embed);
							text.push(m.username);

						}).catch(err => message.channel.send("**Error al expulsar(Error desconocido): **" + m.username));

					}

				});

			}

		}

	}

}

exports.conf = {

	comando: "expulsar",
	help: "Permite expulsar a uno a varios miembros del servidor",
	permisos: ["KICK_MEMBERS"],
	usuarioID: [""],
	categoria: ["Administracion"]

}
