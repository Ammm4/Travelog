const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://admin:yatrasansar14.com@cluster0.lqavg.mongodb.net/travelApp?retryWrites=true&w=majority";

const Connect = () => {
  return mongoose.connect(DB_URI);
}

module.exports = {
  Connect
}
