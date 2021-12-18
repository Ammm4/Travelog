const jwt = require('jsonwebtoken');
const asyncFunctionWrapper = require('../utils/asyncFunctionWrapper');
const ErrorHandler = require('../utils/errorHandler');


const  is_User_Authenticated = asyncFunctionWrapper(async (req, res, next) => {
  const { Token } = req.cookies;
  if(!Token) {
    return next(new ErrorHandler("Action denied, You need to Log in first", 401))
  }
  const payload = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
  if(!payload) return next(new ErrorHandler("Invalid Token", 500))
  req.user = payload;
  next()
});

module.exports = is_User_Authenticated;