const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// Import custom error hanlding modules
const { notFound, errorHandler } = require('./middlewares');

const app = express();

require('dotenv').config();

// Let app use helmer for securing HTTP headers
app.use(helmet());

// Let app use morgan for HTTP request logging
app.use(morgan('dev'));

// Let app use body-parser for parsing incoming request bodies
app.use(bodyParser.json());

// Import payins routes
const payins = require('./routes/payins');

// Start the endpoints
app.use('/api/payins', payins);

app.use(notFound);
app.use(errorHandler);

module.exports = app;