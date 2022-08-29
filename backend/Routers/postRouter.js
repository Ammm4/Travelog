const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost, updatePost, deletePost  } = require('../controllers/postController');
const is_User_Authenticated = require('../middleware/checkAuthentication');

router.route('/posts').get(getPosts).post( is_User_Authenticated, addPost);
router.route('/posts/:id')
.get(getPost)
.patch(is_User_Authenticated, updatePost)
.delete(is_User_Authenticated, deletePost);


module.exports = router;
