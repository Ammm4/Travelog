const createCommentObject = (isLiked, comment) => {
  const { _id, user, body, numLikes, numReplies, post } = comment;
  let commentDetails = {
    _id, 
    user, 
    body, 
    numLikes,
    numReplies,
    replies:[],
    showReplies: false,
    replyBody:'',
    isLiked: isLiked,
    likes: []
  }
  if(post) commentDetails.post = post;
  return commentDetails
}

module.exports = createCommentObject;