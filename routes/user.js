const express = require('express');
const assert = require('assert');

const mongodb = require('../db');

const collection = 'users';

// root is /api/user
const router = express.Router();

router.get('/all', (req, res) => {
  mongodb.getCollection(collection).find().toArray((err, docs) => {
    assert.equal(null, err);
    res.json(docs);
  });
});

module.exports = router;
