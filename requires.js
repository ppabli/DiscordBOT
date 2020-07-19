/* Other libraries */
DISCORD = require("discord.js");
DOTENV = require('dotenv');
MARIADB = require('mariadb');
FS = require('fs');
SS = require('string-similarity');
EXEC = require('child_process').exec;
OS = require('os')
UTIL = require('util')

/* Our libraries */
LIST = require('./lib/list');
TIME = require('./lib/time');
OTHER = require('./lib/other');
COMMANDS = require('./lib/commands');
CONTROL = require('./lib/control');
ROLES = require('./lib/roles');

/* Our variables */

ROOT = __dirname;

if (OS.platform() === 'win32') {

	SEPARATOR = '\\';

} else {

	SEPARATOR = '/';

}

/* Our functionss */

barAnimation = async (duration, text) => {

	let i = 0;
	let bar = ["[", "]"];
	let finalText = 'Successfully loaded';
	let ticks = process.stdout.columns - text.split("").length - 1 - bar.length - 1 - 4 - 1 - finalText.split("").length;
	let time = duration / ticks;

	for (tick = 0; tick < ticks; tick++) {

		bar.splice(1, 0, "-");

	}

	return await new Promise(resolve => {

		const interval = setInterval(() => { 

			bar[i + 1] = "=";
			process.stdout.write(`\r${text} ${bar.join("")} ${Math.round(i * 100 / ticks)}%`);

			i++;

			if (i == ticks) {

				process.stdout.write(`\r${text} ${bar.join("")} ${Math.round(i * 100 / ticks)}% ${finalText}`);

				resolve("ok");
				clearInterval(interval);

			};

		}, time);

	});

}
