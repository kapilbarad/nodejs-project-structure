'use strict';

const ApiV1 = require('./api/v1');
const ApiV2 = require('./api/v2');

module.exports = (app) => {
    // Load API Routes
	app.use('/v1', new ApiV1(app));
	app.use('/v2', new ApiV2(app));

    // --------
    // Load other routes
	// --------

    app.get('/health_check', (req, res) => {
        res.sendStatus(200);
    });
};
