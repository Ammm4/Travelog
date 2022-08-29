const router =  require('express').Router();
const { 
  getForums, 
  getForum, 
  createForum, 
  updateForum, 
  deleteForum  
} = require('../controllers/forumController');

const is_User_Authenticated = require('../middleware/checkAuthentication');
router.route('/forums').get(getForums).post( is_User_Authenticated, createForum)
router.route('/forums/:id')
.get(getForum)
.patch(is_User_Authenticated, updateForum)
.delete(is_User_Authenticated, deleteForum)

module.exports = router;

