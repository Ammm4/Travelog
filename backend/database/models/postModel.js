const mongoose = require('mongoose');

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

Post.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
})

Post.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post'
})

Post.pre([/^find/], function() {
  this.populate({ path:'user', select:'username avatar' })
  .populate({ path:'likes', populate: { path: 'user', select: 'username avatar'}})
  .populate(
    { path:'comments', 
      populate: [{ path: 'user', select: 'username avatar'}, 
                 { path: 'likes', populate: { path:'user', select:'username avatar' } }, 
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


const PostModel = mongoose.models.Post || mongoose.model('Post', Post);

module.exports = {
  PostModel,
}
