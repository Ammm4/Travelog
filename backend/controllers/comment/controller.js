
const { PostModel } = require("../../database/models/PostModel");
const { UserModel } = require("../../database/models/userModel");
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
  const user_id = req.user.id;
  const { post_id, comment_id, reply_id } = req.params;
  const { text } = req.body;
  const post = await PostModel.findById(post_id);
  if(!post) return next(new ErrorHandler("Post Not Found", 400))
  const user = await UserModel.findById(user_id);
  if(!user) return next(new ErrorHandler("User doesn't Exist", 400))
  if(action === 'ADD_COMMENT_TO_POST'){
    const newComment = {
    user_id,
    name: user.username,
    text,
    likes:[],
    replies:[]
    }
    post.comments = [...post.comments, newComment];
  } else {
    const comment = post.comments.find(comment => comment._id.toString() === comment_id);
    if(!comment) return next(new ErrorHandler("Comment Not Found", 400));
     if(action === 'ADD_REPLY_TO_COMMENT') {
       let new_Reply_To_Comment = {
       user_id,
       name: user.username,
       text,
       likes: []
      }
      comment.replies = [...comment.replies, new_Reply_To_Comment]
     } else {
       if(comment.user_id !== user_id) return next(new ErrorHandler("User not authorized to edit",401));
       if(action === 'EDIT_COMMENT'){
         comment.text = text;
       } else if (action === "DELETE_COMMENT") {
         let newComments = post.comments.filter(comment => comment._id.toString() !== comment_id);
         post.comments = newComments;
       } else {
         let reply = comment.replies.find(reply => reply._id.toString() === reply_id);
         if(!reply) return next(new ErrorHandler("Reply not found", 400));
         if(reply.user_id !== user_id) return next(new ErrorHandler("User not authorized to edit",401))
         if(action === "EDIT_COMMENT_REPLY") {
           reply.text = text;
        } else if (action === "DELETE_COMMENT_REPLY") {
          const newReplies = comment.replies.filter(reply => reply._id.toString() !== reply_id);
          comment.replies = newReplies;
        }
      }
     } 
  }
 
 await post.save();
  res.status(200).json({
    success: true, 
    message: "Action Successful!!"
  }) 
}


