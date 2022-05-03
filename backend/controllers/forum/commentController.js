const mongoose = require('mongoose');
const CommentForumModel = require('../../database/models/commentModel');
const LikeModel = require('../../database/models/likeModel');
const ForumModel = require('../../database/models/forumModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');
const createDetails = require('../../utils/createDetails')
const createCommentObject = require('../../utils/createCommentObj');

const getComments = asyncFunctionWrapper(async (req,res) => {
  const { params: { id }, query: { user } } = req;
  const forum = mongoose.Types.ObjectId(id);
  let comments = await CommentForumModel.find({ forum }).sort({ createdAt: -1 });
  if(user) {
  let Comments = [];
  for (const comment of comments) {
    const details = createDetails({ user, comment: comment._id });
    const isLiked = await LikeModel.findOne(details) ? true : false ;
    let Comment = createCommentObject(isLiked,comment)
      Comments = [...Comments, Comment]
    } 
    comments = Comments;
  }
     res.status(200).json({ msg: 'success', comments })
  }
)

const createComment = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: forumId }, user: { userId }, body: { body }} = req;
  const Forum = await ForumModel.findById(forumId);
  if(!Forum) {
    return next(new ErrorHandler('Forum Not Found', 404));
  }
  let details = createDetails({ user: userId, forum: forumId });
  details.body = body;
  await CommentForumModel.create(details);
  const comment = await CommentForumModel.findOne(details);
  res.status(200).json({ msg: 'success', comment })
 }
)

const updateComment = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: commentId }, user: { userId }, body: { body }} = req;
  const comment = await CommentForumModel.findById(commentId);
  if(!comment) {
    return next(new ErrorHandler('Comment Not Found', 404));
  }
  if(comment.user._id.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  comment.body = body;
  await comment.save();
  res.status(200).json({msg: 'success', comment})
 }
)

const deleteComment = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id: commentId }, user: { userId } } = req;
  const comment = await CommentForumModel.findById(commentId);
  if(!comment) {
    return next(new ErrorHandler('Comment Not Found', 404));
  }
  
  if(comment.user._id.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  await comment.deleteOne();
  res.status(200).json({ msg: 'success', comment})
 }
)

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
}
