import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR,

  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_ERROR,

  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_ERROR,

  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,

  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,

  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,

  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,

  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_ERROR,
  
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_ERROR,
  
  ADD_REPLY_REQUEST,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_ERROR,

  LIKE_REPLY_REQUEST,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_ERROR,
  
  EDIT_REPLY_REQUEST,
  EDIT_REPLY_SUCCESS,
  EDIT_REPLY_ERROR,

  DELETE_REPLY_REQUEST,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_ERROR,

  CLEAR_POST_ERRORS,
} from "./postTypes";

import axios from 'axios';

// ================================ Get Posts Action Start ============================== //
const getPostsRequest = () => {
  return {
    type: GET_POSTS_REQUEST
  }
} 

const getPostsSuccess = ( data ) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: data
  }
} 

const getPostsError = ( error ) => {
  return {
    type: GET_POSTS_ERROR,
    payload: error
  }
} 

export const getPosts = () => {
  return async(dispatch) => {
     dispatch(getPostsRequest());
     try {
       const { data } = await axios.get('/api/v1/posts')
       dispatch(getPostsSuccess(data))
      } catch(error) {
       dispatch(getPostsError(error.response.data.error || error.message))
      }
  }
}
// ================================ Get Posts Action End ============================== //

// ================================ Get Single Post Action Start ====================== //
const getSinglePostRequest = () => {
  return {
    type: GET_SINGLE_POST_REQUEST
  }
}

const getSinglePostSuccess = ( post ) => {
  return {
    type: GET_SINGLE_POST_SUCCESS,
    payload: post
  }
}

const getSinglePostError = ( error ) => {
  return {
    type: GET_SINGLE_POST_ERROR,
    payload: error
  }
}

export const getSinglePost = ( postId ) => {
  return (dispatch) => {
     dispatch(getSinglePostRequest());
     axios.get(`/api/v1/posts/${ postId }`)
     .then(response => {
       dispatch(getSinglePostSuccess(response.data))})
     .catch(error => dispatch(getSinglePostError(error.response.data.error || error.message)))
  }
}
// ================================ Get Single Post Action End ====================== //

// ================================ Like Post Action Start ====================== //
const likePostRequest = () => {
  return {
    type: LIKE_POST_REQUEST
  }
}
const likePostSuccess = (data) => {
  return {
    type: LIKE_POST_SUCCESS,
    payload: data
  }
}
const likePostError = (error) => {
  return {
    type: LIKE_POST_ERROR,
    payload: error
  }
}
export const likePost = (postId) => {
  return async (dispatch) => {
    dispatch(likePostRequest())
    try {
      let { data } = await axios.put(`/api/v1/posts/${postId}/like_post`);
      dispatch(likePostSuccess(data))
    } catch(error) {
      console.log(error)
      dispatch(likePostError(error.response.data.error || error.message))
    }
  }
}
// ================================ Like Post Action End ====================== //



//########################################### COMMENT #####################################

// ================================ Add Comment Action Start ====================== //

const addCommentRequest = () => {
  return {
    type: ADD_COMMENT_REQUEST
  }
}

const addCommentSuccess = (data) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload: data
  }
}

const addCommentError = (error) => {
  return {
    type: ADD_COMMENT_ERROR,
    payload: error
  }
}

export const addComment = ( postId, body ) => {
  return async (dispatch) => {
    dispatch(addCommentRequest())
    try {
      const { data } = await axios.put(`/api/v1/posts/${postId}/comment_post`, body);
      dispatch(addCommentSuccess(data))
    } catch(error) {
      dispatch(addCommentError(error.response.data.error || error.message))
    }
  }
}

// ================================ Add Comment Action End ====================== //


// ================================ Like Comment Action Start ====================== //
  const likeCommentRequest = () => {
    return {
      type: LIKE_COMMENT_REQUEST
    }

  }
  const likeCommentSuccess = (data) => {
    return {
      type: LIKE_COMMENT_SUCCESS,
      payload: data
    }

  }
  const likeCommentError = (error) => {
    return {
      type: LIKE_COMMENT_ERROR,
      payload: error
    }

  }
  export const likeComment = ( postId, commentId ) => {
  return async (dispatch) => {
    dispatch(likeCommentRequest())
    try {
      let { data } = await axios.put(`/api/v1/posts/${postId}/comments/${commentId}/like_comment`);
      dispatch(likeCommentSuccess(data))
    } catch(error) {
      dispatch(likeCommentError(error.response.data.error || error.message))
    }
  }
}
// ================================ Like Comment Action End ====================== //

