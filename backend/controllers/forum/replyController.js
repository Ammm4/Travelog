const mongoose = require('mongoose');
const CommentForumModel = require('../../database/models/commentModel');
const ReplyModel = require('../../database/models/replyModel');
const ForumModel = require('../../database/models/forumModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');

const getALLForumComments = asyncFunctionWrapper(
   async (req,res) => {
     let commentReplies = await ReplyModel.find();
     res.status(200).json({msg: 'success', replies: commentReplies})
   }
)
const createReply = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: commentId }, user: { userId }, body: { body }} = req;
  if(!commentId) {
    return next(new ErrorHandler('Bad Request', 401));
  }
  let details = {
    user: mongoose.Types.ObjectId(userId),
    comment: mongoose.Types.ObjectId(commentId),
    body
  }
  const Comment = await CommentForumModel.findById(commentId);
  if(!Comment) {
    return next(new ErrorHandler('Comment Not Found', 404));
  }
  const reply = await ReplyModel.create(details);
  res.status(200).json({msg: 'success', reply})
 }
)

const updateReply = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: replyId }, user: { userId }, body: { body } } = req;
  if(!replyId) {
    return next(new ErrorHandler('Bad Request', 401));
  }
  const Reply = await ReplyModel.findById(replyId);
  if(!Reply) {
    return next(new ErrorHandler('Reply Not Found', 404));
  }
  if(Reply.user.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  Reply.body = body;
   await Reply.save();
  res.status(200).json({msg: 'success', reply: Reply})
 }
)

const deleteReply = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id: replyId }, user: { userId } } = req;
  if(!replyId) {
    return next(new ErrorHandler('Bad Request', 401));
  }
  const Reply = await ReplyModel.findById(replyId);
  if(!Reply) {
    return next(new ErrorHandler('Reply Not Found', 404));
  }
  if(Reply.user.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  await Reply.deleteOne();
  res.status(200).json({ msg: 'success' })
 }
)

module.exports = {
  createReply,
  updateReply,
  deleteReply,
}
