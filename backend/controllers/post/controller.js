const { PostModel }  = require("../../database/models/PostModel.js");

const getPosts = (req, res, next) => {
  res.status(201).send('Hi from Posts!!')
}

const getPostDetail = (req, res, next) => {
  res.status(201).send('Hi from Post!!')
}

const addPost = async( req, res ) => {
  const { author, title, place, images, description, cost, attractions, todoList } = req.body;
  
  try {
   const post = new PostModel({
     author,
     title,
     place,
     images,
     description,
     cost,
     attractions,
     todoList,
     likes:[],
     comments:[],
   })
    const result = await post.save();
    if(result) {
      return res.status(201).send(result);
    } else {
      console.log('Something went Worng')
    }
  } catch(e) {
    console.log(e.message)
  }
  res.status(201).send('Hi from Post Request!!')
};

const updatePost = async (req, res) => {
 res.status(201).send('Hi from Patch Post!!')
}

const deletePost = async (req, res) => {
    res.status(201).send('Hi from Delete Post!!')
}

module.exports = {
  getPosts,
  getPostDetail,
  addPost,
  updatePost,
  deletePost
}