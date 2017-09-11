const express = require('express');
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

const mongodb = require('../db');

const coll = () => mongodb.getCollection('products');

// root is /api/product
const router = express.Router();

router.patch('/update', (req, res) => {
  try {
    assert.ok(req.body.name);
    assert.ok(req.body.price);
    assert.ok(req.body.stock);
  } catch (e) {
    return res.status(400).json({
      message: 'Please fill in all required fields',
      err: e
    });
  }
  let query = {
    _id: req.body.id ? ObjectId(req.body.id) : ObjectId.createFromTime(Date.now())
  };
  let updateProduct = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };
  if (req.body.imageUrl) updateProduct.imageUrl = req.body.imageUrl;

  // find and modify document
  coll().findAndModify(query, {}, { $set: updateProduct }, { new: true, upsert: true }, (err, result) => {
    try {
      assert.equal(null, err);
    } catch (e) {
      return res.status(500).json({
        message: 'Product Not Updated',
        err: e
      });
    }
    let product = {
      id: result.value._id,
      name: result.value.name,
      price: result.value.price,
      stock: result.value.stock,
      imageUrl: result.value.imageUrl
    };
    return res.json(product);
  });
});

router.get('/load', (req, res) => {
  coll().find().toArray((err, docs) => {
    try {
      assert.equal(null, err);
    } catch (e) {
      return res.status(500).json({
        message: 'Products Not Loaded',
        err: e
      });
    }
    let products = [];
    docs.forEach(doc => {
      products.push({
        id: doc._id,
        name: doc.name,
        price: doc.price,
        stock: doc.stock,
        imageUrl: doc.imageUrl
      });
    });
    res.json(products);
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
