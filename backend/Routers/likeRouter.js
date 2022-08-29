const router =  require('express').Router();
const { getLikes, likeItem }  = require('../controllers/LikeController');
const is_User_Authenticated = require('../middleware/checkAuthentication');

router.route('/likes').get(getLikes).post(is_User_Authenticated, likeItem)

module.exports = router;
