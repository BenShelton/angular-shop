const express = require('express');

const user = require('./user');
const product = require('./product');
const image = require('./image');

const router = express.Router();

// paths (route is /api)
router.use('/user', user);
router.use('/product', product);
router.use('/image', image);

module.exports = router;
