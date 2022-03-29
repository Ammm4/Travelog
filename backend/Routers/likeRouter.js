const { add_Like_To_Post, add_Like_To_Comment, add_Like_To_Comment_Reply } = require('../controllers/like/controller');
const is_User_Authenticated = require('../middleware/checkAuthentication');

const router = require('express').Router();



router.route('/:post_id/like_post').put(is_User_Authenticated, add_Like_To_Post);
router.route('/:post_id/comments/:comment_id/like_comment')
.put(is_User_Authenticated, add_Like_To_Comment);
router.route('/:post_id/comments/:comment_id/replies/:reply_id/like_comment_reply')
.put(is_User_Authenticated, add_Like_To_Comment_Reply)
module.exports = router;