const mongoose = require('mongoose');

const Like = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  user_id : { type: String, required: true },
  name: { type: String, required: true }
});

const Reply = new mongoose.Schema({
    createAt:{ type: Date, default: Date.now},
    user_id:{ type: String, required: true },
    name: { type: String, required: true },
    text: { type: String, required: true },
    likes:[Like]
})

const Image = new mongoose.Schema({
   id: {
     type:String,
     required: true
   },
   url: {
     type:String,
     required: true
   }
})

 const Comment = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  likes:[Like],
  replies:[Reply]
});


const Post = new mongoose.Schema({
  createdAt:{ type: Date, default: Date.now},
  author: { type: String, required: true },
  title: { type: String, required: true },
  destination: { type: String, required: [true, "Please add the destination name!!"] },
  description: { type: String, required: [true, "Please add some description!"] },
  cost: { type: Number, required:  [true, "Please add total cost!!"], maxLength: 8},
  attractions : { type: String, required:[true, "Please add nearby attractions!!"]},
  todoList: { type: String, required: [true, "Please add things to do"] },
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