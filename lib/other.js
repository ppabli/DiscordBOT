
generateColor = () => {

	const letters = '0123456789ABCDEF';
	let color = '#';

	for (let i = 0; i < 6; i++) {

		color += letters[Math.floor(Math.random() * letters.length)];

	}

	return color;

}

sleep = ms => {

	return new Promise(resolve => setTimeout(resolve, ms));

}

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

module.exports = {generateColor, sleep, barAnimation}