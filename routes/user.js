const express = require('express');
const assert = require('assert');

const mongodb = require('../db');

const coll = () => mongodb.getCollection('users');

// root is /api/user
const router = express.Router();

router.post('/create', (req, res) => {
  // check fields
  try {
    assert.ok(req.body.name);
    assert.ok(req.body.email);
    assert.ok(req.body.password);
    assert.ok(req.body.role);
    assert.ok(req.body.captcha);
  } catch (e) {
    return res.status(400).json({
      message: 'Please fill out all fields',
      err: e
    });
  }
  // insert document
  coll().insertOne(req.body, (err, result) => {
    assert.equal(null, err);
    let user = {
      id: result.insertedId,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };
    return res.json(user);
  });
});

router.post('/login', (req, res) => {
  // check fields
  try {
    assert.ok(req.body.email);
    assert.ok(req.body.password);
  } catch (e) {
    return res.status(400).json({
      message: 'Please fill out all fields',
      err: e
    });
  }
  let query = {
    email: req.body.email,
    password: req.body.password
  };
  // insert document
  coll().findOne(query, (err, result) => {
    assert.equal(null, err);
    try {
      assert.ok(result);
    } catch (e) {
      return res.status(404).json({
        message: 'User Not Found',
        err: e
      });
    }
    let user = {
      id: result._id,
      name: result.name,
      email: result.email,
      role: result.role
    };
    return res.json(user);
  });
});

router.get('/all', (req, res) => {
  coll().find().toArray((err, docs) => {
    assert.equal(null, err);
    return res.json(docs);
  });
});

module.exports = router;
