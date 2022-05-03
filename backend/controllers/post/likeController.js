const { PostModel } = require("../../database/models/PostModel");
const  LikeModel  = require("../../database/models/likeModel");
const  CommentModel  = require("../../database/models/commentModel");
const asyncFunctionWrapper = require("../../utils/asyncFunctionWrapper");
const ErrorHandler = require("../../utils/errorHandler");
const createDetails = require('../../utils/createDetails');

exports.get_Post_Likes = asyncFunctionWrapper( async(req,res,next) => {
  //const { params}
})

exports.add_Like_To_Post = asyncFunctionWrapper( async( req, res, next ) => {
  const { user: { userId }, params: { id } } = req;
  const post = await PostModel.findById(id);
  if(!post) return next(new ErrorHandler("Post Not Found", 404));
  const details = createDetails({ user: userId, post: id })
  const like = await LikeModel.findOne(details);
  let Like = like, Liked = false;
  if(like) {
    await like.remove();
  } else {
    Like = await LikeModel.create(details);
    Liked = true;
  }
  res.status(201).json({ success: true, message: 'Success', Liked, Like })
})

exports.add_Like_To_Comment = asyncFunctionWrapper( async( req, res, next ) => {
  const { user: { userId }, params: { id } } = req;
  const comment = await CommentModel.findById(id);
  if(!comment) return next(new ErrorHandler("Comment Not Found", 404));
  const details = createDetails({ user: userId, comment: id });
  const like = await LikeModel.findOne(details);
  let Liked = false; 
  let Like = like;
  if(like) {
    await like.remove();
  } else {
    Like = await LikeModel.create(details);
    Liked = true
  }
  res.status(201).json({ success: true, Liked, Like })
})

exports.postLiked = asyncFunctionWrapper(async (req,res,next) => {
   const { user: { userId }, params: { post_id } } = req;
   let isLiked = false;
   let details = createDetails({ user: userId, post: post_id});
   const like = await LikeModel.findOne(details);
   if(like) isLiked = true  
   res.status(200).json({
    success: true, 
    isLiked
  })
})

