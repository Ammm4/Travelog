require('dotenv').config();
const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI;

const Connect = () => {
  return mongoose.connect(DB_URI);
}

module.exports = {
  Connect
}
