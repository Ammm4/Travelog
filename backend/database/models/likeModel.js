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
  
}, { timestamps: true, supressReservedKeysWarning: true })

/* const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref:'User'
  },
  on: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath:'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum:['Forum', 'Comment', 'Reply']
  },
   */

module.exports = mongoose.model('Like', LikeSchema);