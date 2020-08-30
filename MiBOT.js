require('./requires');

DOTENV.config();
CONFIG = process.env;

POOL = MARIADB.createPool({

	host: CONFIG.DDBB_HOST,
	user: CONFIG.DDBB_USER,
	password: CONFIG.DDBB_PASSWORD,
	database: CONFIG.DDBB_BASE

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

				for (userID in commands[command].conf.usersID) {

					if (message.author.id === commands[command].conf.usersID[userID]) {

						haveID = true;

						break;

					}

				}

			}

			if (haveID === true && havePermits === true) {

				console.log("Command: " + command + " | Author: " + message.author.tag + " | Server: " + message.guild.name + " | Channel: " + message.channel.name + " | Hour: " + TIME.getActualHour() + " | Day: " + TIME.getActualDay());

				commands[command].run(message);

				POOL.query("select code from users where userID = '" + message.author.id + "'").then((res) => POOL.query("insert into commands values (" + 0 + ", '" + command + "', '" +  res[0].code + "', '" + message.guild.name + "', '" + message.channel.name + "',  now())"));

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
				.setAuthor(BOT.user.tag)
				.addField("Command do not exists:", userCommand, true)
				.addField("Recommended command:", "```-" + recommend + "```", false)
				.addField("To see all commands use:", "```-help```", true)
				.setFooter(`Requested by: ${message.author.tag} | ${new Date().toUTCString()}`);

			return message.channel.send(embed);

		}

	}

});

BOT.on('messageReactionAdd', async (reaction, user) => {

	let roles = ROLES.getAutoRoles();

	if (reaction.message.id == CONFIG.ROLES_MESSAGE_ID) {

		for (rol in roles) {

			if (roles[rol].emojiName == reaction.emoji.name) {

				let newRole = reaction.message.guild.roles.cache.find(r => r.id == roles[rol].rolCode);
				let member = reaction.message.guild.members.cache.find(m => m.id == user.id);

				if (newRole && member) {

					member.roles.add(newRole);
					break;

				}

			}

		}

	} else if (reaction.message.id === CONFIG.WELCOME_MESSAGE_ID) {

		if (reaction.emoji.name == '👍🏻') {

			let memberRole = reaction.message.guild.roles.cache.find(r => r.id === '586998830164213772');
			let noMemberRole = reaction.message.guild.roles.cache.find(r => r.id === '734460546354774119');

			let member = reaction.message.guild.members.cache.find(m => m.id == user.id);

			if (memberRole && noMemberRole && member) {

				member.roles.add(memberRole);
				member.roles.remove(noMemberRole);

			}

		}


	}

});

BOT.on('messageReactionRemove', async (reaction, user) => {

	let roles = ROLES.getAutoRoles();

	if (reaction.message.id == CONFIG.ROLES_MESSAGE_ID) {

		for (rol in roles) {

			if (roles[rol].emojiName == reaction.emoji.name) {

				let newRole = reaction.message.guild.roles.cache.find(r => r.id == roles[rol].rolCode);
				let member = reaction.message.guild.members.cache.find(m => m.id == user.id);

				if (newRole && member) {

					member.roles.remove(newRole);
					break;

				}

			}

		}

	} else if (reaction.message.id === CONFIG.WELCOME_MESSAGE_ID) {

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

BOT.on("roleCreate", rol => {

	let embed = new DISCORD.MessageEmbed()
		.setColor(OTHER.generateColor())
		.setTitle("Rol created")
		.setDescription(`A rol has been created | ID: ${rol.id} | Name: <@&${rol.id}>`)
		.setAuthor(BOT.user.tag)
		.setFooter(`Requested by: ${BOT.user.tag} | ${new Date().toUTCString()}`);

	BOT.guilds.cache.find(g => g.id === rol.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

});

BOT.on("roleDelete", rol => {

	let embed = new DISCORD.MessageEmbed()
		.setColor(OTHER.generateColor())
		.setTitle("Rol deleted")
		.setDescription(`A rol has been deleted | ID: ${rol.id} | Name: #${rol.name}`)
		.setAuthor(BOT.user.tag)
		.setFooter(`Requested by: ${BOT.user.tag} | ${new Date().toUTCString()}`);

	BOT.guilds.cache.find(g => g.id === rol.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

});

BOT.on("roleUpdate", (oldRol, newRol) => {

	let embed = new DISCORD.MessageEmbed()
		.setColor(OTHER.generateColor())
		.setTitle("Rol permissions changed")
		.setAuthor(BOT.user.tag)
		.setFooter(`Requested by: ${BOT.user.tag} | ${new Date().toUTCString()}`);

	if (oldRol.permissions !== newRol.permissions) {

		let oldPerms = oldRol.permissions.serialize();
		let newPerms = newRol.permissions.serialize();

		let permUpdated = [];

		for (let [key, element] of Object.entries(oldPerms)) {

			if (newPerms[key] !== element) {

				permUpdated.push(key);

			}

		}

		if (oldRol.permissions > newRol.permissions) {

			embed.addField(`A rol has been updated | ID: ${newRol.id} | Name: <@&${newRol.id}>`, `**<@&${newRol.id}> has lost the ${permUpdated.join(", ")} permission**`);

		} else if (oldRol.permissions < newRol.permissions) {

			embed.addField(`A rol has been updated | ID: ${newRol.id} | Name: <@&${newRol.id}>`, `**<@&${newRol.id}> has been given the ${permUpdated.join(", ")} permission**`);

		} else {

			embed.setDescription(`A rol has been updated | ID: ${newRol.id} | Name: <@&${newRol.id}>`);

		}

	}

	BOT.guilds.cache.find(g => g.id === newRol.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

});

BOT.on("guildMemberAdd", member => {

	let role = member.guild.roles.cache.find(r => r.id === "734460546354774119");
	member.roles.add(role);

	let embed = new DISCORD.MessageEmbed()
		.setAuthor(BOT.user.tag)
		.setDescription("New member")
		.setColor(OTHER.generateColor())
		.addField("User name:", member.user.tag)
		.addField("User ID:", member.id)
		.setFooter(`Requested by: ${BOT.user.tag} | ${new Date().toUTCString()}`);

	BOT.guilds.cache.find(g => g.id === member.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

	POOL.query("insert into users values (" + 0 + ", '" + member.user.username + "', '" + member.user.tag + "', '" + member.id + "', now())");

});

BOT.on("guildMemberRemove", async member => {

	let channels = member.guild.channels.cache.filter(c => c.messages != undefined && (c.id == CONFIG.WELCOME_CHANNEL_ID || c.id == CONFIG.ROLES_CHANNEL_ID)).map(c => c);

	for (channel in channels) {

		let messages = await channels[channel].messages.fetch();

		let finalMessages = messages.filter(m => m.id == CONFIG.WELCOME_MESSAGE_ID || m.id == CONFIG.ROLES_MESSAGE_ID).map(m => m);

		for (message in finalMessages) {

			let reactions = finalMessages[message].reactions.cache.map(r => r);

			for (reaction in reactions) {

				await reactions[reaction].users.remove(member.id);

			}

		}

	}

	let embed = new DISCORD.MessageEmbed()
		.setAuthor(BOT.user.tag)
		.setDescription("Exit member")
		.setColor(OTHER.generateColor())
		.addField("User name:", member.user.tag)
		.addField("User ID:", member.id)
		.setFooter(`Requested by: ${BOT.user.tag} | ${new Date().toUTCString()}`);

	BOT.guilds.cache.find(g => g.id === member.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

	POOL.query("delete from users where userID = '" + member.id + "'");

});
