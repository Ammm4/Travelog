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
    required: [true, "Forum Id is required"],
    ref:'Forum'
  },
  body: {
    type: String,
    required: [true, 'Please add a Comment']
  }
  
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }})

CommentSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'comment'
})
CommentSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'comment'
})

CommentSchema.pre('deleteOne', { document: true, query: false}, async function(next) {
   console.log('Hi Comment');
    const replies = await ReplyModel.find({ comment: this._id });
    for (const reply of replies) {
      await reply.deleteOne()
    } 
    this.model('Like').deleteMany({ comment : this._id }, next);
})

module.exports = mongoose.model('Comment', CommentSchema);