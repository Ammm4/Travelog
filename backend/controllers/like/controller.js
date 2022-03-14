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
  const user_id = req.user.userId;
  const { post_id, comment_id, reply_id } = req.params;
  const post = await PostModel.findOne({ post_id: post_id });
  const user = await UserModel.findById(user_id);
  let postAuthor = post.author.authorID === user_id ? user : await getPostAuthor(post.author.authorId);
  let postAuthor_post = postAuthor.posts.find(post => post.post_id === post_id);
  
  if(!post || !postAuthor_post) return next(new ErrorHandler("Post Not Found", 400));
 
  if(action === "LIKE_POST") {
    post.likes = new_Likes(post.likes, user_id, user.username, user.avatar.avatar_url);
    postAuthor_post.likes =  new_Likes(postAuthor_post.likes, user_id, user.username, user.avatar.avatar_url);
  } else {
    const comment = post.comments.find(comment => comment.comment_id === comment_id);
    const comment1 = postAuthor_post.comments.find(comment => comment.comment_id === comment_id);
    if(!comment || !comment1) return next(new ErrorHandler("Comment Not Found", 400))
    if (action === "LIKE_TO_COMMENT") {
      comment.likes = new_Likes(comment.likes, user_id, user.username, user.avatar.avatar_url);
      comment1.likes = new_Likes(comment1.likes, user_id, user.username, user.avatar.avatar_url);
    } else if (action === "LIKE_TO_COMMENT_REPLY"){
      const reply = comment.replies.find(reply => reply.reply_id === reply_id);
      const reply1 = comment1.replies.find(reply => reply.reply_id === reply_id)
      if(!reply || !reply1) return next(new ErrorHandler("Reply Not Found", 400));
      reply.likes = new_Likes(reply.likes, user_id, user.username, user.avatar.avatar_url);
      reply1.likes = new_Likes(reply1.likes, user_id, user.username, user.avatar.avatar_url);
    }
 }
  await post.save();
  await postAuthor.save();
  
  res.status(200).json({
    success: true, 
    message: "Like Successfully!!",
    post
  })
}

function new_Likes(array, user_id, username, userAvatar) {
  const check_If_Reply_Liked_Already = array.find(elem => elem.user_id === user_id);
  if(check_If_Reply_Liked_Already){
    return array.filter(like => like.user_id !== user_id) 
  } else {
    let newLike = {
      user_id,
      username,
      userAvatar
      };
    return [...array, newLike];
  }
}

async function getPostAuthor(authorId) {
  return await UserModel.findById(authorId)
}