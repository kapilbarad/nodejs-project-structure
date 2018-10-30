'use strict';
const { Response, HttpCodes } = require('./../../../helpers/response');
const Logger = require('./../../../utils/logger');

class UserController {
    /**
     * User API Middlewares
     */
	constructor() {
		this.logger = new Logger();
		this.createUser = this.createUser.bind(this);
	}

	/**
	 * Create a new user
	 * @param  {Object} req
	 * @param  {Object} res
	 */
	createUser(req, res) {
		let { info } = this.logger;
		let response = new Response(req, res);

		info('New user created: %s', req.body.email);
		response.status(HttpCodes.CREATED).data(req.body).send();
	}
}

module.exports = UserController;
