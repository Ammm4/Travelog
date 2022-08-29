const mongoose = require('mongoose');
const LikeModel  = require("../database/models/likeModel");
const ReplyModel = require("../database/models/replyModel");
const CommentModel = require("../database/models/commentModel");
const ForumModel = require("../database/models/forumModel");
const PostModel = require("../database/models/postModel")
const asyncFunctionWrapper = require("../utils/asyncFunctionWrapper");

const getLikes = asyncFunctionWrapper(async(req,res,next) => {
  const { query : { type, id } } = req;
  const convertedId = mongoose.Types.ObjectId(id);
  const likes = await LikeModel.find({[type]: convertedId}).sort({ createdAt: -1 })
  res.status(200).json({ msg: 'success', likes })
})

const likeItem = asyncFunctionWrapper(async(req,res,next) => {
  const {  query : { type, id }, user: { userId } } = req;
  if(type === 'reply') {
   const Reply = await ReplyModel.findById(id);
   if(!Reply) return next(new ErrorHandler('Reply Not Found', 404))
  }
  if(type === 'post') {
   const Post = await PostModel.findById(id);
   if(!Post) return next(new ErrorHandler('Post Not Found', 404))
  }
  if(type === 'forum') {
   const Forum = await ForumModel.findById(id);
   if(!Forum) return next(new ErrorHandler('Forum Not Found', 404))
  }
  if(type === 'comment') {
   const Comment = await CommentModel.findById(id);
   if(!Comment) return next(new ErrorHandler('Comment Not Found', 404))
  }
  let details = {
    user: mongoose.Types.ObjectId(userId),
    [type]: mongoose.Types.ObjectId(id)
  }
  let Like, Liked = false;
  const like = await LikeModel.findOne(details);
  if(like) {
    Like = await like.remove();
  } else {
    Like = await LikeModel.create(details);
    Liked = true;
  }
  res.status(201).json({ msg: 'success' , Like, Liked })
})


module.exports = {
  getLikes,
  likeItem
}