const express = require('express');
const router = express.Router();
const { 
  getAllForums, 
  getSingleForum, 
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

router.route('/forums')
 .get( getAllForums)
 .post( is_User_Authenticated, createForum);
router.route('/forums/:id')
.get(getSingleForum)
.patch(is_User_Authenticated, updateForum)
.delete(is_User_Authenticated, deleteForum)
.post(is_User_Authenticated, likeForum);
router.route('/forums/:id/comments').post( is_User_Authenticated, createComment);
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
