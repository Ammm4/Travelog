const mongoose = require('mongoose');
const LikeModel = require('../../database/models/likeModel');
const ForumModel = require('../../database/models/forumModel');
const CommentModel = require('../../database/models/commentModel');
const ReplyModel = require('../../database/models/replyModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');


const likeForum = asyncFunctionWrapper(async (req,res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  let details = {
    user: mongoose.Types.ObjectId(userId),
    forum: mongoose.Types.ObjectId(id)
  }
  const Forum = await ForumModel.findById(id);
  const like = await LikeModel.findOne(details);
  if(!Forum) {
    return next(new ErrorHandler('Forum Not Found', 404))
  }
  if(like) {
    await like.remove();
  } else {
    await LikeModel.create(details);
  }
  res.status(200).json({msg: 'success'})
 }
)
const likeComment = asyncFunctionWrapper(async (req,res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  let details = {
    user: mongoose.Types.ObjectId(userId),
    comment: mongoose.Types.ObjectId(id)
  }
  const Comment = await CommentModel.findById(id);
  const like = await LikeModel.findOne(details);
  if(!Comment) {
    return next(new ErrorHandler('Comment Not Found', 404))
  }
  if(like) {
    await like.remove();
  } else {
    await LikeModel.create(details);
  }
  res.status(200).json({msg: 'success'})
 }
)

const likeReply = asyncFunctionWrapper(async (req,res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  let details = {
    user: mongoose.Types.ObjectId(userId),
    reply: mongoose.Types.ObjectId(id)
  }
  const Reply = await ReplyModel.findById(id);
  const like = await LikeModel.findOne(details);
  if(!Reply) {
    return next(new ErrorHandler('Reply Not Found', 404))
  }
  if(like) {
    await like.remove();
  } else {
    await LikeModel.create(details);
  }
  res.status(200).json({msg: 'success'})
 }
)

module.exports = {
  likeForum,
  likeComment,
  likeReply
}
