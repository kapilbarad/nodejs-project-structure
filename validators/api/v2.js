const Joi = require('joi');
const JoiValidate = require('./../../helpers/joiValidate');
const ValidatorsV1 = require('./v1');

class Validators extends ValidatorsV1 {
	/**
	 * Request Validators
	 */
	constructor() {
		super();

		this.deleteUser = new JoiValidate({
			'params': {
				'schema': Joi.object().keys({
					id: Joi.number().integer().min(1).required(),
				}).unknown(),
			},
		});
	}
}

module.exports = Validators;

