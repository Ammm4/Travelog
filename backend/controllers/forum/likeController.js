const mongoose = require('mongoose');
const LikeModel = require('../../database/models/likeModel');
const ForumModel = require('../../database/models/forumModel');
const CommentModel = require('../../database/models/commentModel');
const ReplyModel = require('../../database/models/replyModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');


const likeForum = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, user: { userId } } = req;
  const Forum = await ForumModel.findById(id);
  if(!Forum) return next(new ErrorHandler('Forum Not Found', 404))  
  let details = {
    user: mongoose.Types.ObjectId(userId),
    forum: mongoose.Types.ObjectId(id)
  }
  const like = await LikeModel.findOne(details);
  if(like) {
    await like.remove();
  } else {
    await LikeModel.create(details);
  }
  const forum = await ForumModel.findById(id);
  res.status(200).json({ msg: 'success', forum })
 }
)

const likeComment = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, user: { userId } } = req;
  const Comment = await CommentModel.findById(id);
  if(!Comment) return next(new ErrorHandler('Comment Not Found', 404))
  let details = {
    user: mongoose.Types.ObjectId(userId),
    comment: mongoose.Types.ObjectId(id)
  }
  const like = await LikeModel.findOne(details);
  if(like) {
    await like.remove();
  } else {
    await LikeModel.create(details);
  }
  const forum = await ForumModel.findById(Comment.forum._id);
  res.status(200).json({ msg: 'success' , forum})
 }
)

const likeReply = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, user: { userId } } = req;
  const Reply = await ReplyModel.findById(id);
   if(!Reply) {
    return next(new ErrorHandler('Reply Not Found', 404))
  }
  let details = {
    user: mongoose.Types.ObjectId(userId),
    reply: mongoose.Types.ObjectId(id)
  }
  const like = await LikeModel.findOne(details);
  if(like) {
    await like.remove();
  } else {
    await LikeModel.create(details);
  }
  const forum = await ForumModel.findById(id);
  res.status(200).json({ msg: 'success' , forum })
 }
)

module.exports = {
  likeForum,
  likeComment,
  likeReply
}

const sendResponse =  async(res, id) => {
  const forum = await ForumModel.findById(id);
  res.status(200).json({ msg: 'success' , forum })
}