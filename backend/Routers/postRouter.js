const express = require('express');
const router = express.Router();
const { getAllPosts, getSinglePost, addPost, updatePost, deletePost  } = require('../controllers/post/controller');
const { add_Like_To_Post, add_Like_To_Comment } = require('../controllers/post/likeController');
const { add_Comment_To_Post, edit_Comment, delete_Comment } = require('../controllers/post/commentController');
const is_User_Authenticated = require('../middleware/checkAuthentication');

router.get('/posts/users/:userId', getAllPosts);
router.route('/posts/:id')
.get(getSinglePost)
.post(is_User_Authenticated, add_Like_To_Post)
.put(is_User_Authenticated, updatePost)
.delete(is_User_Authenticated, deletePost);
router.route('/posts').post( is_User_Authenticated, addPost);
router.post('/posts/:id/comment', is_User_Authenticated, add_Comment_To_Post);
router.route('/comments/:id')
 .post(is_User_Authenticated, add_Like_To_Comment)
 .patch(is_User_Authenticated,edit_Comment)
 .delete(is_User_Authenticated, delete_Comment)


module.exports = router;
