const createCommentObject = (isLiked, comment) => {
  const { _id, user, body, numLikes, post } = comment;
  let commentDetails = {
    _id, 
    user, 
    body, 
    numLikes,
    isLiked: isLiked,
    likes: []
  }
  if(post) commentDetails.post = post;
  return commentDetails
}

module.exports = createCommentObject;