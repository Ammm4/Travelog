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
    required: [true, 'Please add a Reply']
  }
  
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }})

ReplySchema.virtual('numLikes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'reply',
  count: true
})

ReplySchema.pre(/^find/, function(next) {
  this.populate({ path:'user', select:'_id username avatar' })
  .populate('numLikes')
  next()
})


ReplySchema.pre('deleteOne',{ document: true, query: false}, async function(next) {
  this.model('Like').deleteMany({ reply: this._id }, next);
})

module.exports = mongoose.models.Reply || mongoose.model('Reply', ReplySchema);

