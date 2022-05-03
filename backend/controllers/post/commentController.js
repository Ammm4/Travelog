const mongoose = require('mongoose');
const { PostModel } = require("../../database/models/PostModel");
const CommentModel = require('../../database/models/commentModel');
const LikeModel = require('../../database/models/likeModel');
const asyncFunctionWrapper = require("../../utils/asyncFunctionWrapper");
const ErrorHandler = require("../../utils/errorHandler");
const createDetails = require('../../utils/createDetails');
const createCommentObject = require('../../utils/createCommentObj');

exports.get_Comments = asyncFunctionWrapper(async(req,res,next) => {
  const { query : { user } , params: { id } } = req;
  const post = mongoose.Types.ObjectId(id);
  let comments = await CommentModel.find({ post }).sort({ createdAt: -1 });
  let Comments = [];
  for (const comment of comments) {
    let isLiked = false;
    if(user){
       const details = createDetails({ user, comment: comment._id });
       isLiked = await LikeModel.findOne(details) ? true : false ;
    }
    let Comment = createCommentObject(isLiked,comment)
    Comments = [...Comments, Comment]
    } 
  comments = Comments;
  res.status(200).json({ msg: 'success', comments })
})

exports.add_Comment_To_Post = asyncFunctionWrapper( async( req, res, next ) => {
  const { user: { userId }, params: { id }, body: { body } } = req;
  const Post = await PostModel.findById(id);
  if(!Post) return next(new ErrorHandler("Post Not Found", 404))
  let details = createDetails({ user: userId, post: id })
  details.body =  body;
  await CommentModel.create(details);
  const comment = await CommentModel.findOne(details);
  res.status(200).json({ msg: 'success', comment })
})

exports.edit_Comment = asyncFunctionWrapper(async(req,res,next) => {
  const { user: { userId }, params: { id }, body: { body }} = req;
  const comment = await CommentModel.findById(id);
  if(comment.user._id.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  comment.body = body;
  await comment.save();
  res.status(200).json({ msg: 'success', comment })
})

exports.delete_Comment = asyncFunctionWrapper(async(req,res,next) => {
  const { user: { userId }, params: { id } } = req;
  const comment = await CommentModel.findById(id);
  if(comment.user._id.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
 
  await comment.deleteOne();
  res.status(200).json({ msg: 'success', comment })
})



