const ErrorHandler = require("./errorHandler")

module.exports = innerFunction => async ( req, res, next) => {
   try {
     await innerFunction(req,res,next)
   } catch(e) {
     next(e)
   }
}