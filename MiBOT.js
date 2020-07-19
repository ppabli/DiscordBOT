require('./requires');

DOTENV.config();
CONFIG = process.env;

POOL = MARIADB.createPool({

	host: CONFIG.DDBBHost,
	user: CONFIG.DDBBUser,
	password: CONFIG.DDBBPassword,
	database: CONFIG.DDBBBase

});

BOT = new DISCORD.Client({partials: ['MESSAGE', 'REACTION']});

BOT.login(CONFIG.TOKEN);

BOT.on('ready', async () => {

	await COMMANDS.loadCommands();

	let serverList = LIST.getServers(BOT);

	console.log('MiBOT ready');
	console.log(`Total servers ${serverList.length}`);
	console.log('Server list: ');

	for(server in serverList) {

		console.log(serverList[server].name + " - " + LIST.getMembers(serverList[server]).length);

		//TODO Crear la base da datos para guardar los servidores del bot
		//TODO Meter el servidor con sus datos en la base de datos

	}

	BOT.user.setPresence({

		activity: {

			name: 'some code | -help',
			type: 'WATCHING'

		},

		status: 'dnd',
		afk: true

	})

});

BOT.on("message", message => {

	if (message.content.indexOf(CONFIG.PREFIX) === 0) {

		let commands = COMMANDS.getComands();

		let command = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/g).shift();

		if (commands[command]) {

			let havePermits = false;
			let haveID = false;

			if (commands[command].conf.permits.length == 0) {

				havePermits = true;

			} else {

				for (i in commands[command].conf.permits) {

					if (message.member.hasPermission(commands[command].conf.permits[i])) {

						havePermits = true;

					} else {

						havePermits = false;

					}

				}

			}

			if (commands[command].conf.usersID.length == 0) {

				haveID = true;

			} else {

				for (userID in commands[comando].conf.usersID) {

					if (message.author.id === commands[command].conf.usersID[userID]) {

						haveID = true;

						break;

					}

				}

			}

			if (haveID === true && havePermits === true) {

				console.log("Comando: " + command + " | Autor: " + message.author.tag + " | Servidor: " + message.guild.name + " | Canal: " + message.channel.name + " | Hora: " + TIME.getActualHour() + " | Dia: " + TIME.getActualDay());

				commands[command].run(message);

				POOL.query("select codigo from usuarios where id = '" + message.author.id + "'").then((res) => pool.query("insert into comandos values (" + 0 + ", '" + comando + "', '" +  res[0].codigo + "', '" + message.guild.name + "', '" + message.channel.name + "',  now())"));

				return;

			} else {

				return message.channel.send('You can not use that command');

			}

		} else {

			let finalCommands = [];
			let userCommand = command;

			for(command in commands) {

				let havePermits = false;
				let haveID = false;

				if (commands[command].conf.permits.length == 0) {

					havePermits = true;

				} else {

					for (i in commands[command].conf.permits) {

						if (message.member.hasPermission(commands[command].conf.permits[i])) {

							havePermits = true;

						} else {

							havePermits = false;

						}

					}

				}

				if (commands[command].conf.usersID.length == 0) {

					haveID = true;

				} else {

					for (userID in commands[command].conf.usersID) {

						if (message.author.id === commands[command].conf.usersID[userID]) {

							haveID = true;

							break;

						}

					}

				}

				if (haveID === true && havePermits === true) {

					finalCommands.push(commands[command].conf.command);

				} else {

					continue;

				}

			}

			let match = SS.findBestMatch(userCommand, finalCommands);
			let recommend = match.bestMatch.target;

			let embed = new DISCORD.MessageEmbed()
				.setColor(OTHER.generateColor())
				.setTitle("Problem")
				.setDescription("Unkown command")
				.setAuthor("MiBOT")
				.addField("Command do not exists:", userCommand, true)
				.addField("Recommended command:", "```-" + recommend + "```", false)
				.addField("To see all commands use:", "```-help```", true)
				.setFooter(`Requested by: ${message.author.tag}`);

			return message.channel.send(embed);

		}

	}

});

BOT.on('messageReactionAdd', async (reaction, user) => {

	let roles = ROLES.getAutoRoles();

	if (reaction.message.id === '714182849804369922') {

		for (rol in roles) {

			if (roles[rol].emojiName == reaction.emoji.name) {

				let newRole = reaction.message.guild.roles.cache.find(role => role.id == roles[rol].rolCode);
				let member = reaction.message.guild.members.cache.find(member => member.id == user.id);

				if (newRole && member) {

					member.roles.add(newRole);
					break;

				}

			}

		}

	} else if (reaction.message.id === '734458807492673536') {

		if (reaction.emoji.name == '👍🏻') {

			let memberRole = reaction.message.guild.roles.cache.find(r => r.id === '586998830164213772');
			let noMemberRole = reaction.message.guild.roles.cache.find(r => r.id === '734460546354774119');

			let member = reaction.message.guild.members.cache.find(member => member.id == user.id);

			if (memberRole && noMemberRole && member) {

				member.roles.add(memberRole);
				member.roles.remove(noMemberRole);

			}

		}


	}

});

BOT.on('messageReactionRemove', async (reaction, user) => {

	let roles = ROLES.getAutoRoles();

	if (reaction.message.id === '714182849804369922') {

		for (rol in roles) {

			if (roles[rol].emojiName == reaction.emoji.name) {

				let newRole = reaction.message.guild.roles.cache.find(role => role.id == roles[rol].rolCode);
				let member = reaction.message.guild.members.cache.find(member => member.id == user.id);

				if (newRole && member) {

					member.roles.remove(newRole);
					break;

				}

			}

		}

	} else if (reaction.message.id === '734458807492673536') {

		if (reaction.emoji.name == '👍🏻') {

			let memberRole = reaction.message.guild.roles.cache.find(r => r.id === '586998830164213772');
			let noMemberRole = reaction.message.guild.roles.cache.find(r => r.id === '734460546354774119');

			let member = reaction.message.guild.members.cache.find(member => member.id == user.id);

			if (memberRole && noMemberRole && member) {

				member.roles.add(noMemberRole);
				member.roles.remove(memberRole);

			}

		}

	}

});

BOT.on("guildMemberAdd", member => {

	let role = member.guild.roles.cache.find(r => r.id === "734460546354774119");
	member.roles.add(role);

	//TODO Meter el la referencia al servidor

	POOL.query("insert into usuarios values (" + 0 + ", '" + member.user.username + "', '" + member.user.tag + "', '" + member.id + "', now())");

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("Nuevo Miembro")
		.setColor(OTHER.generateColor())
		.addField("Nombre del usuario:", member.user.tag)
		.addField("ID del usuario:", member.id)
		.setFooter(`Solicitado por: MiBOT#2602`);

	BOT.guilds.cache.find(g => g.id === member.guild.id).channels.cache.find(c => c.id === '734392551729266689').send(embed);

});

BOT.on("guildMemberRemove", member => {

	let embed = new DISCORD.MessageEmbed()
		.setAuthor("MiBOT")
		.setDescription("Salida Miembro")
		.setColor(OTHER.generateColor())
		.addField("Nombre del usuario:", member.user.tag)
		.addField("ID del usuario:", member.id)
		.setFooter(`Solicitado por: MiBOT#2602`);

	//TODO Meter el la referencia al servidor

	POOL.query("delete from usuarios where id = '" + member.id + "'");

	BOT.guilds.cache.find(g => g.id === member.guild.id).channels.cache.find(c => c.id === '734392551729266689').send(embed);

});
