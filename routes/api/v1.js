'use strict';

const { Router } = require('express');
const ApiBase = require('./base');
const UserController = require('./../../controllers/api/v1/user');
const Validators = require('../../validators/api/v1');

/**
 * Api Router
 */
class Api extends ApiBase {
    /**
     * @param {Express} app
     * @return {Router}
     */
	constructor(app) {
		super(app);

		const { createUser: createUserValidator } = new Validators();
		const { createUser } = new UserController(app);

		this.router.use('/users', new Router()
			.post('/', createUserValidator, createUser),
		);

		return this.router;
	}

    /**
     * API version
     */
	get VERSION() {
		return '1';
	}
}

module.exports = Api;
