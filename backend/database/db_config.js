const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI;

const Connect_To_MongoDB_Atlas = () => {
  return mongoose.connect(DB_URI);
}

module.exports = {
  Connect_To_MongoDB_Atlas
}
