const mongoose = require('mongoose');
const { imgDeleteCloudinary } = require('../../utils/imgCloudinary')

const Image = new mongoose.Schema({
   img_id: {
     type:String,
     required: true
   },
   imgURL: {
     type:String,
     required: true
   },
   imgName: {
     type:String,
     required: true
   }
})

const Post = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref:'User'
  },
  destinationInfo: {
    country: { type: String, required: true },
    destination: { type: String, required: [true, "Please add the destination name!!"] },
    summary: { type: String, required: [true, "Please add some description!"] },
    ratings: { type: Number, required: true }
  },
  travellerInfo : {
    travelType: { type: String },
    time: { type: String },
  },
  recommendations: {
   numOfDays: { type: String },
   daysSummary: { type: String },
   budget: { type: Number, maxLength: 8},
   budgetSummary: { type: String },
   heritages: [ { type: String } ],
   places: [ { type: String } ],
   todos: [{ type: String}],
   others: { type: String },
  },
  images:[Image],
  views: { type: Number, default: 0}
},{ timestamps: true ,toJSON: { virtuals: true }, toObject: { virtuals: true } });

Post.virtual('numComments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true
})

Post.virtual('numLikes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
  count: true
})

Post.pre([/^find/], function() {
  this.populate({ path:'user', select:'username avatar' })
  .populate('numComments')
  .populate('numLikes')
})
Post.pre('deleteOne', { document: true, query: false }, async function(next) {
    if(this.images.length > 0) {
      for(const img of this.images) {
        await imgDeleteCloudinary(img.img_id)
      }
    }
    const comments = await CommentModel.find({ post: this._id });
    for (const comment of comments) {
      await comment.deleteOne()
    } 
    this.model('Like').deleteMany({ post: this._id }, next);
})

module.exports = mongoose.models.Post || mongoose.model('Post', Post)

