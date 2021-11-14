const mongoose = require('mongoose');

const Like = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  username: { type: String, required: true }
});

const Comment = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  username: { type: String, required: true },
  text: { type: String, required: true }
});
const Post = new mongoose.Schema({
  createAt:{ type: Date, default: Date.now},
  username: { type: String, required: true },
  likes: [Like],
  comments: [Comment]
});


const userSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String},
  about: { type:  String, default: "" },
  cover: { type:  String, default: "" },
  posts: [Post],
  likes: [Like],
  comments: [Comment]
});







const Posts = new mongoose.Schema({
  posts:[Post]
})

const UserModel = mongoose.model('User', userSchema);
const PostModel = mongoose.model('Post', Posts);


module.exports = {
  UserModel,
  PostModel
}; 
  


