
const { PostModel } = require("../../database/models/PostModel");
const { UserModel } = require("../../database/models/userModel");
const { v4: uuidv4 } = require('uuid');
const asyncFunctionWrapper = require("../../utils/asyncFunctionWrapper");
const ErrorHandler = require("../../utils/errorHandler");

exports.add_Comment_To_Post = asyncFunctionWrapper( async( req, res, next ) => {
  await find_User_Post_Comment_Reply( req, res, next, "ADD_COMMENT_TO_POST");
})

exports.add_Reply_To_Comment = asyncFunctionWrapper( async( req, res, next ) => {
  await find_User_Post_Comment_Reply( req, res, next, "ADD_REPLY_TO_COMMENT")
})

exports.edit_Comment = asyncFunctionWrapper(async(req,res,next) => {
  await find_User_Post_Comment_Reply( req, res, next, "EDIT_COMMENT")
})

exports.edit_Comment_Reply = asyncFunctionWrapper(async(req,res,next) => {
  await find_User_Post_Comment_Reply( req, res, next, "EDIT_COMMENT_REPLY")
})

exports.delete_Comment = asyncFunctionWrapper(async(req,res,next) => {
  await find_User_Post_Comment_Reply( req, res, next, "DELETE_COMMENT")
})

exports.delete_Comment_Reply = asyncFunctionWrapper(async(req,res,next) => {
  await find_User_Post_Comment_Reply( req, res, next, "DELETE_COMMENT_REPLY")
})

async function find_User_Post_Comment_Reply(req, res, next, action) {
  const user_id = req.user.userId;
  const { post_id, comment_id, reply_id } = req.params;
  const { text } = req.body;
  const post = await PostModel.findOne({ post_id: post_id });
  const user = await UserModel.findById(user_id);
  let postAuthor = post.author.authorID === user_id ? user : await getPostAuthor(post.author.authorId);
  let postAuthor_post = postAuthor.posts.find(post => post.post_id === post_id);
  if(!post || !postAuthor_post) return next(new ErrorHandler("Post Not Found", 400))
  
  if(action === 'ADD_COMMENT_TO_POST'){
    const newComment = {
      comment_id: uuidv4(),
      user_id,
      username: user.username,
      userAvatar: user.avatar.avatar_url,
      text,
      likes:[],
      replies:[]
    }
    post.comments = [...post.comments, newComment];
    postAuthor_post.comments = [...postAuthor_post.comments, newComment]
  } else {
    const comment = post.comments.find(comment => comment.comment_id === comment_id);
    const comment1 = postAuthor_post.comments.find(comment => comment.comment_id === comment_id);
    if(!comment || !comment1) return next(new ErrorHandler("Comment Not Found", 400));
     if(action === 'ADD_REPLY_TO_COMMENT') {
       let new_Reply_To_Comment = {
        reply_id: uuidv4(),
        user_id,
        username: user.username,
        userAvatar: user.avatar.avatar_url,
        text,
        likes: []
      }
      comment.replies = [...comment.replies, new_Reply_To_Comment];
      comment1.replies = [...comment1.replies, new_Reply_To_Comment];
     } else {
       if(action === 'EDIT_COMMENT') {
         if(comment.user_id !== user_id) return next(new ErrorHandler("User not authorized to edit",401));
         comment.text = text;
         comment1.text = text;
       } else if (action === "DELETE_COMMENT") {
         if(comment.user_id !== user_id) return next(new ErrorHandler("User not authorized to edit",401));
         let newComments = post.comments.filter(comment => comment.comment_id !== comment_id);
         post.comments = newComments;
         postAuthor_post.comments = newComments;
       } else {
         let reply = comment.replies.find(reply => reply.reply_id === reply_id);
         let reply1 = comment1.replies.find(reply => reply.reply_id === reply_id)
         if(!reply || !reply1) return next(new ErrorHandler("Reply not found", 400));
         if(reply.user_id !== user_id) return next(new ErrorHandler("User not authorized to edit",401))
         if(action === "EDIT_COMMENT_REPLY") {
           reply.text = text;
           reply1.text = text;
          } else if (action === "DELETE_COMMENT_REPLY") {
            const newReplies = comment.replies.filter(reply => reply.reply_id !== reply_id);
            comment.replies = newReplies;
            comment1.replies = newReplies;
          }
      }
     } 
  }
 
 await post.save();
 await postAuthor.save();
 res.status(200).json({
    success: true, 
    message: "Action Successful!!",
    post
  }) 
}

async function getPostAuthor(authorId) {
  return await UserModel.findById(authorId)
}

