const createPostObject = (isLiked, post) => {
  const { _id, 
    user, 
    destinationInfo, 
    recommendations, 
    travellerInfo, 
    images, 
    views, 
    numComments, 
    numLikes } = post;
  let numOfComments = numComments ? numComments : 0;
  let numOfLikes = numLikes ? numLikes : 0;
  return {
        _id, 
        user, 
        destinationInfo,
        travellerInfo,
        recommendations,
        images, 
        views,
        commentBody: '',
        numComments: numOfComments, 
        numLikes: numOfLikes,
        isLiked: isLiked,
        likes: [],
        comments: []
      }
}

module.exports = createPostObject;