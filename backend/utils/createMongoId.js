const mongoose = require('mongoose');

function createMongoId(id) {
  return mongoose.Types.ObjectId(id)
}

module.exports = createMongoId;

