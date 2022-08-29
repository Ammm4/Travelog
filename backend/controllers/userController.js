const { UserModel } = require("../database/models/userModel.js");
const { validationResult } = require('express-validator');
const { imgUploadCloudinary, imgDeleteCloudinary } = require('../utils/imgCloudinary');
const asyncFunctionWrapper = require('../utils/asyncFunctionWrapper.js');
const ErrorHandler = require('../utils/errorHandler.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const tokenPayload = require('../utils/tokenPayload');
const cookie_Options = require('../utils/cookieOptions');


//==================== SignUp User =========================//
const signUpUser = asyncFunctionWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;
  // Validate Email and Password
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errorMessage = errors.array()[0].msg;
    return next(new ErrorHandler(errorMessage, 400))
  }
  // Check if email already exists
  const emailExists = await UserModel.findOne({ email });
  if(emailExists) return next(new ErrorHandler('User already exists', 400));
 
 // Insert user in the database
  const user = new UserModel({
     username,
     email,
     password,
     avatar: {
       avatar_id: "avatars/xik6iypxmxlfyxwmoylr",
       avatar_url: "https://res.cloudinary.com/ddocnijls/image/upload/v1642801880/avatars/xik6iypxmxlfyxwmoylr.jpg"
     },
     about:"Add something about you",
     cover:{
       cover_id: "covers/cover_u0dro6",
       cover_url: "https://res.cloudinary.com/ddocnijls/image/upload/v1642936888/covers/cover_u0dro6.jpg"
      },
   });

  await user.save();
  const AccessToken = user.createJwtToken();
  return res.status(201).cookie('Token', AccessToken, cookie_Options).send({
    success: true,
    message: 'Congratulations!! Profile Created',
    user: payload
  })
}
)


//==================== Login/SignIn User =========================//
const loginUser = asyncFunctionWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) return next(new ErrorHandler('Please Enter Email or Password', 400))
  const user = await UserModel.findOne({ email }).select("+password");
  if(!user) return next(new ErrorHandler("User doesn't Exist", 501))
  const match = user.comparePasswords(password);
  if(!match) {
      return next(new ErrorHandler('Invalid Credentials !!', 401))
    }
  //========== Create AccessToken ========= //
  const payload = tokenPayload(user);
  const AccessToken = user.createJwtToken();
  return res.status(200).cookie('Token', AccessToken, cookie_Options ).send({ success: true, message:'Logged In Successfully', user: payload })

})


// ======================= Logout User Start ================================= //
const logOutUser = (req, res, next) => {
  res.cookie("Token", null, {
    expires: new Date( Date.now() ),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  })
}
// ======================= Logout User End =================================== //

// ======================= Update User Start ================================= //

const updateUser = asyncFunctionWrapper( async(req, res, next) => {
  const { user: { userId }, body : { coverImg, avatarImg } } = req;
  const user = await UserModel.findById(userId);
  req.body.cover = { ...user.cover };
  req.body.avatar = { ...user.avatar };
  if(coverImg !== user.cover.cover_url) {
    if(user.cover.cover_id !== 'covers/cover_u0dro6') {
        await imgDeleteCloudinary(user.cover.cover_id);
     } 
     let uploadedCover = await imgUploadCloudinary(coverImg, 'covers');
     let newCover = {
       cover_id: uploadedCover.public_id, 
       cover_url: uploadedCover.secure_url 
     }
    req.body.cover = newCover; 
  }
 if( avatarImg !== user.avatar.avatar_url) {
     if(user.avatar.avatar_id !== 'avatars/xik6iypxmxlfyxwmoylr'){
       await imgDeleteCloudinary(user.avatar.avatar_id);
     }
     let uploadedAvatar = await imgUploadCloudinary(avatarImg, 'avatars')
     let newAvatar = {
       avatar_id: uploadedAvatar.public_id, 
       avatar_url: uploadedAvatar.secure_url 
      }
     req.body.avatar = newAvatar;
  }
  delete req.body.coverImg;
  delete req.body.avatarImg;
  for( let key in req.body) {
    user[key] = req.body[key];
  }
  
  await user.save();
  const payload = tokenPayload(user);
  res.status(200).json({
    success: true,
    message: "Profile Updated successfully!!",
    user: payload
  })
})
// ======================= Update User End =================================== //

