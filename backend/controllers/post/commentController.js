
const { PostModel } = require("../../database/models/PostModel");
const CommentModel = require('../../database/models/commentModel');
const asyncFunctionWrapper = require("../../utils/asyncFunctionWrapper");
const ErrorHandler = require("../../utils/errorHandler");

exports.add_Comment_To_Post = asyncFunctionWrapper( async( req, res, next ) => {
  const { user: { userId }, params: { post_id }, body: { text } } = req;
  const Post = await PostModel.findById(post_id);
  if(!Post) return next(new ErrorHandler("Post Not Found", 404))
  let details = {
    user: mongoose.Types.ObjectId(userId),
    post: mongoose.Types.ObjectId(post_id),
    body: text
  }
  await CommentForumModel.create(details);
  const post = await postModel.findById(post_id);
  res.status(200).json({ msg: 'success', post })
})

exports.edit_Comment = asyncFunctionWrapper(async(req,res,next) => {
  const { user: { userId }, params: { comment_id }, body: { text }} = req;
  const Comment = await CommentModel.findById(comment_id);
  if(Comment.user.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  Comment.body = text;
  await Comment.save();
  const post = await ForumModel.findById(Comment.post)
  res.status(200).json({msg: 'success', post})
})

exports.delete_Comment = asyncFunctionWrapper(async(req,res,next) => {
  const { user: { userId }, params: { comment_id } } = req;
  const Comment = await CommentModel.findById(comment_id);
  if(Comment.user.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  await Comment.deleteOne();
  const post = await ForumModel.findById(Comment.post)
  res.status(200).json({msg: 'success', post})
})



