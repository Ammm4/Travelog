const ForumModel = require('../../database/models/forumModel');
const LikeModel = require('../../database/models/likeModel')
const ErrorHandler = require("../../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');
const createDetails = require('../../utils/createDetails');
const createForumObject = require('../../utils/createForumObj');
const createMongoId = require('../../utils/createMongoId');

const getForums = asyncFunctionWrapper(async (req,res, next) => {
  const { query: { user_type, user } } = req;
  var forums;
  if(user_type === 'allUsers') {
    forums = await ForumModel.find().sort({ createdAt: -1 });
  } else {
     const user_id = createMongoId(user_type)
    forums = await ForumModel.find({ user: user_id }).sort({ createdAt: -1 });
  }
  if(user) {
    let Forums = [];
    for (const forum of forums) { 
      const details = createDetails({ user, forum: forum._id })
      const isLiked = await LikeModel.findOne(details) ? true : false ;
      const Forum = createForumObject(isLiked, forum);
      Forums = [...Forums, Forum]
    } 
    forums = Forums;
  }
  res.status(200).json({ msg: 'success', forums })
})

const getForum = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, query: { user } } = req;
  const forum = await ForumModel.findById(id);
  if(!forum) {
     return next(new ErrorHandler('Forum Not Found', 404))
  }
  forum.views++;
  await forum.save();
  let isLiked = false;
  if(user) {
      const details = createDetails({ user: user, forum: forum._id })
      isLiked = await LikeModel.findOne(details) ? true : false ;
  }
  let Forum = createForumObject(isLiked, forum)
  res.status(200).json({ msg: 'success', forum: Forum })
})

const createForum = asyncFunctionWrapper(async (req,res) => {
  const { userId } = req.user;
  req.body.user = createMongoId(userId);
  const forum = await ForumModel.create(req.body)
  res.status(201).json({ msg: 'success', forum })
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
  getForums,
  getForum,
  createForum,
  updateForum,
  deleteForum
}
