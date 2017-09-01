const express = require('express');

const user = require('./user');
const product = require('./product');

const router = express.Router();

// paths (route is /api)
router.use('/user', user);
router.use('/product', product);

module.exports = router;
