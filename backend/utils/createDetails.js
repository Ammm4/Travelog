const mongoose = require('mongoose');

function createDetails(data) {
  let keyLists = Object.keys(data);
  let details = {};
  for(let i = 0; i < keyLists.length; i++) {
     details[keyLists[i]] = mongoose.Types.ObjectId(data[keyLists[i]])
  }
  return details
}

module.exports = createDetails;