require('./requires');

BOT = new DISCORD.Client({partials: ['MESSAGE', 'REACTION']});

BOT.login(CONFIG.TOKEN);

BOT.on('ready', async () => {

	await COMMANDS.loadCommands();

	let serverList = BOT.guilds.cache.map(g => g);

	console.log('MiBOT ready');
	console.log(`Total servers ${serverList.length}`);
	console.log('Server list: ');

	for(server in serverList) {

		let members = serverList[server].members.cache.map(m => m);

		console.log(serverList[server].name + " - " + members.length);

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

BOT.on("message", async message => {

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

				let user = await QUERY(`select code from users where userID = '${message.author.id}'`)
				let userCode = user[0].code;

				QUERY(`insert into commands values (0, '${command}', ${userCode}, '${message.guild.name}', '${message.channel.name}', now())`);

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
				.setFooter(`Requested by: ${message.author.tag}`)
				.setTimestamp();

			return message.channel.send(embed);

		}

	}

});

BOT.on('messageReactionAdd', async (reaction, user) => {

	let messages = MESSAGES.getMessages();

	if (messages[reaction.message.channel.id]) {

		for (rol in messages[reaction.message.channel.id]["fields"]) {

			if (messages[reaction.message.channel.id]["fields"][rol]["emojiName"] == reaction.emoji.name) {

				let newRole = reaction.message.guild.roles.cache.find(r => r.id == messages[reaction.message.channel.id]["fields"][rol]["rolCode"]);
				let member = reaction.message.guild.members.cache.find(m => m.id == user.id);

				if (newRole.id == CONFIG.ROL_MEMBER) {

					let noMemberRole = reaction.message.guild.roles.cache.find(r => r.id === CONFIG.ROL_NOMEMBER);

					member.roles.add(newRole);
					member.roles.remove(noMemberRole);

				} else {

					member.roles.add(newRole);

				}

			}

		}

	}

});

BOT.on('messageReactionRemove', async (reaction, user) => {

	let messages = MESSAGES.getMessages();

	if (messages[reaction.message.channel.id]) {

		for (rol in messages[reaction.message.channel.id]["fields"]) {

			if (messages[reaction.message.channel.id]["fields"][rol].emojiName == reaction.emoji.name) {

				let newRole = reaction.message.guild.roles.cache.find(r => r.id == messages[reaction.message.channel.id]["fields"][rol].rolCode);
				let member = reaction.message.guild.members.cache.find(m => m.id == user.id);

				if (newRole.id == CONFIG.ROL_MEMBER) {

					let noMemberRole = reaction.message.guild.roles.cache.find(r => r.id === CONFIG.ROL_NOMEMBER);

					member.roles.add(noMemberRole);
					member.roles.remove(newRole);

				} else {

					member.roles.remove(newRole);

				}

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
		.setFooter(`Requested by: ${BOT.user.tag}`)
		.setTimestamp();

	BOT.guilds.cache.find(g => g.id === rol.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

});

BOT.on("roleDelete", rol => {

	let embed = new DISCORD.MessageEmbed()
		.setColor(OTHER.generateColor())
		.setTitle("Rol deleted")
		.setDescription(`A rol has been deleted | ID: ${rol.id} | Name: #${rol.name}`)
		.setAuthor(BOT.user.tag)
		.setFooter(`Requested by: ${BOT.user.tag}`)
		.setTimestamp();

	BOT.guilds.cache.find(g => g.id === rol.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

});

BOT.on("roleUpdate", (oldRol, newRol) => {

	let embed = new DISCORD.MessageEmbed()
		.setColor(OTHER.generateColor())
		.setTitle("Rol permissions changed")
		.setAuthor(BOT.user.tag)
		.setFooter(`Requested by: ${BOT.user.tag}`)
		.setTimestamp();

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

	let role = member.guild.roles.cache.find(r => r.id === CONFIG.ROL_NOMEMBER);
	member.roles.add(role);

	let embed = new DISCORD.MessageEmbed()
		.setAuthor(BOT.user.tag)
		.setDescription("New member")
		.setColor(OTHER.generateColor())
		.addField("User name:", member.user.tag)
		.addField("User ID:", member.id)
		.setFooter(`Requested by: ${BOT.user.tag}`)
		.setTimestamp();

	BOT.guilds.cache.find(g => g.id === member.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

	QUERY(`insert into users values (0, '${member.user.username}', '${member.user.tag}', '${member.id}', now())`);

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
		.setFooter(`Requested by: ${BOT.user.tag}`)
		.setTimestamp();

	BOT.guilds.cache.find(g => g.id === member.guild.id).channels.cache.find(c => c.id == CONFIG.LOG_CHANNEL_ID).send(embed);

	QUERY(`delete from users where userID = '${member.id}'`);

});
