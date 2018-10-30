'use strict';

module.exports = {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: process.env.PORT || 3005,
	},
	logging: {
		level: process.env.LOG_LEVEL || 'debug',
	},
};
