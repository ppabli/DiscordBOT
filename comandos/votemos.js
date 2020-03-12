exports.run = async (bot, message) => {

	message.react("✅");
	message.react("❌");

	return;

}

exports.conf = {

	comando: "votemos",
	help: "Inicia una votacion",
	permisos: [""],
	usuarioID: [""],
	categoria: ["General"]

}
