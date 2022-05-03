const express = require('express');
const router = express.Router();
const { 
  getForums, 
  getForum, 
  createForum, 
  updateForum, 
  deleteForum  
} = require('../controllers/forum/controller');
const { 
  likeForum, 
  likeComment,
  likeReply 
} = require('../controllers/forum/likeController');
const { 
  getComments,
  createComment, 
  updateComment, 
  deleteComment
}= require('../controllers/forum/commentController');
const { 
  createReply,
  updateReply,
  deleteReply,
} = require('../controllers/forum/replyController');

const is_User_Authenticated = require('../middleware/checkAuthentication');

router.route('/forums').get(getForums).post( is_User_Authenticated, createForum)
router.route('/forums/:id')
.get(getForum)
.patch(is_User_Authenticated, updateForum)
.delete(is_User_Authenticated, deleteForum)
.post(is_User_Authenticated, likeForum);
router.route('/forums/:id/comments')
.get(getComments)
.post( is_User_Authenticated, createComment);
router.route('/comments/:id')
.patch(is_User_Authenticated, updateComment)
.post(is_User_Authenticated, likeComment)
.delete(is_User_Authenticated, deleteComment);
router.route('/comments/:id/replies').post(is_User_Authenticated, createReply)
router.route('/replies/:id')
.patch(is_User_Authenticated, updateReply)
.post(is_User_Authenticated, likeReply)
.delete(is_User_Authenticated, deleteReply)
module.exports = router;
