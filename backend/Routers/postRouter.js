const express = require('express');
const router = express.Router();
const { getAllPosts, getSinglePost, addPost, updatePost, deletePost  } = require('../controllers/post/controller');
const is_User_Authenticated = require('../middleware/checkAuthentication');


router.get('/posts', getAllPosts);

router.get('/posts/:id', getSinglePost);

router.route('/posts').post( is_User_Authenticated, addPost);

router.route('/posts/:id')
.put(is_User_Authenticated, updatePost)
.delete(is_User_Authenticated, deletePost);



module.exports = router;
