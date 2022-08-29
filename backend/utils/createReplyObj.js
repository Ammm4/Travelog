const createReplyObject = (isLiked, reply) => {
  const { _id, user, body, numLikes, comment } = reply;
  let replyDetails = {
    _id, 
    user, 
    body,
    comment, 
    numLikes,
    isLiked: isLiked,
    likes: []
  }
  return replyDetails
}

module.exports = createReplyObject;