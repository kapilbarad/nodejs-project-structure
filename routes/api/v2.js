'use strict';

const { Router } = require('express');
const ApiBase = require('./base');
const UserController = require('./../../controllers/api/v2/user');
const Validators = require('../../validators/api/v2');

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

		const {
			createUser: createUserValidator,
			deleteUser: deleteUserValidator,
		} = new Validators();

		const { createUser, deleteUser } = new UserController(app);

		this.router.use('/users', new Router()
			.post('/', createUserValidator, createUser)
			.delete('/:id', deleteUserValidator, deleteUser),
		);

		return this.router;
	}

    /**
     * API version
     */
	get VERSION() {
		return '2';
	}
}

module.exports = Api;
