const express = require('express');
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

const mongodb = require('../db');

const coll = () => mongodb.getCollection('orders');

// root is /api/product
const router = express.Router();

router.post('/create', (req, res) => {
  console.log(req.body);
  try {
    assert.ok(req.body.userId);
    assert.ok(req.body.items);
    assert.ok(req.body.status);
  } catch (e) {
    return res.status(400).json({
      message: 'Order Details Incomplete',
      err: e
    });
  }
  coll().insertOne(req.body, (err, result) => {
    try {
      assert.equal(null, err);
      assert.ok(result);
    } catch (e) {
      return res.status(404).json({
        message: 'Order Not Created',
        err: e
      });
    }
    let order = {
      id: result.insertedId,
      userId: req.body.userId,
      items: req.body.items,
      status: req.body.status
    };
    return res.json(order);
  });
});

router.delete('/delete/:id', (req, res) => {
  try {
    assert.ok(req.params.id);
  } catch (e) {
    return res.status(400).json({
      message: 'No Product ID Supplied',
      err: e
    });
  }
  coll().deleteOne({_id: ObjectId(req.params.id)}, (err, result) => {
    try {
      assert.equal(null, err);
      assert.equal(1, result.result.n);
    } catch (e) {
      return res.status(500).json({
        message: 'Product Not Deleted',
        err: e
      });
    }
    return res.json({id: req.params.id});
  });
});

module.exports = router;
