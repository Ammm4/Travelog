const mongoose = require('mongoose');
const { Like, Comment, Post } = require('./global_Schema.js');
const validator = require('validator');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now},
  username: { 
    type: String, 
    required: [true, "Please Enter Your Name!"],
    maxLength:[30, "Username cannot have more than 30 characters!"],
    minLength:[4, "Username cannot be less than 4 characters!"]
  },

  email: { 
    type: String, 
    required: [ true, "Please Enter Your Email"], 
    unique: true,
    validate:[validator.isEmail, "Please Enter a valid email!!"]
  },

  password: { 
    type: String, 
    required: [true, "Please Enter Your Password!"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false
  },

  avatar: { 
    avatar_id: { 
      type: String,
      required: true
    },
    avatar_url: {
      type: String,
      required: true
    }  
  },
  cover: {
    cover_id: {
      type: String,
      required: true
    },
    cover_url: {
      type: String,
      required: true
    }
  },
  city: { type:  String, default: "Add the City you Live" },
  about: { type:  String, default: "Add Something about Yourself" },
  hobbies: { type:  String, default: "Add Your Hobbies" },
  country: { type:  String, default: "Add the Country You Live" },
  posts: [Post],
  likes: [Like],
  comments: [Comment],
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

//Password Reset Token
userSchema.methods.GenerateToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken
}

/* Crypting Password

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")){
    next()
  }
  this.password = bcrypt.hash(this.password, 10)
})

JWT Token
userSchema.getJWTtOKEN = function() {
  return jwt.sign({this._id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn:  process.env.TOKEN_EXPIRES_IN
  })
}

COMPARE PASSWORD
userSchema.methods.Compare = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


*/
const UserModel = mongoose.model('User', userSchema);

module.exports = {
 UserModel
}