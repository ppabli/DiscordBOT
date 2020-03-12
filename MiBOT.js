discord = require("discord.js");

const dotenv = require('dotenv');
dotenv.config();
config = process.env;

bot = new discord.Client();

bot.login(config.token);

bot.on("ready", () => {

	require('./inicio').ready(bot);

});

bot.on("message", message => {

	require('./inicio').comandos(bot, message);

});

bot.on("guildMemberAdd", member => {

	require('./inicio').nuevoMiembro(bot, member);

});

bot.on("guildMemberRemove", member => {

	require('./inicio').salidaMiembro(bot, member);

});
