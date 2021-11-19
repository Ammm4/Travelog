require('dotenv').config();
const { UserModel }  = require("../../database/models/userModel.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

//================== Token Generator ========================//
function createAccessToken(id) {
  return jwt.sign({ id } , process.env.ACCESS_TOKEN_SECRET, { expiresIn:'15m' });
}
function createRefreshToken(id) {
  return jwt.sign({ id } , process.env.REFRESH_TOKEN_SECRET, { expiresIn:'7d' });
}

const cookie_Options = {
  expires:new Date(Date.now + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  httpOnly: true
}
//==================== SignUp User =========================//
const signUpUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate Email and Password
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

   // Check if email already exists
   const emailExists = await UserModel.findOne({email: email});
     if(emailExists) return res.status(400).send({error: {msg: 'Email already exists'}});

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
    if(result) {
      const AccessToken = createAccessToken(user._id);
      //const RefreshToken = createRefreshToken(user._id);
      
      return res.status(201).cookie('Token', AccessToken, cookie_Options).send({
        success: true,
        message: 'User Successfully created!!',
        user
      });
    } else {
      console.log('Something went Worng')
    }
  } catch(e) {
    console.log(e.message)
  }
  res.status(201).send('Hi from Signup')
}



//==================== Login/SignIn User =========================//
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).send('Please Enter email or password')
  }

  try {
    const user = await UserModel.findOne({ email: email }).select("+password");
    if(user) {
      const match = await bcrypt.compare(password, user.password);
      if(match) {
        //========== Create AccessToken and RefreshToken ========= //
        const AccessToken = jwt.sign({ user: user.username} , process.env.ACCESS_TOKEN_SECRET, { expiresIn:'15m' });
        const RefreshToken = jwt.sign({ user: user.username} , process.env.REFRESH_TOKEN_SECRET, { expiresIn:'7d' });
        return res.status(200).cookie('RefreshToken', RefreshToken, { cookie_Options }).send({message: 'success', user})
      } else {
        return res.send('Wrong Email or Password')
      }
    }
    return res.send("User doesn't exist");
  } catch(e) {
    console.log(e.message)
  }

}


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

//======================= Forgot Password ==========================//

const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({email: email});

  if(!user) {
    res.status(400).send('Please enter a correct Email!!')
  }

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
  logOutUser
}