// ================================ Edit Comment Action Start ====================== //
  const editCommentRequest = () => {
    return {
      type: EDIT_COMMENT_REQUEST
    }
  }
  const editCommentSuccess = (data) => {
    return {
      type: EDIT_COMMENT_SUCCESS,
      payload: data
    }
  }
  const editCommentError = (error) => {
    return {
      type: EDIT_COMMENT_ERROR,
      payload: error
    }
  }

  export const editComment = ( postId, commentId, body ) => {
    return async (dispatch) => {
      dispatch(editCommentRequest())
      try {
        let { data } = await axios.patch(`/api/v1/posts/${ postId }/comments/${ commentId }/edit_comment`, body);
        dispatch(editCommentSuccess(data))
      } catch(error) {
        dispatch(editCommentError(error.response.data.error || error.message))
      }
    }
}
// ================================ Edit Comment Action End ====================== //

// ================================ Delete Comment Action Start ====================== //
  const deleteCommentPostRequest = () => {
     return {
       type: DELETE_COMMENT_REQUEST
     }
  }

  const deleteCommentPostSuccess = (data) => {
    return {
      type: DELETE_COMMENT_SUCCESS,
      payload: data
    }
  }

  const deleteCommentPostError = (error) => {
    return {
      type: DELETE_COMMENT_ERROR,
      payload: error
    }
  }
  export const deleteComment = ( postId, commentId ) => {
  return async (dispatch) => {
    dispatch(deleteCommentPostRequest)
    try {
      let { data } = await axios.delete(`/api/v1/posts/${ postId }/comments/${ commentId }/delete_comment`);
      dispatch(deleteCommentPostSuccess(data))
    } catch(error) {
      dispatch(deleteCommentPostError(error.response.data.error || error.message))
    }
  }
}
// ================================ Delete Comment Action End ====================== //

//########################################### COMMENT END #####################################

//########################################### REPLY ##################################### 

// ================================ Add Reply Action Start ====================== //
  const addReplyRequest = () => {
    return {
      type: ADD_REPLY_REQUEST
    }
  }

  const addReplySuccess = (data) => {
    return {
      type: ADD_REPLY_SUCCESS,
      payload: data
    }
  }

  const addReplyError = (error) => {
    return {
      type: ADD_REPLY_ERROR,
      payload: error
    }
  }
  export const addReply = ( postId, commentId, body ) => {
  return async (dispatch) => {
    dispatch(addReplyRequest())
    try {
      let { data } = await axios.put(`/api/v1/posts/${ postId }/comments/${ commentId }/reply_comment`, body);
      dispatch(addReplySuccess(data))
    } catch(error) {
      dispatch(addReplyError(error.response.data.error || error.message))
    }
  }
}
// ================================ Add Reply Action End ====================== //

// ================================ Like Reply Action Start ====================== //
  const likeReplyRequest = () => {
    return {
      type: LIKE_REPLY_REQUEST
    }
  }

  const likeReplySuccess = (data) => {
    return {
      type: LIKE_REPLY_SUCCESS,
      payload: data
    }
  }

  const likeReplyError = (error) => {
    return {
      type: LIKE_REPLY_ERROR,
      payload: error
    }
  }

  export const likeReply = ( postId, commentId, replyId ) => {
  return async (dispatch) => {
    dispatch(likeReplyRequest())
    try {
      let { data } = await axios.put(`/api/v1/posts/${ postId }/comments/${ commentId }/replies/${ replyId}/like_comment_reply`);
      dispatch(likeReplySuccess(data))
    } catch(error) {
      dispatch(likeReplyError(error.response.data.error || error.message))
    }
  }
}
// ================================ Like Reply Action End ====================== //



