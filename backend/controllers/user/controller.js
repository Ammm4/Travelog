require('dotenv').config();
const { UserModel }  = require("../../database/models/userModel.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const asyncFunctionWrapper = require('../../utils/asyncFunctionWrapper.js');
const ErrorHandler = require('../../utils/errorHandler.js');


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
       avatar_id: "avatar_id",
       avatar_url: "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=338&ext=jpg"
     },
     about:"A Travel freak",
     cover:"https://cdn.britannica.com/s:690x388,c:crop/54/155954-050-6568A963/massif-Mount-Everest-Himalayas-Nepal.jpg",
     posts:[],
     likes:[],
     comments:[]
   });

  const result = await user.save();
  const AccessToken = createAccessToken(user._id);
  return res.status(201).cookie('Token', AccessToken, cookie_Options).send({
    success: true,
    message: 'User Successfully created!!',
    result
  })
}
)


//==================== Login/SignIn User =========================//
const loginUser = asyncFunctionWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return next(new ErrorHandler('Please Enter Email or Password', 400))
  }
  const user = await UserModel.findOne({ email: email }).select("+password");
  if(!user) return next(new ErrorHandler("User doesn't Exist", 501))
 
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
      return next(new ErrorHandler('Wrong Email or Password!!', 401))
    }
  //========== Create AccessToken ========= //
  const AccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
  return res.status(200).cookie('Token', AccessToken, cookie_Options ).send({ message: 'success', user })

})


//======================= Logout User ==========================//
const logOutUser = (req, res, next) => {
  res.cookie("Token", null, {
    expires: new Date( Date.now() ),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: "Logout successfully!!"
  })

}

const setUser = asyncFunctionWrapper(async(req, res, next) => {
  const user_id = req.user.id;
  const user = await UserModel.findById(user_id);
  res.status(200).json({
    success: true, 
    user
  })
})

const getSingleUser = asyncFunctionWrapper(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id); 
  if(!user) return next(new ErrorHandler("User not found", 404))
    res.status(200).json({
      success: true,
      user
   })   
})

//======================= Forgot Password ==========================//

const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({email: email});

  if(!user) return next(new ErrorHandler('Please enter a correct Email!!', 400))
    

  /* Get resetPasswordToken
    const resetToken = user.generatePasswordToken();
    user.save({ validateBeforeSave: false });
    
    const resetPasswordUrl = `http://localhost:8000/api/v1/reset_password/${resetToken}`
    
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
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


/* 
Get User Details
const getUserDetails = async(req,res,next) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    success:true,
    user
  })
}

CHANGE PASSWORD
const changePassword = async(req,res,next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  const isPasswordMatch = bcrypt.compare(user.password, req.body.oldPassword);
  if(!isPasswordMatch){
    res.status(404).send({"old password is not incorrect"})
  }
  if(req.body.newPassword !== req.body.confirmPassword){
    res.status(404).send({"Password does not match!!"})
  }
  user.password = req.body.newPassword;
  user.save();
}

UPDATE PROFILE
const updateProfile = async(req,res,next) => {
  const{ username, email, avatar, cover, about} = req.body
  
  const newUserData = {...user, username: username, email: email, avatar: avatar, cover: cover, about: about}
  const user = await userModel.findByIdandUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindandModify: false
  });
  res.status(200).json({
    success: true
  })
}

ADD Comment 

const addComment = async(req,res) => {
  const { postId, comment } = req.body;
  const newComment = {
   userid: req.user.id,
   username: req.user.name,
   comment,
  } 
  const { id } = req.user.id
  const product = await postModel.findById({id: postId});
  product.comments = [...products.comments, newComment];
  product.save()
  //const hasUserCommented = product.comments.find(item => item.userid === id)
}

Update Comment 



const updateComment = async(req,res) => {

}

REPLY COMMENT


ADD LIKES


*/

module.exports = {
  signUpUser,
  loginUser,
  logOutUser,
  setUser,
  getSingleUser
}

