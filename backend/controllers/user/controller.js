
const { UserModel } = require("../../database/models/userModel.js");
const { PostModel } = require("../../database/models/postModel.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const asyncFunctionWrapper = require('../../utils/asyncFunctionWrapper.js');
const ErrorHandler = require('../../utils/errorHandler.js');
const cloudinary = require('cloudinary');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const tokenPayload = require('../../utils/tokenPayload');

//================== Token Generator ========================//

function createAccessToken(id) {
  return jwt.sign({ id } , process.env.ACCESS_TOKEN_SECRET, { expiresIn:'15m' });
}

const cookie_Options = {
  expires:new Date(Date.now + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  httpOnly: true
}

// ===================== Controllers ===========================//

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
  const emailExists = await UserModel.findOne({email: email});
  if(emailExists) return next(new ErrorHandler('User already exists', 400));

 // If email doesnot exists hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

 // Insert user in the database
  const user = new UserModel({
     username,
     email,
     password: hashedPassword,
     avatar: {
       avatar_id: "avatars/xik6iypxmxlfyxwmoylr",
       avatar_url: "https://res.cloudinary.com/ddocnijls/image/upload/v1642801880/avatars/xik6iypxmxlfyxwmoylr.jpg"
     },
     about:"A Travel freak",
     cover:{
       cover_id: "covers/cover_u0dro6",
       cover_url: "https://res.cloudinary.com/ddocnijls/image/upload/v1642936888/covers/cover_u0dro6.jpg"
      },
     posts:[],
     likes:[],
     comments:[]
   });

  await user.save();
  //const tokenPayload = { userId: user._id, name: user.username, avatarUrl: user.avatar.avatar_url}
  const AccessToken = createAccessToken(user._id);
  return res.status(201).cookie('Token', AccessToken, cookie_Options).send({
    success: true,
    message: 'User Successfully created!!',
    user
  })
}
)


//==================== Login/SignIn User =========================//
const loginUser = asyncFunctionWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) return next(new ErrorHandler('Please Enter Email or Password', 400))
  
  const user = await UserModel.findOne({ email: email }).select("+password");
  if(!user) return next(new ErrorHandler("User doesn't Exist", 501))
 
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
      return next(new ErrorHandler('Wrong Email or Password!!', 401))
    }
  const payload = tokenPayload(user);
  //========== Create AccessToken ========= //
  const AccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
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
  const user_id = req.user.id;
  const user = await UserModel.findById(user_id);
  const { coverImg, avatarImg } = req.body;
  req.body.cover = { ...user.cover };
  req.body.avatar = { ...user.avatar };
  if( coverImg ) {
     if(user.cover.cover_id !== 'covers/cover_u0dro6') {
        await cloudinary.v2.uploader.destroy(user.cover.cover_id);
     }   
     let uploadedCover = await fileUploadToCloudinary(coverImg, 'covers');
     let newCover = {
       cover_id: uploadedCover.public_id, 
       cover_url: uploadedCover.secure_url 
     }
    req.body.cover = newCover;
  }

  if( avatarImg ) {
     if(user.avatar.avatar_id !== 'avatars/xik6iypxmxlfyxwmoylr'){
       await cloudinary.v2.uploader.destroy(user.avatar.avatar_id);
     }
     let uploadedAvatar = await fileUploadToCloudinary(avatarImg, 'avatars')
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
  res.status(200).json({
    success: true,
    message: "Profile Updated successfully!!",
    user
  })
})
// ======================= Update User End =================================== //


const showMe = asyncFunctionWrapper(async(req, res, next) => {
  //const user_id = req.user.id;
  //const user = await UserModel.findById(user_id);
  res.status(200).json({
    success: true, 
    user: req.user
  })
})


