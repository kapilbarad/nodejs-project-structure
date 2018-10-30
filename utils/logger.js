'use strict';

const winston = require('winston');
const { format, transports, createLogger } = winston;
const { timestamp, splat, simple, combine, printf, label } = format;

class Logger {
	/**
     * Logger
     * @param {Object} options
     * @param {Object} options.label Log label
     * @return {winston.Logger}
     */
	constructor(options) {
		// Set default options
		options = options || {};
		options = Object.assign({ label: 'app' }, options);

		let formatter = printf((info) => {
			if (typeof info.message === 'object') {
				info.message = JSON.stringify(info.message);
			}
			return `${info.timestamp} [${info.level}]: ` +
				`${info.label} - ${info.message}`;
		});

		let loggerTransports = [
			new transports.Console({
				level: process.env.LOG_LEVEL || 'info',
				format: combine(
					label({ label: options.label }),
					timestamp(),
					splat(),
					simple(),
					formatter,
				),
			}),
		];

		return createLogger({
			transports: loggerTransports,
		});
	}
}

module.exports = Logger;
