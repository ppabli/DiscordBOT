let exec = require('child_process').exec;

exports.shutdown = () => {

	exec('shutdown -p');

}

exports.restart = () => {

	exec('shutdown -r');

}

exports.poweroff = () => {

	exec('sudo poweroff');

}

exports.reboot = () => {

	exec('sudo reboot');

}
