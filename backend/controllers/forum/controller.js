const mongoose = require('mongoose');
const ForumModel = require('../../database/models/forumModel');
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');

const getAllForums = async (req,res) => {
  const { params: { id } } = req;
  var forums; 
  if(id === 'allUsers') {
    forums = await ForumModel.find().sort({ createdAt: -1 });
  } else {
    forums = await ForumModel.find({ user: id }).sort({ createdAt: -1 });
  }
  const trimmedForums = forums.map(forum => {
    return {
      _id: forum._id,
      user: forum.user,
      views: forum.views,
      likes: forum.likes,
      comments: forum.comments.length,
      body: forum.body
    }
  })
  res.status(200).json({ msg: 'success', forums: trimmedForums })
}

const getSingleForum = asyncFunctionWrapper(async (req,res, next) => {
  const { id } = req.params;
  const forum = await ForumModel.findById(id);
  if(!forum) {
     return next(new ErrorHandler('Forum Not Found', 404))
  }
  forum.views++;
  await forum.save();
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