// ================================ Delete The Reply Action Start ====================== //
  const deleteReplyRequest = () => {
    return {
      type: DELETE_REPLY_REQUEST
    }
  }

  const deleteReplySuccess = (data) => {
    return {
      type: DELETE_REPLY_SUCCESS,
      payload: data
    }
  }

  const deleteReplyError = (error) => {
    return {
      type: DELETE_REPLY_ERROR,
      payload: error
    }
  }

  export const deleteReply = ( postId, commentId, replyId ) => {
  return async (dispatch) => {
    dispatch(deleteReplyRequest())
    try {
      let { data } = await axios.delete(`/api/v1/posts/${ postId }/comments/${ commentId }/replies/${replyId}/delete_comment_reply`);
      dispatch(deleteReplySuccess(data))
    } catch(error) {
      dispatch(deleteReplyError(error.response.data.error || error.message))
    }
  }
}
// ================================ Delete Reply Action End ====================== //



// ================================ Edit The Reply Action Start ====================== //
  const editReplyRequest = () => {
    return {
      type: EDIT_REPLY_REQUEST
    }
  }

  const editReplySuccess = (data) => {
    return {
      type: EDIT_REPLY_SUCCESS,
      payload: data
    }
  }

  const editReplyError = (error) => {
    return {
      type: EDIT_REPLY_ERROR,
      payload: error
    }
  }

  export const editReply = ( postId, commentId, replyId, body ) => {
  return async (dispatch) => {
    dispatch(editReplyRequest())
    try {
      let { data } = await axios.patch(`/api/v1/posts/${ postId }/comments/${ commentId }/replies/${replyId}/edit_comment_reply`, body);
      dispatch(editReplySuccess(data))
    } catch(error) {
      dispatch(editReplyError(error.response.data.error || error.message))
    }
  }
}
// ================================ Edit The Reply Action End ====================== //

//########################################### REPLY END ##################################### 


// ================================  Add New Post Action Start ====================== //
  const addPostRequest = () => {
    return {
      type: ADD_NEW_POST_REQUEST
    }
  }

  const addPostSuccess = ( data ) => {
    return {
      type: ADD_NEW_POST_SUCCESS,
      payload: data
    }
  }

  const addPostError = (error) => {
    return {
      type: ADD_NEW_POST_ERROR,
      payload: error
    }
  }

export const addPost = (body) => {
  return async (dispatch) => {
    dispatch(addPostRequest());
    try {
      const { data } = await axios.post('/api/v1/posts', body);
      dispatch(addPostSuccess( data ))
    } catch (error) {
      dispatch(addPostError(error.response.data.error || error.message))
    }
  }
}

// ================================ Add New Post Action End ====================== //


// ================================  Edit Post Action Start ====================== //
  const editPostRequest = () => {
    return {
      type: EDIT_POST_REQUEST
    }
  }

  const editPostSuccess = ( data ) => {
    return {
      type: EDIT_POST_SUCCESS,
      payload: data
    }
  }

  const editPostError = (error) => {
    return {
      type: EDIT_POST_ERROR,
      payload: error
    }
  }

export const editPost = (postId, body) => {
  return async (dispatch) => {
    dispatch(editPostRequest());
    try {
      const { data } = await axios.put(`/api/v1/posts/${ postId }`, body);
      dispatch(editPostSuccess( data ))
    } catch (error) {
      dispatch(editPostError(error.response.data.error || error.message))
    }
  }
}

// ================================ Edit Post Action End ====================== //

// ================================  Delete Post Action Start ====================== //
  const deletePostRequest = () => {
    return {
      type: DELETE_POST_REQUEST
    }
  }

  const deletePostSuccess = ( data ) => {
    return {
      type: DELETE_POST_SUCCESS,
      payload: data
    }
  }

  const deletePostError = (error) => {
    return {
      type: DELETE_POST_ERROR,
      payload: error
    }
  }

export const deletePost = (postId, body) => {
  return async (dispatch) => {
    dispatch(deletePostRequest());
    try {
      const { data } = await axios.delete(`/api/v1/posts/${ postId }`, { data: body });
      dispatch(deletePostSuccess( data ))
    } catch (error) {
      dispatch(deletePostError(error.response.data.error || error.message))
    }
  }
}

// ================================ Dedelete Post Action End ====================== //




// ====================== Clear Error Action Start======================================== //
  const clearErrorAction = () => {
    return {
      type: CLEAR_POST_ERRORS
    }
  }
  export const clearError = () => {
     return (dispatch) => {
       dispatch(clearErrorAction())
     }
  }
// ====================== Clear Error Action End======================================== //