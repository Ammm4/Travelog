const { PostModel }  = require("../../database/models/postModel.js");
const ErrorHandler = require("../../utils/errorHandler.js");
const cloudinary = require('cloudinary');

const asyncFunctionWrapper =  require('../../utils/asyncFunctionWrapper');

const getAllPosts = asyncFunctionWrapper(async (req, res, next) => {
     const { params: { userId } } = req;
     var posts;
     if(userId === 'allUsers') {
       posts = await PostModel.find().sort({ createdAt: -1 });  
     } else {
       posts = await PostModel.find({ user: userId }).sort({ createdAt: -1 });
     }
     return res.status(200).json({
       success: true,
       posts
     })
  
});

const getSinglePost = asyncFunctionWrapper(async (req, res, next) => {
   const post = await PostModel.findById( req.params.id );
   if(!post) return next(new ErrorHandler("Post not found", 404))
   post.views++;
   await post.save();
   res.status(200).json({
      success: true,
      post
   })   
})

const addPost = asyncFunctionWrapper( async ( req, res, next ) => {
  const { user: { userId  }, body: { images } }= req;
  if(images.length > 0) {
    let uploadedImages = await createImageDetails(images);
    req.body.images = uploadedImages;
  }
  let newPost = {
     user: userId,
     ...req.body,
  }
  const post = await PostModel.create(newPost);
  const newlyAddedPost = await PostModel.findById(post._id)
  res.status(201).send({ success: true, message: "Post Created successfully!!", post: newlyAddedPost});
})

const updatePost = asyncFunctionWrapper(async (req, res, next) => {
  const { params: { id }} = req;
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
  getAllPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost
}