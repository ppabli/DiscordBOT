getMembers = server => {

	let members = [];

	server.members.cache.map(m => members.push(m));

	return members;

}

getServers = () => {

	let servers = [];

	BOT.guilds.cache.map(g => servers.push(g));

	return servers;

}

module.exports = {getMembers, getServers}