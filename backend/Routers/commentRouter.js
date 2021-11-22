const { 
  add_Comment_To_Post, 
  add_Reply_To_Comment, 
  edit_Comment,
  edit_Comment_Reply,
  delete_Comment,
  delete_Comment_Reply} 
  = require('../controllers/comment/controller');
const is_User_Authenticated = require('../middleware/checkAuthentication');

const router = require('express').Router();

router.route('/:post_id/comment_post').put(is_User_Authenticated, add_Comment_To_Post);
router.route('/:post_id/comments/:comment_id/reply_comment').put(is_User_Authenticated, add_Reply_To_Comment);
router.route('/:post_id/comments/:comment_id/delete_comment').delete(is_User_Authenticated, delete_Comment);
router.route('/:post_id/comments/:comment_id/edit_comment').patch(is_User_Authenticated, edit_Comment);
router.route('/:post_id/comments/:comment_id/replies/:reply_id/edit_comment_reply').patch(is_User_Authenticated, edit_Comment_Reply);
router.route('/:post_id/comments/:comment_id/replies/:reply_id/delete_comment_reply').delete(is_User_Authenticated, delete_Comment_Reply);
module.exports = router;