const changePassword = asyncFunctionWrapper(
  async(req,res,next) => {
  const user = await UserModel.findById(req.user.id).select("+password");
  const isPasswordMatch = await bcrypt.compare(req.body.oldPassword, user.password);
  if(!isPasswordMatch) return next(new ErrorHandler("Current password is incorrect", 401));
  
  if(req.body.newPassword !== req.body.confirmPassword) return next(new ErrorHandler("Passwords do not match", 401));
  
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed successfully!!",
    user
  })

}
)

// ======================= Delete User Start =================================== //
const deleteUser = asyncFunctionWrapper( async(req,res,next) => {
  const user = await UserModel.findById(req.user.id).select("+password");
  const isPasswordMatch = await bcrypt.compare(req.body.payload, user.password);
  if(!isPasswordMatch) return next(new ErrorHandler("Current password is incorrect", 401));
  user.posts.forEach( async (post) => {
      await deletePost(post)
   })
  deleteUserCloudinary(user.avatar.avatar_id, user.cover.cover_id);
  
  await user.remove();

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

const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email: email });
  if(!user) return next(new ErrorHandler('Please enter a correct Email!!', 400));
  
  var transporter = nodemailer.createTransport(smtpTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   auth: {
    user: 'resetemail410@gmail.com',
    pass: 'JheskangNamkhan1974.com'
   }
   }));
  //const resetToken = user.generatePasswordToken();
  //await user.save({ validateBeforeSave: false });
  //const resetPasswordUrl = `http://localhost:8000/api/v1/reset_password/${resetToken}`;
  var mailOptions = {
   from: 'resetemail410@gmail.com',
   to: email,
   subject: 'Sending Email using Node.js[nodemailer]',
   text: 'That was easy!'
  };
 
 /*  res.status(200).json({
      success: true,
      message: 'Reset Link has been sent to your account'
   }) */  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({
        success: true,
        message: `The link to reset your password has been sent to your ${user.email}`
      })
     } catch(e) {
       console.log('Hi')
     /*  user.resetPasswordToken =  undefined;
      user.resetPasswordExpire = undefined;
      await user.save({validateBeforeSave: false}); */
      return next(new Error)
     }

  /* 
   

   Get resetPasswordToken
    const resetToken = user.generatePasswordToken();
    user.save({ validateBeforeSave: false });
    
    const resetPasswordUrl = `http://localhost:8000/api/v1/reset_password/${resetToken}`
    
    //const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `Click here to reset your password \n\n ${resetPasswordUrl} \n\n If you didn't request for password rest, ignore this message`
    
    try {
      await sendMail({
        email: user.email,
        subject: "TravelLog Password Recovery",
        message
      })
      res.status(200).json({
        success: true,
        message: `The link to reset your password has been sent to your ${user.email}`
      })
    } catch(e) {
      user.resetPasswordToken =  undefined;
      user.resetPasswordExpire = undefined;
      await user.save({validateBeforeSave: false});
      return next(new Error)
    }
    
    */
}

// ====================== Utility Function ================= //
const fileUploadToCloudinary = async (file, folderName) => {
  const uploadedImg = await cloudinary.v2.uploader.upload(file, {
    folder: folderName
  }
  )
  return uploadedImg;
}

const deleteUserCloudinary = async( avatarId, coverId ) => {
  if(avatarId !== 'avatars/xik6iypxmxlfyxwmoylr'){
       await cloudinary.v2.uploader.destroy(avatarId);
  }
  if(coverId !== 'covers/cover_u0dro6') {
    await cloudinary.v2.uploader.destroy(coverId);
  }
}

const deletePost = async(post) => {
    const postModel = await PostModel.findOne({ post_id: post.post_id});
    await (post.images.forEach(async(image) => {
      await cloudinary.v2.uploader.destroy(image.img_id)
    }))
    await postModel.remove();
 }


module.exports = {
  signUpUser,
  loginUser,
  logOutUser,
  updateUser,
  changePassword,
  deleteUser,
  showMe,
  getSingleUser,
  resetPassword
}

