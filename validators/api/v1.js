const Joi = require('joi');
const JoiValidate = require('../../helpers/joiValidate');

class Validators {
	/**
	 * Request Validators
	 */
	constructor() {
		this.createUser = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					name: Joi.string().trim().min(3).max(50).required(),
					email: Joi.string().email().required(),
					bio: Joi.string().trim().min(100).max(500),
				}).unknown(),
			},
		});
	}
}

module.exports = Validators;
