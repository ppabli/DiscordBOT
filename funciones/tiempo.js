exports.diaActual = () => {

	let d = new Date();
	return (d.getDate() + " / " + (d.getMonth() + 1) + " / " + d.getFullYear());

}

exports.horaActual = () => {

	let d = new Date();
	return (d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds());

}

exports.convertirMS = ms => {

	let d, h, m, s;

	s = Math.floor(ms / 1000);
	m = Math.floor(s / 60);
	s = s % 60;
	h = Math.floor(m / 60);
	m = m % 60;
	d = Math.floor(h / 24);
	h = h % 24;

	return {d: d, h: h, m: m, s: s};

}