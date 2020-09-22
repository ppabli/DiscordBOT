let commands = {};
let categories = [];

loadCommands = async () => {

	categories = await FS.readdirSync(`${ROOT}/commands/`);

	if (categories.length == 0) {

		console.log('No categories found');
		console.log('No commands found');

	} else {

		console.log(`Total categories found: ${categories.length}`);

		for (category in categories) {

			if (categories[category] == 'music') {

				continue;

			}

			let files = await FS.readdirSync(`${ROOT}/commands/${categories[category]}/`).filter(f => f.split('.').pop() === 'js');;

			if (files.length <= 0) {

				return console.log(`No commands found in ${categories[category]} category`);

			} else {

				console.log(`Total commands in ${categories[category]}: ${files.length} commands`);

				for (file in files) {

					try {

						let command = require(`${ROOT}/commands/${categories[category]}/${files[file]}`);

						commands[command.conf.command] = {run: command.run, conf: command.conf};

						process.stdout.write(`Loading command ${command.conf.command}`);

						// await OTHER.barAnimation(250, `Loading command ${command.conf.command}`);

					} catch (e) {

						console.log(e);

					}

				}

			}

		}

	}

}

getComands = () => {

	return commands;

}

getCategories = () => {

	return categories;

}

module.exports = {loadCommands, getComands, getCategories}
