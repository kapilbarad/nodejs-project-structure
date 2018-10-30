'use strict';

const { Router } = require('express');

/**
 * Api Router
 */
class ApiBase {
    /**
     * @param {Express} app
     */
	constructor() {
		this.router = new Router();
		this.router.use((req, res, next) => {
			req.apiVersion = this.VERSION;
			next();
		});
	}
}

module.exports = ApiBase;
