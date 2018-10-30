'use strict';

const Joi = require('joi');
const { Response, HttpCodes, CustomErrors } = require('./response');

/**
 * Joi errors to readable errors map
 */
const JoiErrorsMap = {
	'any.required': CustomErrors.MISSING,
	'string.regex.base': CustomErrors.INVALID,
	'other': CustomErrors.INVALID,
};

/**
 * @typedef {Object} JoiValidateSchema
 * @property {Object=} options.json - Joi schema as json.
 * @property {Object=} options.params - Joi schema compiled version.
 */

/**
 * @typedef {Object} JoiValidateOptions
 * @property {JoiValidateSchema=} options.query - Joi schema to validate query parameters.
 * @property {JoiValidateSchema=} options.params - Joi schema to validate url segments.
 * @property {JoiValidateSchema=} options.body - Joi schema to validate request body.
 */

class JoiValidate {
    /**
     * @param {JoiValidateOptions} options
     */
	constructor(options) {
		this.options = options;

		// Compile json schema
		for (let key in this.options) {
			if (this.options[key].json) {
				this.options[key] = {
					json: this.options[key].json,
					schema: Joi.compile(
						this.options[key].json).options({ abortEarly: false }
						),
				};
			} else {
				this.options[key] = {
					json: null,
					schema: this.options[key].schema.options({
						abortEarly: false,
					}),
				};
			}
		}

		this.mid = this.mid.bind(this);
		return this.mid;
	}

    /**
     * Express middleware to validate request
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
	mid(req, res, next) {
		// Validate - query, params, body
		for (let key in this.options) {
			const { error } = Joi.validate(
				req[key],
				this.options[key].schema
			);

			if (error === null) {
				next();
			} else {
				// Send the errors
				let response = new Response(req, res, next);

				// If debug mode is on Set original errors to response
				if (this.debugErrors) {
					response.data(error.details);
				}

				for (let i in error.details) {
					let { type, context: { key } } = error.details[i];

					response.error(key, JoiErrorsMap[type]
						? JoiErrorsMap[type] : JoiErrorsMap.other
					);
				}

				response
					.status(HttpCodes.UNPROCESSABLE_ENTITY)
					.send();
			}
		}
	};
}

module.exports = JoiValidate;
