const router = require('express').Router();
const { check } = require('express-validator');
const is_User_Authenticated = require('../middleware/checkAuthentication');


const { 
  loginUser, 
  signUpUser, 
  logOutUser, 
  showMe,  
  getSingleUser,
  updateUser,
  changePassword,
  deleteUser,
  resetPassword
} = require('../controllers/user/controller');


router.post('/signup',
  [ check("email", "Please Provide a valid Email").isEmail(),
    check("password", "Please Provide a password that is greater than 6 charaters").isLength({ min:7 })
  ], 
signUpUser);

router.get('/users/:id', is_User_Authenticated, getSingleUser);

router.post('/login', loginUser);

router.post('/logout', logOutUser);

router.get('/showMe', is_User_Authenticated, showMe);

router.put('/users/:id/profile_change', is_User_Authenticated, updateUser);

router.put('/users/:id/change_password', is_User_Authenticated, changePassword);

router.delete('/users/delete_profile', is_User_Authenticated, deleteUser);

router.post('/forgot_password', resetPassword)

router.put('/reset_password/:token', (req, res) => {
  /* 
  const resetToken = req.params.token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if(!user) {
    res.status(404).send("Reset Password Token is invalid or has been expired")
  }
  if(req.body.password !== req.body.confirmPassword) {
    res.status(404).send("Password does not match!!")
  }
  user.password = req.body.password(needs crypting)
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
 */
})
//add authentication CheckAuthentication middleware
router.get('/me', (req,res) => {

})


module.exports = router;