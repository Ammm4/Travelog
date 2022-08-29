const router =  require('express').Router();
const { getReplies, createReply, updateReply, deleteReply } = require('../controllers/ReplyController');
const is_User_Authenticated = require('../middleware/checkAuthentication');

router.route('/comments/:id/replies').get(getReplies).post(is_User_Authenticated, createReply);
router.route('/replies/:id').patch( is_User_Authenticated, updateReply).delete(is_User_Authenticated, deleteReply)

module.exports = router;
