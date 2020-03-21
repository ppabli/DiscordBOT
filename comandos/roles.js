exports.run = async (bot, message, args) => {

	let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

	if (!role) {

		role = message.member.highestRole;

	}

	let rolEmbed = new discord.MessageEmbed()
	.setAuthor("MiBOT")
	.setColor(require ("../funciones/otros").generarColor())
	.setTitle(`Rol: ${role.name}`)
	.addField('Miembros', role.members.size, true)
	.addField('Color (HEX)', role.hexColor, true)
	.addField('Creado:', role.createdAt.toDateString(), true)
	.addField('Editable', role.editable.toString(), true)
	.addField('Administrable', role.managed.toString(), true)
	.addField('ID', role.id, true)
	.setFooter(`Solicitado por: ${message.author.tag}`);

	return message.channel.send(rolEmbed);

}

exports.conf = {

	comando: "roles",
	help: "Muestra los roles del usuario",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
