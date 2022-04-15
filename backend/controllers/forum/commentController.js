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
  const Forum = await ForumModel.findById(forumId);
  if(!Forum) {
    return next(new ErrorHandler('Forum Not Found', 404));
  }
  let details = {
    user: mongoose.Types.ObjectId(userId),
    forum: mongoose.Types.ObjectId(forumId),
    body
  }
  await CommentForumModel.create(details);
  const forum = await ForumModel.findById(forumId);
  res.status(200).json({ msg: 'success', forum })
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
  const forum = await ForumModel.findById(Comment.forum)
  res.status(200).json({msg: 'success', forum})
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
