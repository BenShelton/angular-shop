const express = require('express');
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

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
  // find document
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

router.patch('/update', (req, res) => {
  // check fields
  try {
    assert.ok(req.body.id);
  } catch (e) {
    return res.status(400).json({
      message: 'Login ID Not Found',
      err: e
    });
  }
  let query = {
    '_id': ObjectId(req.body.id)
  };
  let updateUser = {};
  if (req.body.name) updateUser.name = req.body.name;
  if (req.body.email) updateUser.email = req.body.email;
  if (req.body.password) updateUser.password = req.body.password;
  if (req.body.role) updateUser.role = req.body.role;

  // find and modify document
  coll().findOneAndUpdate(query, { $set: updateUser }, { returnOriginal: false }, (err, result) => {
    try {
      assert.equal(null, err);
    } catch (e) {
      return res.status(500).json({
        message: 'User Not Updated',
        err: e
      });
    }
    let user = {
      id: result.value._id,
      name: result.value.name,
      email: result.value.email,
      role: result.value.role
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
