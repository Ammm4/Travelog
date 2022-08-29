const mongoose = require('mongoose');
const ReplyModel = require('../database/models/replyModel');
const CommentModel = require('../database/models/commentModel');
const LikeModel = require('../database/models/likeModel');
const asyncFunctionWrapper = require("../utils/asyncFunctionWrapper");
const ErrorHandler = require("../utils/errorHandler");
const createDetails = require('../utils/createDetails');
const createReplyObject = require('../utils/createReplyObj')

const getReplies = asyncFunctionWrapper(async(req,res,next) => {
  const { query : { user, page } , params: { id } } = req;
  const comment = mongoose.Types.ObjectId(id);
  const Limit = 3;
  const Skip = ( page - 1 ) * Limit;
  let replies = await ReplyModel.find({ comment }).sort({ createdAt: -1 }).skip(Skip).limit(Limit);
  let Replies = [];
  for (const reply of replies) {
    let isLiked = false;
    if(user){
       const details = createDetails({ user, reply: reply._id });
       isLiked = await LikeModel.findOne(details) ? true : false ;
    }
    let Reply = createReplyObject(isLiked, reply)
    Replies = [...Replies, Reply]
    } 
  replies = Replies;
  res.status(200).json({ msg: 'success', replies })
})

const createReply = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: commentId }, user: { userId }, body: { body }} = req;
  const Comment = await CommentModel.findById(commentId);
  if(!Comment) {
    return next(new ErrorHandler('Comment Not Found', 404));
  }
  let details = createDetails({ user: userId, comment: commentId });
  details.body = body;
  await ReplyModel.create(details);
  const reply = await ReplyModel.findOne(details)
  res.status(201).json({ msg: 'success', reply })
 }
)

const updateReply = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id: replyId }, user: { userId }, body: { body } } = req;
  const Reply = await ReplyModel.findById(replyId);
  
  if(!Reply) {
    return next(new ErrorHandler('Reply Not Found', 404));
  }
  if(Reply.user._id.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  Reply.body = body;
  await Reply.save();
  res.status(200).json({msg: 'success', reply: Reply})
 }
)
const deleteReply = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id: replyId }, user: { userId } } = req;
  const reply = await ReplyModel.findById(replyId);
  if(!reply) {
    return next(new ErrorHandler('Reply Not Found', 404));
  }
  if(reply.user._id.toString() !== userId) {
    return next(new ErrorHandler('Not Authorised', 401));
  }
  await reply.deleteOne();
  res.status(200).json({ msg: 'success', reply })
 }
)
module.exports = {
  getReplies,
  createReply,
  updateReply,
  deleteReply,
}