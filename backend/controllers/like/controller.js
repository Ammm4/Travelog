const { PostModel } = require("../../database/models/PostModel");
const { UserModel } = require("../../database/models/userModel");
const asyncFunctionWrapper = require("../../utils/asyncFunctionWrapper");
const ErrorHandler = require("../../utils/errorHandler");

exports.add_Like_To_Post = asyncFunctionWrapper( async( req, res, next ) => {
  await find_User_Post_Comment_Reply(req, res, next, "LIKE_POST")
})

exports.add_Like_To_Comment = asyncFunctionWrapper( async( req, res, next ) => {
 await find_User_Post_Comment_Reply(req, res, next, "LIKE_TO_COMMENT")
})

exports.add_Like_To_Comment_Reply = asyncFunctionWrapper( async( req, res, next ) => {
  await find_User_Post_Comment_Reply(req, res, next, "LIKE_TO_COMMENT_REPLY")
})

async function find_User_Post_Comment_Reply(req, res, next, action){
  const user_id = req.user.id;
  const { post_id, comment_id, reply_id } = req.params;
  const post = await PostModel.findById(post_id);
  const user = await UserModel.findById(user_id);
  if(!post) return next(new ErrorHandler("Post Not Found", 400));
  if(action === "LIKE_POST"){
    post.likes = new_Likes(post.likes, user_id, user.username)
  } else {
    const comment = post.comments.find(comment => comment._id.toString() === comment_id);
    if(!comment) return next(new ErrorHandler("Comment Not Found", 400))
    if (action === "LIKE_TO_COMMENT") {
      comment.likes = new_Likes(comment.likes, user_id, user.username)
    } else if (action === "LIKE_TO_COMMENT_REPLY"){
      const reply = comment.replies.find(reply => reply._id.toString() === reply_id)
      if(!reply) return next(new ErrorHandler("Reply Not Found", 400));
      reply.likes = new_Likes(reply.likes, user_id, user.username)
  }
 }
  await post.save();
  res.status(200).json({
    success: true, 
    message: "Like Successfully!!"
  })
}

function new_Likes(array, user_id, name) {
  const check_If_Reply_Liked_Already = array.find(elem => elem.user_id === user_id);
  if(check_If_Reply_Liked_Already){
    return array.filter(like => like.user_id !== user_id) 
  } else {
    let newLike = {
      user_id,
      name
      };
    return [...array, newLike];
  }
}
