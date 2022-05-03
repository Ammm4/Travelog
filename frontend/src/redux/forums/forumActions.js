import { 
  GET_FORUMS_REQUEST, 
  GET_FORUMS_SUCCESS, 
  GET_FORUMS_ERROR,
  GET_SINGLE_FORUM_REQUEST,
  GET_SINGLE_FORUM_SUCCESS,
  GET_SINGLE_FORUM_ERROR,
  CREATE_FORUM_REQUEST,
  CREATE_FORUM_SUCCESS,
  CREATE_FORUM_ERROR,
  UPDATE_FORUM_REQUEST,
  UPDATE_FORUM_SUCCESS,
  UPDATE_FORUM_ERROR,
  DELETE_FORUM_REQUEST,
  DELETE_FORUM_SUCCESS,
  DELETE_FORUM_ERROR,
  LIKE_FORUM_SUCCESS,
  LIKE_FORUM_ERROR,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_ERROR,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_ERROR,
  LIKE_REPLY_REQUEST,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_ERROR,
  UPDATE_REPLY_REQUEST,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_ERROR,
  DELETE_REPLY_REQUEST,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_ERROR,
  CLEAR_FORUM_ERRORS,
  FORUM_RESET
} from "./forumTypes";
/*  NEW_FORUM_RESET,
  FORUM_RESET */
import axios from 'axios';

export const getForums = (userId, userType) => {
  return async(dispatch) => {
     dispatch({ type: GET_FORUMS_REQUEST });
     try {
       const { data } = await axios.get(`/api/v1/forums?user_type=${userType}&user=${userId}`)
       dispatch({ type: GET_FORUMS_SUCCESS, payload: data })
      } catch(error) {
       dispatch({ type: GET_FORUMS_ERROR, payload: error.response.data.error || error.message })
      }
  }
}

export const getForum = (forumId, userId) => {
  return async(dispatch) => {
     dispatch({ type: GET_SINGLE_FORUM_REQUEST });
     try {
       const { data } = await axios.get(`/api/v1/forums/${forumId}?user=${userId}`)
       dispatch({ type: GET_SINGLE_FORUM_SUCCESS, payload: data})
      } catch(error) {
       dispatch({type: GET_SINGLE_FORUM_ERROR, payload: error.response.data.error || error.message })
      }
  }
}

export const createForum = (body) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_FORUM_REQUEST });
    try {
      const { data } = await axios.post('/api/v1/forums', body);
      dispatch({ type: CREATE_FORUM_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: CREATE_FORUM_ERROR, payload: error.response.data.error || error.message})
    }
  }
}
export const updateForum = (postId, body) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_FORUM_REQUEST });
    try {
      const { data } = await axios.put(`/api/v1/posts/${ postId }`, body);
      dispatch({ type: UPDATE_FORUM_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: UPDATE_FORUM_ERROR ,payload : error.response.data.error || error.message})
    }
  }
}

export const deleteForum = (forumId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_FORUM_REQUEST });
    try {
      await axios.delete(`/api/v1/forums/${ forumId }`);
      dispatch({ type: DELETE_FORUM_SUCCESS })
    } catch (error) {
      dispatch({ type:DELETE_FORUM_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const likeForum = (forumId) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/forums/${forumId}`);
      dispatch({ type: LIKE_FORUM_SUCCESS, payload: data})
    } catch(error) {
      dispatch({ type: LIKE_FORUM_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

//================================== COMMENTS =======================================
export const getComments = (forumId, userId) => {
  return async (dispatch) => {
    dispatch({ type: GET_COMMENTS_REQUEST })
    try {
      const { data: { comments } } = await axios.get(`/api/v1/forums/${forumId}/comments?user=${userId}`);
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: comments})
    } catch(error) {
      dispatch({type: GET_COMMENTS_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const createComment = ( forumId, body ) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST })
    try {
      const { data: { comment } } = await axios.post(`/api/v1/forums/${forumId}/comments`, body);
      let Comment = { ...comment, isLiked: false, numLikes: 0, likes: [] }
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: Comment})
    } catch(error) {
      dispatch({ type: CREATE_COMMENT_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const likeComment = ( commentId ) => {
  return async (dispatch) => {
    dispatch({ type: LIKE_COMMENT_REQUEST })
    try {
      let { data } = await axios.post(`/api/v1/comments/${commentId}`);
      dispatch({ type: LIKE_COMMENT_SUCCESS, payload: data})
    } catch(error) {
      dispatch({ type: LIKE_COMMENT_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

export const updateComment = ( commentId, body ) => {
    return async (dispatch) => {
      //dispatch({ type: UPDATE_COMMENT_REQUEST})
      try {
        let { data } = await axios.patch(`/api/v1/comments/${ commentId }`, body);
        dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: data })
      } catch(error) {
        dispatch({ type: UPDATE_COMMENT_ERROR, payload: error.response.data.error || error.message})
      }
    }
}

export const deleteComment = ( commentId ) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST})
    try {
      let { data } = await axios.delete(`/api/v1/comments/${ commentId }`);
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data})
    } catch(error) {
      dispatch({ type:DELETE_COMMENT_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

//================================== REPLIESS =======================================
 export const addReply = ( commentId, body ) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_REPLY_REQUEST })
    try {
      let { data } = await axios.put(`/api/v1/comments/${ commentId }/replies`, body);
      dispatch({ type: CREATE_REPLY_SUCCESS, payload: data})
    } catch(error) {
      dispatch({type:CREATE_REPLY_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

export const likeReply = ( replyId ) => {
  return async (dispatch) => {
    dispatch({ type: LIKE_REPLY_REQUEST})
    try {
      let { data } = await axios.put(`/api/v1/replies/${ replyId}`);
      dispatch({ type: LIKE_REPLY_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: LIKE_REPLY_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

export const deleteReply = ( replyId ) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_REPLY_REQUEST })
    try {
      let { data } = await axios.delete(`/api/v1/replies/${replyId}`);
      dispatch({ type: DELETE_REPLY_SUCCESS , payload: data})
    } catch(error) {
      dispatch({ type: DELETE_REPLY_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

export const updateReply = ( replyId, body ) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_REPLY_REQUEST })
    try {
      let { data } = await axios.patch(`/api/v1/replies/${replyId}`, body);
      dispatch({ type: UPDATE_REPLY_SUCCESS, payload: data})
    } catch(error) {
      dispatch({ type: UPDATE_REPLY_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

//=================== CLEAR ERRORS =============================//
 const clearErrorAction = () => {
    return {
      type: CLEAR_FORUM_ERRORS
    }
  }
 export const forumReset = () => {
    return {
      type: FORUM_RESET
    }
  }
  export const clearError = () => {
     return (dispatch) => {
       dispatch(clearErrorAction())
     }
  }