const createForumObject = (isLiked, forum) => {
  const { _id, 
    user,
    title,
    body,
    views,
    numComments, 
    numLikes } = forum;
    let numOfComments = numComments ? numComments : 0;
    let numOfLikes = numLikes ? numLikes : 0;
  return {
        _id, 
        user,
        title,
        body,
        views,
        commentBody: '',
        numComments: numOfComments,
        numLikes: numOfLikes,
        isLiked: isLiked,
        likes: [],
        comments: []
      }
}

module.exports = createForumObject;