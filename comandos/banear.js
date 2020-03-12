exports.run = async (bot, message, args, reason) => {

	let incidencias = message.guild.channels.find(x => x.name === "incidencias");

	if (!message.member.hasPermission("BAN_MEMBERS")){

		return message.channel.send("**Nop**");

	} else {

		if (!message.mentions.users.first()){

			return message.channel.send("**Escribe el nombre del usuario o usuarios que quieras banear**");
	
		} else {

			if (!reason){

				return message.channel.send("**Necesitas un motivo para banear a alguien**");

			} else {

				let ment = message.mentions.users;
				let text = [];

				ment.forEach(m => {

					if (!message.guild.member(m).kickable) {

						message.channel.send("**No puedes banear a: *" + m.username);

					} else {

						let embed = new discord.RichEmbed()
						.setAuthor("MiBOT")
						.setColor(require ("../funciones/otros").generarColor())
						.setDescription("Baneos")
						.addField("Se ha baneado ", `${m.username} con ID ${m.id}`)
						.addField("Baneado por", `<@${message.author.id}> con ID ${message.author.id}`)
						.addField("Baneado en: ", message.channel)
						.addField("Motivo: ", reason)
						.setFooter(`Solicitado por: ${message.author.tag}`);

						message.guild.member(m).ban().then(() => {

							incidencias.send(embed);
							text.push(m.username);

						}).catch(err => message.channel.send("**Error al banear(Error desconocido): **" + m.username));

					}

				});

			}

		}

	}
	
}

exports.conf = {

	comando: "banear",
	help: "Permite baner a uno o varios miembros del servidor",
	permisos: ["BAN_MEMBERS"],
	usuarioID: [""],
	categoria: ["Administracion"]

}
