getActualDay = () => {

	let d = new Date();
	return (d.getDate() + " / " + (d.getMonth() + 1) + " / " + d.getFullYear());

}

getActualHour = () => {

	let d = new Date();
	return (d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds());

}

transformMS = ms => {

	let d, h, m, s;

	s = Math.floor(ms / 1000);
	m = Math.floor(s / 60);
	s = s % 60;
	h = Math.floor(m / 60);
	m = m % 60;
	d = Math.floor(h / 24);
	h = h % 24;
	y = Math.floor(d / 365);
	d = d % 365;

	return {years: y, days: d, hours: h, minutes: m, seconds: s};

}

module.exports = {getActualDay, getActualHour, transformMS}