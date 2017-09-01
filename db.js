const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var state = {
  db: null
};

module.exports = {
  connect: function(uri, options, callback) {
    if (state.db) return callback(null, state.db);
    mongoClient.connect(uri, options, (err, db) => {
      assert.equal(null, err);
      state.db = db;
      callback(null, db);
    });
  },
  getDb: function() {
    assert.notEqual(null, state.db);
    return state.db;
  },
  getCollection: function(collection) {
    assert.notEqual(null, state.db);
    return state.db.collection(collection);
  }
};
