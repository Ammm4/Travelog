const mongoose = require('mongoose');
const CommentModel = require('./commentModel');

const ForumSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref:'User'
  },
  title: { 
    type: String, 
    trim: true,
    required: [true, "Forum Topic is required!"],
    minLength:[20, "Forum cannot be less than 20 characters!"]
  },
  body: {
    type: String,
    trim: true
  },
  views: {
    type: Number,
    default: 0,
  }

}, { timestamps: true,  toJSON: { virtuals: true }, toObject: { virtuals: true }});

ForumSchema.virtual('numComments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'forum',
  count: true
})

ForumSchema.virtual('numLikes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'forum',
  count: true
})

ForumSchema.pre(/^find/, function() {
  this.populate({ path:'user', select:'username avatar' })
  .populate('numLikes')
  .populate('numComments') 
})

ForumSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const comments = await CommentModel.find({ forum: this._id });
    for (const comment of comments) {
      await comment.deleteOne()
    } 
    this.model('Like').deleteMany({ forum: this._id }, next);
})

module.exports = mongoose.models.Forum || mongoose.model('Forum', ForumSchema);
