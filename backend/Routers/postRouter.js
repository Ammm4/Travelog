const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost, updatePost, deletePost  } = require('../controllers/post/controller');
const { add_Like_To_Post, add_Like_To_Comment } = require('../controllers/post/likeController');
const { get_Comments, add_Comment_To_Post, edit_Comment, delete_Comment } = require('../controllers/post/commentController');
const is_User_Authenticated = require('../middleware/checkAuthentication');

router.route('/posts').get(getPosts).post( is_User_Authenticated, addPost);
router.route('/posts/:id')
.get(getPost)
.post(is_User_Authenticated, add_Like_To_Post)
.put(is_User_Authenticated, updatePost)
.delete(is_User_Authenticated, deletePost);
router.route('/posts/:id/comments')
.get(get_Comments)
.post(is_User_Authenticated, add_Comment_To_Post);
router.route('/post/comments/:id')
 .post(is_User_Authenticated, add_Like_To_Comment)
 .patch(is_User_Authenticated,edit_Comment)
 .delete(is_User_Authenticated, delete_Comment)

module.exports = router;
