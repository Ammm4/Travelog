const jwt = require('jsonwebtoken');
const { UserModel } = require("../database/models/userModel");


const  checkAuthentication = async (req, res, next) => {
  const { Token } = req.cookies;
  if(!Token) {
    console.log('log in please')
  }
  const decodedData = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
  
  if(!decodedData) {
    console.log('invalid Token')
  }
  //req.user = await UserModel.findById(decodedData.id)
  next();
}
module.exports = checkAuthentication;