const showMe = asyncFunctionWrapper(async(req, res, next) => {
  res.status(200).json({
    success: true, 
    user: req.user
  })
})

const demoLogin = asyncFunctionWrapper(async(req, res, next) => {
  const user = await UserModel.findOne({ email: process.env.DEMO_USER_EMAIL });
  const payload = tokenPayload(user);
 
  //========== Create AccessToken ========= //
  const AccessToken = user.createJwtToken();
  res.status(200).cookie('Token', AccessToken, cookie_Options ).send({ success: true, message:'Logged In Successfully', user: payload }) 
})

const changePassword = asyncFunctionWrapper( async(req ,res, next) => {
  const user = await UserModel.findById(req.user.userId).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body.resetPassword;
  const isPasswordMatch = user.comparePasswords(oldPassword);
  if(!isPasswordMatch) return next(new ErrorHandler("Old password is incorrect", 401));
  if(newPassword !== confirmPassword) return next(new ErrorHandler("Passwords do not match", 401));
  user.password = newPassword;
  await user.save();
  const payload = tokenPayload(user);
  res.status(200).json({
    success: true,
    message: "Password Changed successfully!!",
    user: payload
  })

}
)


// ======================= Delete User Start =================================== //
const deleteUser = asyncFunctionWrapper( async(req,res,next) => {
  const user = await UserModel.findById(req.user.userId).select("+password");
  const userSentPassword = req.body.payload;
  const isPasswordMatch = user.comparePasswords(userSentPassword);
  if(!isPasswordMatch) return next(new ErrorHandler("Invalid Credentials", 401))
  imgDeleteCloudinary(user.avatar.avatar_id);
  imgDeleteCloudinary(user.cover.cover_id);
  await user.deleteOne();
  res.cookie("Token", null, {
    expires: new Date( Date.now() ),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: "User Deleted successfully!!",
  })

})
// ======================= Delete User End =================================== //

const getSingleUser = asyncFunctionWrapper(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id).select('-password'); 
  if(!user) return next(new ErrorHandler("User not found", 404))
    res.status(200).json({
      success: true,
      user
   })   
})

//======================= Forgot Password ==========================//
const resetPasswordLink = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if(user) {
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
       user: process.env.SMTP_MAIL,
       pass: process.env.SMTP_PASSWORD
      }
    }));
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/reset_password/${resetToken}`
    const message = `Click here to reset your password \n\n ${resetPasswordUrl} \n\n If you didn't request for password rest, ignore this message`
    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'TravelLog Password Recovery',
      message
    }; 
    try {
      await transporter.sendMail(mailOptions);
     } catch(e) {
      user.resetPasswordToken =  undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false }); 
      return next(new Error)
     }
  }
  res.status(200).json({ success: true,  message: `The link to reset your password has been sent to your ${email}` })
}

const resetPassword = async( req, res, next ) => {
  const { body: { resetPassword: { newPassword, confirmPassword }}, params: { token }} = req;
  const resetPasswordToken = await UserModel.cryptResetToken(token);
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if(!user) return next(new ErrorHandler("Session has expired.", 404))
  if(newPassword !== confirmPassword) return next(new ErrorHandler("Passwords do not match", 404))
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({ success: true, message: 'Passwords have been changed.' })
}

module.exports = {
  signUpUser,
  loginUser,
  logOutUser,
  updateUser,
  changePassword,
  deleteUser,
  showMe,
  demoLogin,
  getSingleUser,
  resetPasswordLink,
  resetPassword
}

