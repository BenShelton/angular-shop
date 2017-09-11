const express = require('express');
const assert = require('assert');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const MONGOURI = process.env.MONGOURI || 'mongodb://localhost/angular-academy';

const mongodb = require('./db');
const apiRoutes = require('./routes/api');

const app = express();

mongodb.connect(MONGOURI, {}, (err, db) => {
  assert.equal(null, err);
  console.log(`Connected to database at ${MONGOURI}`);

  // Middleware
  app.use(bodyParser.json());

  // SPA
  app.use(express.static(__dirname + '/dist'));

  // API
  global.rootDir = __dirname;
  app.use('/api', apiRoutes);

  // Invalid routes
  app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Invalid Route' });
  });

  // Start Server
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

});
