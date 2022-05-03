const { PostModel }  = require("../../database/models/postModel.js");
const ErrorHandler = require("../../utils/errorHandler.js");
const LikeModel = require('../../database/models/likeModel');
const cloudinary = require('cloudinary');
const createDetails = require('../../utils/createDetails');
const createPostObject = require('../../utils/createPostObj')
const createMongoId = require('../../utils/createMongoId');
const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');
const getPosts = asyncFunctionWrapper(async (req, res, next) => {
  const { query: { user_type, user } } = req;
  var posts;
   if(user_type === 'allUsers') {
       posts = await PostModel.find().sort({ createdAt: -1 });
      } else {
       const user_id = createMongoId(user_type);
       posts = await PostModel.find({ user: user_id }).sort({ createdAt: -1 });
   } 
   if(user) {
    let Posts = [];
    for (const post of posts) {
      const details = createDetails({ user, post: post._id })
      const isLiked = await LikeModel.findOne(details) ? true : false ;
      let Post = createPostObject(isLiked,post)
      Posts = [...Posts, Post]
    } 
    posts = Posts;
   }
  res.status(200).json({ success: true, posts })
});

const getPost = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id }, query: { user } } = req;
  var post = await PostModel.findById(id);
  if(!post) return next(new ErrorHandler("Post not found", 404))
  post.views++;
  await post.save();
  if(user) {
      const details = createDetails({ user, post: id })
      const isLiked = await LikeModel.findOne(details) ? true : false ;
      post = createPostObject(isLiked, post)
    } 
   res.status(200).json({ success: true, post })   
})

const addPost = asyncFunctionWrapper( async ( req, res, next ) => {
  const { user: { userId  }, body: { images } }= req;
  if(images.length > 0) {
    let uploadedImages = await createImageDetails(images);
    req.body.images = uploadedImages;
  }
  let newPost = {
     user: createMongoId(userId),
     ...req.body,
  }
  const post = await PostModel.create(newPost);
  await post.populate({ path: 'user', select: 'username avatar' })
  const Post = createPostObject(false, post);
  res.status(201).send({ success: true, message: "Post Created successfully!!", post: Post});
})

const updatePost = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id } } = req;
  const post = await PostModel.findById(id);
  if(!post) return next(new ErrorHandler("Post not found", 404))
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
  }
  await post.save();
  res.status(200).json({
    success: true,
    message:"Post edited successfully!!",
    post
  })
})

const deletePost = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id } } = req;
  const post = await PostModel.findById(id);
  if(!post) return next(new ErrorHandler("Post not found", 404));
  const imagesToDelete = post.images.map(img => img.public_id);
  deleteAllImages(imagesToDelete);
  await post.deleteOne();
   res.status(201).json({
    success: true,
    message: "Post Deleted successfully!!",
    post
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
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost
}