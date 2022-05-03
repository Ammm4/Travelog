import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR,
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_ERROR,
  LIKE_POST_POSTS_SUCCESS,
  LIKE_POST_POSTS_ERROR,
  EDIT_POST_POSTS_REQUEST,
  EDIT_POST_POSTS_SUCCESS,
  EDIT_POST_POSTS_ERROR,
  DELETE_POST_POSTS_REQUEST,
  DELETE_POST_POSTS_SUCCESS,
  DELETE_POST_POSTS_ERROR, 
  GET_COMMENTS_POSTS_REQUEST,
  GET_COMMENTS_POSTS_SUCCESS,
  GET_COMMENTS_POSTS_ERROR,
  ADD_COMMENT_POSTS_REQUEST,
  ADD_COMMENT_POSTS_SUCCESS,
  ADD_COMMENT_POSTS_ERROR,
  DELETE_COMMENT_POSTS_REQUEST,
  DELETE_COMMENT_POSTS_SUCCESS,
  DELETE_COMMENT_POSTS_ERROR,
  LIKE_COMMENT_POSTS_REQUEST,
  LIKE_COMMENT_POSTS_SUCCESS,
  LIKE_COMMENT_POSTS_ERROR,
  EDIT_COMMENT_POSTS_REQUEST,
  EDIT_COMMENT_POSTS_SUCCESS,
  EDIT_COMMENT_POSTS_ERROR,
  SHOW_COMMENTS,
  
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  GET_THE_COMMENTS_REQUEST,
  GET_THE_COMMENTS_SUCCESS,
  GET_THE_COMMENTS_ERROR,
  LIKE_THE_COMMENT_REQUEST,
  LIKE_THE_COMMENT_SUCCESS,
  LIKE_THE_COMMENT_ERROR,
  EDIT_THE_COMMENT_REQUEST,
  EDIT_THE_COMMENT_SUCCESS,
  EDIT_THE_COMMENT_ERROR,
  DELETE_THE_COMMENT_REQUEST,
  DELETE_THE_COMMENT_SUCCESS,
  DELETE_THE_COMMENT_ERROR,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,

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
  
  SHOW_THE_COMMENTS

} from "./postTypes";

import axios from 'axios';
//  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ==== POSTS ==== %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ============ Get Posts Action Start ================ //
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

export const getPosts = (userType,userId) => {
  return async(dispatch) => {
     dispatch(getPostsRequest());
     try {
       const { data } = await axios.get(`/api/v1/posts?user_type=${userType}&user=${userId}`);
       data.posts = data.posts.map(post => ({ ...post, showComments: false, singlePost: false }))
       dispatch(getPostsSuccess(data))
      } catch(error) {
       dispatch(getPostsError(error.response.data.error || error.message))
      }
  }
}
// =========== Get Posts End ======== //
// ================= Add New Post Start ====================== //
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
      console.log(data);
      dispatch(addPostSuccess( data ))
    } catch (error) {
      dispatch(addPostError(error.response.data.error || error.message))
    }
  }
}

// =================Add New Post End ====================== //
// =========== Like Post Start ====================== //

