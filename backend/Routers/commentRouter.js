const router =  require('express').Router();
const { getComments, createComment, updateComment, deleteComment } = require('../controllers/CommentController')
const is_User_Authenticated = require('../middleware/checkAuthentication');

router.route('/comments').get(getComments).post(is_User_Authenticated, createComment);
router.route('/comments/:id').patch(is_User_Authenticated, updateComment).delete(is_User_Authenticated, deleteComment)

module.exports = router;