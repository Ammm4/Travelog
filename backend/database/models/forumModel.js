const mongoose = require('mongoose');
const CommentModel = require('./commentModel');

const ForumSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref:'User'
  },
  body: { 
    type: String, 
    required: [true, "Forum Topic is required!"],
    minLength:[20, "Forum cannot be less than 20 characters!"]
  },

}, { timestamps: true,  toJSON: { virtuals: true }, toObject: { virtuals: true }});


ForumSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'forum'
})

ForumSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'forum'
})

ForumSchema.pre(/^find/, function() {
  this.populate({ path:'user', select:'username avatar' })
  .populate({ path:'likes', populate: { path: 'user', select: 'username avatar'}})
  .populate(
    { path:'comments', 
      populate: [{ path: 'user', select: 'username avatar'}, 
                 { path: 'likes', select: 'username avatar'}, 
                 { path: 'replies', 
                  populate:([ { path: 'user', select:'username avatar'}, 
                              { path: 'likes', 
                              populate:({ path:'user', select: 'username avatar' })
                              }
                            ])
                 }
                ]
    });
})

ForumSchema.pre('deleteOne', { document: true, query: false}, async function(next) {
    const comments = await CommentModel.find({ forum: this._id });
    for (const comment of comments) {
      await comment.deleteOne()
    } 
    this.model('Like').deleteMany({ forum: this._id }, next);
})

module.exports = mongoose.model('Forum', ForumSchema);