const likePostSuccess = (data) => {
  return {
    type: LIKE_POST_POSTS_SUCCESS,
    payload: data
  }
}
const likePostError = (error) => {
  return {
    type: LIKE_POST_POSTS_ERROR,
    payload: error
  }
}
export const likePost = (postId) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/posts/${postId}`);
      data.post = postId;
      dispatch(likePostSuccess(data))
    } catch(error) {
      dispatch(likePostError(error.response.data.error || error.message))
    }
  }
}
// ============ Like Post End ==================== //
// ============ Delete Post Start ====================== //
  const deletePostRequest = () => {
    return {
      type: DELETE_POST_POSTS_REQUEST
    }
  }

  const deletePostSuccess = ( data ) => {
    return {
      type: DELETE_POST_POSTS_SUCCESS,
      payload: data
    }
  }

  const deletePostError = (error) => {
    return {
      type: DELETE_POST_POSTS_ERROR,
      payload: error
    }
  }

export const deletePost = (postId) => {
  return async (dispatch) => {
    dispatch(deletePostRequest());
    try {
      const { data } = await axios.delete(`/api/v1/posts/${ postId }`);
      dispatch(deletePostSuccess( data ))
    } catch (error) {
      dispatch(deletePostError(error.response.data.error || error.message))
    }
  }
}
// =============== Delete Post End ====================== //
// ===============  Edit Post Start ====================== //
  const editPostRequest = () => {
    return {
      type: EDIT_POST_POSTS_REQUEST
    }
  }
  const editPostSuccess = ( data ) => {
    return {
      type: EDIT_POST_POSTS_SUCCESS,
      payload: data
    }
  }
  const editPostError = (error) => {
    return {
      type: EDIT_POST_POSTS_ERROR,
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
// ============Edit Post End ====================== //

// =========== Get Comments ======== //
export const getComments = (postId,userId) => {
  return async (dispatch) => {
    dispatch({ type: GET_COMMENTS_POSTS_REQUEST })
    try {
      const { data } = await axios.get(`/api/v1/posts/${postId}/comments?user=${userId}`);
      data.post = postId;
      dispatch({ type: GET_COMMENTS_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_COMMENTS_POSTS_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
// =========== Get Comments ======== //

// =========== Add Comment Start ================//
const addCommentRequest = () => {
  return {
    type: ADD_COMMENT_POSTS_REQUEST
  }
}
const addCommentSuccess = (data) => {
  return {
    type: ADD_COMMENT_POSTS_SUCCESS,
    payload: data
  }
}
const addCommentError = (error) => {
  return {
    type: ADD_COMMENT_POSTS_ERROR,
    payload: error
  }
}

export const addComment = ( postId, body ) => {
  return async (dispatch) => {
    dispatch(addCommentRequest())
    try {
      const { data } = await axios.post(`/api/v1/posts/${postId}/comments`, body);
      dispatch(addCommentSuccess(data))
    } catch(error) {
      dispatch(addCommentError(error.response.data.error || error.message))
    }
  }
}
// ======================Add Comment End ====================== //

// ================================ Like Comment Start ====================== //
  const likeCommentRequest = () => {
    return {
      type: LIKE_COMMENT_POSTS_REQUEST
    }
  }
  const likeCommentSuccess = (data) => {
    return {
      type: LIKE_COMMENT_POSTS_SUCCESS,
      payload: data
    }
  }
  const likeCommentError = (error) => {
    return {
      type: LIKE_COMMENT_POSTS_ERROR,
      payload: error
    }

  }

  export const likeComment = ( postId, commentId ) => {
  return async (dispatch) => {
    dispatch(likeCommentRequest())
    try {
      let { data } = await axios.post(`/api/v1/post/comments/${commentId}`);
      data.post = postId;
      dispatch(likeCommentSuccess(data))
    } catch(error) {
      dispatch(likeCommentError(error.response.data.error || error.message))
    }
  }
}
// ================= Like Comment End ====================== //

// ================= Edit Comment Start ====================== //
  const editCommentRequest = () => {
    return {
      type: EDIT_COMMENT_POSTS_REQUEST
    }
  }
  const editCommentSuccess = (data) => {
    return {
      type: EDIT_COMMENT_POSTS_SUCCESS,
      payload: data
    }
  }
  const editCommentError = (error) => {
    return {
      type: EDIT_COMMENT_POSTS_ERROR,
      payload: error
    }
  }

  export const editComment = ( commentId, body ) => {
    return async (dispatch) => {
      dispatch(editCommentRequest())
      try {
        let { data } = await axios.patch(`/api/v1/post/comments/${ commentId }`, body);
        dispatch(editCommentSuccess(data))
      } catch(error) {
        dispatch(editCommentError(error.response.data.error || error.message))
      }
    }
}
// ============ Edit Comment End ====================== //

// ============ Delete Comment Start ====================== //
  const deleteCommentPostRequest = () => {
     return {
       type: DELETE_COMMENT_POSTS_REQUEST
     }
  }
  const deleteCommentPostSuccess = (data) => {
    return {
      type: DELETE_COMMENT_POSTS_SUCCESS,
      payload: data
    }
  }
  const deleteCommentPostError = (error) => {
    return {
      type: DELETE_COMMENT_POSTS_ERROR,
      payload: error
    }
  }
  export const deleteComment = ( commentId ) => {
  return async (dispatch) => {
    dispatch(deleteCommentPostRequest)
    try {
      let { data } = await axios.delete(`/api/v1/post/comments/${ commentId }`);
      dispatch(deleteCommentPostSuccess(data))
    } catch(error) {
      dispatch(deleteCommentPostError(error.response.data.error || error.message))
    }
  }
}
// ============== Delete Comment End ====================== //
  export const setShowComments = (id, show) => {
    return (dispatch) => {
      const payload = {id, show}
      dispatch({ type: SHOW_COMMENTS, payload })
    }
  }


//  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ==== POST ==== %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// ======== Get Post Start ============= //
const getPostRequest = () => {
  return {
    type: GET_POST_REQUEST
  }
}
const getPostSuccess = ( post ) => {
  return {
    type: GET_POST_SUCCESS,
    payload: post
  }
}
const getPostError = ( error ) => {
  return {
    type: GET_POST_ERROR,
    payload: error
  }
}

export const getPost = ( postId, userId ) => {
  return async (dispatch) => {
     dispatch(getPostRequest());
     try{
       const { data } = await axios.get(`/api/v1/posts/${ postId }?user=${ userId }`);

       data.post = { ...data.post, showComments: true, singlePost: true };
       dispatch(getPostSuccess(data))
     } catch(error){
       dispatch(getPostError(error.response.data.error || error.message))
     }
  }
}
// =================== Get Post End ================= //

// =================== Edit Post End ================= //
export const editThePost = (postId, body) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_POST_REQUEST });
    try {
      const { data } = await axios.put(`/api/v1/posts/${ postId }`, body);
      dispatch({ type: EDIT_POST_SUCCESS, payload: data})
      dispatch({ type: EDIT_POST_POSTS_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: EDIT_POST_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
// =================== Edit Post End ================= //

export const likeThePost = (postId) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/posts/${postId}`);
      dispatch({ type: LIKE_POST_SUCCESS, payload: data })
      dispatch({ type: LIKE_POST_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch(likePostError(error.response.data.error || error.message))
    }
  }
}

