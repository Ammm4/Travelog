const mongoose = require('mongoose');
const ReplyModel = require('./replyModel');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref:'User'
  },
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Forum'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  },
  body: {
    type: String,
    required: [true, 'Please add a Comment']
  }
  
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }})

CommentSchema.virtual('numLikes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'comment',
  count: true
})
CommentSchema.virtual('numReplies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'comment',
  count: true
})

CommentSchema.pre(/^find/, function() {
  this.populate({ path:'user', select:'_id username avatar' })
  .populate('numLikes')
  .populate('numReplies')
})

CommentSchema.pre('deleteOne', { document: true, query: false}, async function(next) {
    const replies = await ReplyModel.find({ comment: this._id });
    for (const reply of replies) {
      await reply.deleteOne()
    } 
    this.model('Like').deleteMany({ comment : this._id }, next);
})

module.exports = mongoose.model('Comment', CommentSchema);
