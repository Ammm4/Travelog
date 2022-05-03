const createForumObject = (isLiked, forum) => {
  const { _id, 
    user, 
    body,
    views, 
    numComments, 
    numLikes } = forum;
  return {
        _id, 
        user, 
        body,
        views, 
        numComments, 
        numLikes,
        isLiked: isLiked,
        likes: [],
        comments: []
      }
}

module.exports = createForumObject;