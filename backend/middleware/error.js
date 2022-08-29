
module.exports = ( err, req, res, next ) => {
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";
   
   //Cast Error
   if(err.name === 'CastError') {
      err.message = `Resource not found. Invalid : ${err.path}`;
      err.statusCode = 400
   }
  
   res.status(err.statusCode).json({ success: false, error: err.message })
}