const mongoose = require('mongoose');

const Like = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  username: { type: String, required: true }
});

const Reply = new mongoose.Schema({
    createAt:{ type: Date, default: Date.now},
    username: { type: String, required: true },
    text: { type: String, required: true },
    likes:[Like]
})

 const Comment = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  username: { type: String, required: true },
  text: { type: String, required: true },
  likes:[Like],
  replies:[Reply]
});


const Post = new mongoose.Schema({
  createdAt:{ type: Date, default: Date.now},
  author: { type: String, required: true },
  title: { type: String, required: true },
  place: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  attractions : { type: String, required: true },
  todoList: { type: String, required: true },
  images:[{type: String}],
  likes: [Like],
  comments: [Comment]
});

module.exports = {
  Post,
  Like,
  Comment
}