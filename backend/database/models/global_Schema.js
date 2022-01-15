const mongoose = require('mongoose');

const Like = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  userAvatar: { type: String, required: true },
});

const Reply = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  reply_id: { type: String, required: true },
  user_id:{ type: String, required: true },
  username: { type: String, required: true },
  userAvatar: { type: String, required: true },
  text: { type: String, required: true },
  likes:[Like]
})

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

 const Comment = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  comment_id: { type: String, required: true },
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  userAvatar: { type: String, required: true },
  text: { type: String, required: true },
  likes:[Like],
  replies:[Reply]
});


const Post = new mongoose.Schema({
  createdAt:{ type: Date, default: Date.now},
  post_id: { type: String, required: true },
  author: {
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    authorAvatar:{ type: String, required: true }
  },
  destinationInfo: {
    country: { type: String, required: true },
    destination: { type: String, required: [true, "Please add the destination name!!"] },
    summary: { type: String, required: [true, "Please add some description!"] },
  },
  travellerInfo : {
    numOfPeople: { type: Number, required: true },
    cost: { type: Number, required:  [true, "Please add total cost!!"], maxLength: 8},
  },
  recommendations: {
   numOfDays: { type: String, required:  [true, "Please add Number of Days!!"] },
   budget: { type: Number, required:  [true, "Please add budget per person!!"], maxLength: 8},
   heritages: [ { type: String } ],
   places: [ { type: String } ],
   todos: [{ type: String, required: [true, "Please add things to do"] }],
   others: {type: String },
  },
  images:[Image],
  likes: [Like],
  comments: [Comment]
});


module.exports = {
  Post,
  Like,
  Comment
}
// No Image https://www.theiasilver.com/index.php/images/products/16093363945fec864a3a7e8.jpg