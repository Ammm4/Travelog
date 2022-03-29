const mongoose = require('mongoose');
const ForumModel = require('../../database/models/forumModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');

const getAllForums = async (req,res) => {
  const forums = await ForumModel.find();
  const trimmedForums = forums.map(forum => {
    return {
      user: forum.user,
      likes: forum.likes.length,
      comments: forum.comments.length
    }
  })
  res.status(200).json({msg: 'success', trimmedForums})
}

const getSingleForum = asyncFunctionWrapper(async (req,res, next) => {
  const { id } = req.params;
  const forum = await ForumModel.findById(id);
  if(!forum) {
     return next(new ErrorHandler('Forum Not Found', 404))
  }
  res.status(200).json({ msg: 'success', forum })
})

const createForum = asyncFunctionWrapper(async (req,res) => {
  const { userId } = req.user;
  req.body.user = mongoose.Types.ObjectId(userId);
  const forum = await ForumModel.create(req.body)
  res.status(201).json({msg: 'success', forum})
})

const updateForum = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, user: { userId }, body: { body } } = req;
  const oldForum = await ForumModel.findById(id);
  if(oldForum.user._id.toString() !== userId) {
   return next(new ErrorHandler('Not Authorised!!', 401))
  }
  oldForum.body = body;
  await oldForum.save();
   res.status(200).json({msg: 'success', forum: oldForum})
}
)
const deleteForum = asyncFunctionWrapper(async (req,res, next) => {
 const { params: { id }, user: { userId } } = req;
  const oldForum = await ForumModel.findById(id);
  if(!oldForum) {
    return next(new ErrorHandler('Forum Not Found', 404))
  }
  if(oldForum.user._id.toString() !== userId) {
   return next(new ErrorHandler('Not Authorised!!', 401))
  }
  await oldForum.deleteOne();
  res.status(200).json({msg: 'success'})
})

module.exports = {
  getAllForums,
  getSingleForum,
  createForum,
  updateForum,
  deleteForum
}
