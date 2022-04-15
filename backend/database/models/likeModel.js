const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref:'User'
  },
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Forum'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Reply'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }
  
}, { timestamps: true, supressReservedKeysWarning: true })


module.exports = mongoose.model('Like', LikeSchema);