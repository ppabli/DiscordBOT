const POOL = MYSQL.createPool({

	host: CONFIG.DDBB_HOST,
	user: CONFIG.DDBB_USER,
	password: CONFIG.DDBB_PASSWORD,
	database: CONFIG.DDBB_BASE,
	timezone: 'UTC'

});

POOL.getConnection((err, connection) => {

	if (err) {

		throw err;

	}

	if (connection) {

		connection.release();

	}

});

module.exports = POOL;