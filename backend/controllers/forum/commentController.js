const mongoose = require('mongoose');
const CommentForumModel = require('../../database/models/commentModel');
const ForumModel = require('../../database/models/forumModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');

const getALLForumComments = asyncFunctionWrapper(
   async (req,res) => {
     let forumComments = await CommentForumModel.find();
     res.status(200).json({msg: 'success', comments: forumComments})
   }
)
const createComment = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: forumId }, user: { userId }, body: { body }} = req;
  let details = {
    user: mongoose.Types.ObjectId(userId),
    forum: mongoose.Types.ObjectId(forumId),
    body
  }
  const Forum = await ForumModel.findById(forumId);
  if(!Forum) {
    return next(new ErrorHandler('Forum Not Found', 404));
  }
  const comment = await CommentForumModel.create(details);
  res.status(200).json({msg: 'success', comment})
 }
)

const updateComment = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: commentId }, user: { userId }, body: { body }} = req;
  const Comment = await CommentForumModel.findById(commentId);
  if(!Comment) {
    return next(new ErrorHandler('Comment Not Found', 404));
  }
  if(Comment.user.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  Comment.body = body;
   await Comment.save();
  res.status(200).json({msg: 'success', comment: Comment})
 }
)

const deleteComment = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id: commentId }, user: { userId }, body: { body }} = req;
  const Comment = await CommentForumModel.findById(commentId);
  if(!Comment) {
    return next(new ErrorHandler('Comment Not Found', 404));
  }
  
  if(Comment.user.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  await Comment.deleteOne();
  res.status(200).json({ msg: 'success' })
 }
)

module.exports = {
  createComment,
  updateComment,
  deleteComment,
}
