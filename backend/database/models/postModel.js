const mongoose = require('mongoose');
const { Post } = require('./global_Schema.js');


const PostModel = mongoose.model('Post', Post);

module.exports = {
  PostModel
}