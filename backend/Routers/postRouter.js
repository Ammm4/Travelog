const express = require('express');
const router = express.Router();
const { getPosts, getPostDetail, addPost, updatePost, deletePost  } = require('../controllers/post/controller');



//router.get('/posts', getPosts);

//router.get('/posts/:id', getPostDetail);

router.route('/posts').post(addPost);

router.route('/posts/:id').put(updatePost);

router.route('/posts/:id').delete(deletePost);


module.exports = router;
