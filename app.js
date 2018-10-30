'use strict';

const fs = require('fs');
const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Load envs from .env file
if (fs.existsSync('./.env')) {
	require('dotenv').config();
}

const config = require('./config');
const routes = require('./routes');
const Logger = require('./utils/logger');
const { debug } = new Logger();

debug('Starting app with NODE_ENV=%s', config.env);

// Initialize the app
let app = express();

// View engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

if (config.env === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Load routes
routes(app);

module.exports = app;
