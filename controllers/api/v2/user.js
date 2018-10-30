'use strict';
const { Response, HttpCodes } = require('./../../../helpers/response');
const UserControllerV1 = require('./../v1/user');

class UserController extends UserControllerV1 {
    /**
     * User API Middlewares
     */
	constructor() {
		super();
		this.deleteUser = this.deleteUser.bind(this);
	}

	/**
	 * Create a new user
	 * @param  {Object} req
	 * @param  {Object} res
	 */
	deleteUser(req, res) {
		let { info } = this.logger;
		let response = new Response(req, res);

		info('User deleted: %s', req.params.id);
		response.status(HttpCodes.OK).send();
	}
}

module.exports = UserController;
