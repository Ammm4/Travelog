const cloudinary = require('cloudinary');
const imgUploadCloudinary = async(file, folderName) => {
  const uploadedImg = await cloudinary.v2.uploader.upload(file, { folder: folderName } )
  return uploadedImg;
}
const imgDeleteCloudinary = async(img) => {
  await cloudinary.v2.uploader.destroy(img)
}
module.exports = {
  imgUploadCloudinary,
  imgDeleteCloudinary
}
