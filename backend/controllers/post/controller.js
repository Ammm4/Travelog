const { PostModel }  = require("../../database/models/PostModel.js");
const ErrorHandler = require("../../utils/errorHandler.js");

const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');

const getAllPosts = asyncFunctionWrapper(async (req, res, next) => {
    const posts = await PostModel.find(); 
    res.status(201).json({
      success: true,
      posts
    })
});

const getSinglePost = asyncFunctionWrapper(async (req, res, next) => {
   const post = await PostModel.findById(req.params.id);
   if(!post) return next(new ErrorHandler("Post not found", 404))
   res.status(200).json({
      success: true,
      post
   })   
})

const addPost = asyncFunctionWrapper( async ( req, res, next ) => {
  const { author, title, destination, images, description, cost, attractions, todoList } = req.body;
  const post = new PostModel({
     author,
     title,
     destination,
     images,
     description,
     cost,
     attractions,
     todoList,
     likes:[],
     comments:[],
   })
  const result = await post.save();
  res.status(201).send({success: true, message: "Post successfully Created!!", result});
})

const updatePost = asyncFunctionWrapper(async (req, res, next) => {
  post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, useFindandModify:false}) 
  if(!post) return next(new ErrorHandler("Post not found", 400))
  res.status(200).json({
    success: true,
    message:"Post successfully updated!!",
    post
  })
})

const deletePost = asyncFunctionWrapper(async (req, res, next) => {
  const post = await PostModel.findById(req.params.id);
  if(!post) return next(new ErrorHandler("Post not found", 400))
  await post.remove();
  res.status(201).json({
    success: true,
    message: "Post is successfully Deleted!!"}) 
})

module.exports = {
  getAllPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost
}