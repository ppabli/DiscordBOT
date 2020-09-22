/* Other libraries */
DISCORD = require("discord.js");
DOTENV = require('dotenv');
MYSQL = require('mysql');
FS = require('fs');
SS = require('string-similarity');
EXEC = require('child_process').exec;
OS = require('os');
UTIL = require('util');

DOTENV.config();
CONFIG = process.env;

/* Our libraries */
TIME = require('./lib/time');
OTHER = require('./lib/other');
COMMANDS = require('./lib/commands');
MESSAGES = require('./lib/messages');
DB = require('./lib/database');

QUERY = UTIL.promisify(DB.query).bind(DB);

/* Our variables */
ROOT = __dirname;

if (OS.platform() === 'win32') {

	SEPARATOR = '\\';

} else {

	SEPARATOR = '/';

}