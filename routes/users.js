const express = require('express');
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

const mongodb = require('../db');

const coll = () => mongodb.getCollection('users');

// root is /api/users
const router = express.Router();

router.get('/load', (req, res) => {

  coll().find().toArray((err, docs) => {
    try {
      assert.equal(null, err);
    } catch (e) {
      return res.status(500).json({
        message: 'Users Not Loaded',
        err: e
      });
    }
    let users = [];
    docs.forEach(doc => {
      users.push({
        id: doc._id,
        name: doc.name,
        email: doc.email,
        role: doc.role
      });
    });
    res.json(users);
  });
});

module.exports = router;
