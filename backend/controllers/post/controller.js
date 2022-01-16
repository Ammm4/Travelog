const { PostModel }  = require("../../database/models/postModel.js");
const { UserModel } = require("../../database/models/userModel.js");
const { v4: uuidv4 } = require('uuid');
const ErrorHandler = require("../../utils/errorHandler.js");
const cloudinary = require('cloudinary');

const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');

const getAllPosts = asyncFunctionWrapper(async (req, res, next) => {
    const posts = await PostModel.find(); 
    res.status(201).json({
      success: true,
      posts
    })
});

const getSinglePost = asyncFunctionWrapper(async (req, res, next) => {
   const post = await PostModel.findOne({ post_id: req.params.id});
   if(!post) return next(new ErrorHandler("Post not found", 404))
   res.status(200).json({
      success: true,
      post
   })   
})

const addPost = asyncFunctionWrapper( async ( req, res, next ) => {
  const user_id = req.user.id;
  const user = await UserModel.findById(user_id);
  const post_id = uuidv4();
  const author = {
    authorId: user._id,
    authorAvatar: user.avatar.avatar_url,
    authorName: user.username,
  }
  const { images } = req.body;
  let uploadedImages = await createImageDetails(images);

  req.body.images = uploadedImages;
  let newPost = {
     post_id, 
     author,
     ...req.body,
     likes: [],
     comments: []
  }
  user.posts = [...user.posts, newPost];
  const post = new PostModel( newPost ); 
  await user.save();
  await post.save();
  const posts = await PostModel.find(); 
  res.status(201).send({ success: true, message: "Post Created successfully!!", posts });
})

const updatePost = asyncFunctionWrapper(async (req, res, next) => {
  const user_id = req.user.id;
  const user = await UserModel.findById(user_id);
  const post = await PostModel.findOne({ post_id: req.params.id});
  const userPost = user.posts.find(post => post.post_id === req.params.id);
  if(!post || !userPost) return next(new ErrorHandler("Post not found", 400))
  const { images, deletedImageIDs } = req.body;
  if (deletedImageIDs.length > 0) {
    deletedImageIDs.forEach(async (imgId) => {
      await cloudinary.v2.uploader.destroy(imgId);
    })
  }
  let uploadedImages = await Promise.all(images.map( async (image) => {
    if(image.hasOwnProperty("public_id")) {
       return {
         img_id: image.public_id,
         imgURL: image.imgFile,
         imgName: image.imgTitle
       }
    } else {
      const uploadedImg = await fileUploadToCloudinary(image.imgFile);
       return newItem = {
        img_id: uploadedImg.public_id,
        imgURL: uploadedImg.secure_url,
        imgName: image.imgTitle || 'postImage',
      }
    }
  })
  )
  req.body.images = uploadedImages;
  
  for( let key in req.body) {
    post[key] = req.body[key];
    userPost[key] = req.body[key];
  }
  
  await post.save();
  await user.save();
  const posts = await PostModel.find(); 
  res.status(200).json({
    success: true,
    message:"Post edited successfully!!",
    posts
  })
})

const deletePost = asyncFunctionWrapper(async (req, res, next) => {
  const user_id = req.user.id;
  const user = await UserModel.findById(user_id);
  const post = await PostModel.findOne({ post_id: req.params.id});
  if(!post) return next(new ErrorHandler("Post not found", 400));
  let userNewPosts = user.posts.filter(post => post.post_id !== req.params.id);
  user.posts = userNewPosts;
  deleteAllImages(req.body.payload);
  await post.remove();
  await user.save();
  const posts = await PostModel.find();
   res.status(201).json({
    success: true,
    message: "Post Deleted successfully!!",
    posts 
  })
})

const createImageDetails = async (images) => { 
  return Promise.all(images.map( async (image) => {
    const uploadedImg = await fileUploadToCloudinary(image.imgFile);
    let newItem = {
        img_id: uploadedImg.public_id,
        imgURL: uploadedImg.secure_url,
        imgName: image.imgTitle.trim() || 'postImage',
    }
    return newItem;
  }))
  
}

const fileUploadToCloudinary = async (file) => {
  const uploadedImg = await cloudinary.v2.uploader.upload(file, {
    folder: "postImages"
  }
  )
  return uploadedImg;
}

const deleteAllImages = async(images) => {
  images.forEach( async(img) => {
    await cloudinary.v2.uploader.destroy(img);
  })
}
module.exports = {
  getAllPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost
}