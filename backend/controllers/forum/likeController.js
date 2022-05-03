const mongoose = require('mongoose');
const LikeModel = require('../../database/models/likeModel');
const ForumModel = require('../../database/models/forumModel');
const CommentModel = require('../../database/models/commentModel');
const ReplyModel = require('../../database/models/replyModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');
const createDetails = require('../../utils/createDetails');


const likeForum = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, user: { userId } } = req;
  const Forum = await ForumModel.findById(id);
  if(!Forum) return next(new ErrorHandler('Forum Not Found', 404));
  let details = createDetails({ user: userId, forum: id });
  const like = await LikeModel.findOne(details);
  let Like = like, Liked = false;
  if(like) {
    await like.remove();
  } else {
    Like = await LikeModel.create(details);
    Liked = true;
  }
  res.status(200).json({ msg: 'success', Like, Liked })
 }
)

const likeComment = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, user: { userId } } = req;
  const Comment = await CommentModel.findById(id);
  let details = createDetails({ user: userId, comment: id})
  if(!Comment) return next(new ErrorHandler('Comment Not Found', 404))
  const like = await LikeModel.findOne(details);
  let Like, Liked = false;
  if(like) {
    Like = await like.remove();
  } else {
    Like = await LikeModel.create(details);
    Liked = true;
  }
  res.status(200).json({ msg: 'success' , Like, Liked })
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