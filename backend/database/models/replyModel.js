const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref:'User'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Comment Id is required"],
    ref:'Comment'
  },
  body: {
    type: String,
    required: [true, 'Please add a Comment']
  }
  
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

ReplySchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'reply'
})

ReplySchema.pre('deleteOne',{ document: true, query: false}, async function(next) {
  console.log('Hi Reply');
  this.model('Like').deleteMany({ reply: this._id }, next);
})

module.exports = mongoose.model('Reply', ReplySchema);

