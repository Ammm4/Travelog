const { PostModel } = require("../../database/models/PostModel");
const  LikeModel  = require("../../database/models/likeModel");
const  CommentModel  = require("../../database/models/commentModel");
const asyncFunctionWrapper = require("../../utils/asyncFunctionWrapper");
const ErrorHandler = require("../../utils/errorHandler");

exports.get_Post_Likes = asyncFunctionWrapper( async(req,res,next) => {
  //const { params}
})

exports.add_Like_To_Post = asyncFunctionWrapper( async( req, res, next ) => {
  const { user: { userId }, params: { post_id } } = req;
  const post = await PostModel.findById(post_id);
  if(!post) return next(new ErrorHandler("Post Not Found", 404));
  let details = {
      user: mongoose.Types.ObjectId(userId),
      post: mongoose.Types.ObjectId(post_id)
    }
  const like = await LikeModel.findOne(details);
  if(like) {
  await like.remove();
  } else {
  await LikeModel.create(details);
  }
  const likes = await LikeModel.find({ post: post_id});
  res.status(201).json({
    success: true, 
    message: "Like Successfully!!",
    likes
  })
})

exports.add_Like_To_Comment = asyncFunctionWrapper( async( req, res, next ) => {
  const { user: { userId }, params: { comment_id } } = req;
  const comment = await CommentModel.findById(comment_id);
    if(!comment) return next(new ErrorHandler("Comment Not Found", 404));
       let details = {
        user: mongoose.Types.ObjectId(userId),
        comment: mongoose.Types.ObjectId(comment_id)
       }
      const like = await LikeModel.findOne(details);
      if(like) {
        await like.remove();
      } else {
        await LikeModel.create(details);
      }
    const likes = await LikeModel.find({ comment: comment_id});
    res.status(201).json({
    success: true, 
    message: "Like Successfully!!",
    likes
  })
})


