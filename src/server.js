const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// Import custom middleware library
const middlewares = require('./middlewares');

require('dotenv').config();

// Import the DB schema we created
const schema = require('./db/schema');

// Import DB connectivity module
const db = require('./db/connection');

// Import DB table transactions
const transactions = db.get('transactions');

// Start the app
const app = express();

// Let app use helmer for securing HTTP headers
app.use(helmet());

// Let app use morgan for HTTP request logging
app.use(morgan('dev'));

// Let app use body-parser for parsing incoming request bodies
app.use(bodyParser.json());

// Let app use the middlewares we created for error handling
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