export const deleteThePost = (postId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_POST_REQUEST });
    try {
      const { data } = await axios.delete(`/api/v1/posts/${ postId }`);
      dispatch({ type: DELETE_POST_SUCCESS, payload: data})
      dispatch(deletePostSuccess( data ))
     
    } catch (error) {
      dispatch({ type: DELETE_POST_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const getTheComments = (postId,userId) => {
  return async (dispatch) => {
    //dispatch({ type: GET_COMMENTS_POSTS_REQUEST })
    try {
      const { data } = await axios.get(`/api/v1/posts/${postId}/comments?user=${userId}`);
      dispatch({ type: GET_THE_COMMENTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_THE_COMMENTS_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const addAComment = ( postId, body ) => {
  return async (dispatch) => {
    //dispatch(addCommentRequest())
    try {
      const { data } = await axios.post(`/api/v1/posts/${postId}/comments`, body);
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: data})
      dispatch(addCommentSuccess(data))
    } catch(error) {
      dispatch({ type: ADD_COMMENT_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const likeTheComment = ( postId, commentId ) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/post/comments/${commentId}`);
      data.post = postId;
      dispatch({ type: LIKE_THE_COMMENT_SUCCESS, payload: data })
      dispatch(likeCommentSuccess(data))
    } catch(error) {
      dispatch({ type: LIKE_THE_COMMENT_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
export const editTheComment = ( commentId, body ) => {
    return async (dispatch) => {
      //dispatch(editCommentRequest())
      try {
        let { data } = await axios.patch(`/api/v1/post/comments/${ commentId }`, body);
        dispatch({ type: EDIT_THE_COMMENT_SUCCESS, payload: data})
        dispatch(editCommentSuccess(data))
      } catch(error) {
        dispatch({ type: EDIT_THE_COMMENT_ERROR, payload: error.response.data.error || error.message })
      }
    }
}
export const deleteTheComment = ( commentId ) => {
  return async (dispatch) => {
    //dispatch(deleteCommentPostRequest)
    try {
      let { data } = await axios.delete(`/api/v1/post/comments/${ commentId }`);
      dispatch({ type: DELETE_THE_COMMENT_SUCCESS, payload: data });
      dispatch(deleteCommentPostSuccess(data))
    } catch(error) {
      dispatch({ type: DELETE_THE_COMMENT_ERROR, payload: error.response.data.error || error.message})
    }
  }
}
export const setShowTheComments = (show) => {
    return (dispatch) => {
      dispatch({ type: SHOW_THE_COMMENTS, payload: show })
    }
  }




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

//########################################### REPLY END ##################################### POSTS_

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