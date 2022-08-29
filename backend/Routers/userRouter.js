const router = require('express').Router();
const { check } = require('express-validator');
const is_User_Authenticated = require('../middleware/checkAuthentication');

const { 
  loginUser, 
  signUpUser, 
  logOutUser, 
  showMe,
  demoLogin,
  getSingleUser,
  updateUser,
  changePassword,
  deleteUser,
  resetPasswordLink,
  resetPassword
} = require('../controllers/userController');

router.post('/signup',
  [ check("email", "Please Provide a valid Email").isEmail(),
    check("password", "Please Provide a password that is greater than 6 charaters").isLength({ min:7 })
  ], 
signUpUser);

router.get('/users/:id', is_User_Authenticated, getSingleUser);
router.post('/login', loginUser);
router.post('/demo', demoLogin);
router.post('/logout', logOutUser);
router.get('/showMe', is_User_Authenticated, showMe);
router.put('/users/:id/profile_change', is_User_Authenticated, updateUser);
router.put('/users/:id/change_password', is_User_Authenticated, changePassword);
router.delete('/users/delete_profile', is_User_Authenticated, deleteUser);
router.post('/forgot_password', resetPasswordLink)
router.post('/reset_password/:token', resetPassword)


module.exports = router;