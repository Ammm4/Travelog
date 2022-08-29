const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const PostModel = require('../models/postModel');
const ForumModel = require('../models/forumModel');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  city: { type:  String, default: '' },
  about: { type:  String, default: '' },
  hobbies: { type:  String, default: '' },
  country: { type:  String, default: '' },
  resetPasswordToken: String,
  resetPasswordTokenExpiry: Date
}, { timestamps: true });

//Password Reset Token
userSchema.statics.cryptResetToken = function (token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
userSchema.methods.generateResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); 
  this.resetPasswordTokenExpiry = Date.now() + 15 * 60 * 1000;
  return resetToken
}
userSchema.methods.comparePasswords = function(enteredPassword) {
  console.log(enteredPassword)
  return bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.createJwtToken = function() {
  return jwt.sign({ userId: this._id,
    name: this.username,
    avatarURL: this.avatar.avatar_url }, 
    process.env.ACCESS_TOKEN_SECRET, {
    expiresIn:  process.env.TOKEN_EXPIRES_IN
  })
}
userSchema.pre("save", async function(next) {
  if(!this.isModified("password")){
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const posts = await PostModel.find({ user: this._id});
    if(posts.length > 0) {
      for (const post of posts) {
        await post.deleteOne()
      }
    }
    const forums = await ForumModel.find({ user: this._id })
    if(forums.length > 0) {
      for (const forum of forums) {
        await forum.deleteOne()
      }
    }
    this.model('Like').deleteMany({ user: this._id }, next);
  }
)

const UserModel = mongoose.models.Users || mongoose.model('User', userSchema);

module.exports = {
 UserModel
}