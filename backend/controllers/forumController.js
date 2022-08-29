const ForumModel = require('../database/models/forumModel');
const LikeModel = require('../database/models/likeModel')
const ErrorHandler = require("../utils/errorHandler.js");
const asyncFunctionWrapper =  require('../utils/asyncFunctionWrapper');
const createDetails = require('../utils/createDetails');
const createForumObject = require('../utils/createForumObj');
const createMongoId = require('../utils/createMongoId');

const getForums = asyncFunctionWrapper(async (req,res, next) => {
  const { query: { user_type, user, page } } = req;
  let Limit = 3;
  let Skip = (page - 1) * 3;
  var forums;
  var count;
  if(user_type === 'allUsers') {
    count = await ForumModel.countDocuments({});
    forums = await ForumModel.find().sort({ createdAt: -1 }).skip(Skip).limit(Limit);
  } else {
    const user_id = createMongoId(user_type);
    count = await ForumModel.countDocuments({ user: user_id });
    forums = await ForumModel.find({ user: user_id }).sort({ createdAt: -1 }).skip(Skip).limit(Limit);
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
  res.status(200).json({ msg: 'success', forums, count })
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
  const forum = await ForumModel.create(req.body);
  await forum.populate({ path: 'user', select: 'username avatar' })
  const Forum = createForumObject(false, forum)
  res.status(201).json({ msg: 'New Forum Created', forum: Forum })
})

const updateForum = asyncFunctionWrapper(async (req,res, next) => {
  const { params: { id }, user: { userId }, body: { body, title } } = req;
  const oldForum = await ForumModel.findById(id);
  if(oldForum.user._id.toString() !== userId) {
   return next(new ErrorHandler('Not Authorised!!', 401))
  }
  oldForum.body = body;
  oldForum.title = title;
  await oldForum.save();
   res.status(200).json({ msg: 'Forum Updated', forum: oldForum })
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
  res.status(200).json({ msg: 'Forum Deleted', forum: oldForum })
})

module.exports = {
  getForums,
  getForum,
  createForum,
  updateForum,
  deleteForum
}
