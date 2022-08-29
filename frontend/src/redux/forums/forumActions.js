import { 
  GET_FORUMS_REQUEST, 
  GET_FORUMS_SUCCESS, 
  GET_FORUMS_ERROR,
  GET_SINGLE_FORUM_REQUEST,
  GET_SINGLE_FORUM_SUCCESS,
  GET_SINGLE_FORUM_ERROR,
  CREATE_FORUM_SUCCESS,
  CREATE_FORUM_ERROR,
  UPDATE_FORUM_SUCCESS,
  UPDATE_FORUM_ERROR,
  DELETE_FORUM_SUCCESS,
  DELETE_FORUM_ERROR,
  LIKE_FORUM_SUCCESS,
  LIKE_FORUM_ERROR,
  LIKE_THE_FORUM_SUCCESS,
  SET_NUMBER_OF_COMMENTS,
  SET_FORUM_VIEWS,
  UPDATE_THE_FORUM_SUCCESS,
  UPDATE_THE_FORUM_ERROR,
  DELETE_THE_FORUM_SUCCESS,
  DELETE_THE_FORUM_ERROR,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_ERROR,
  UPDATE_COMMENT_SUCCESS,
  SET_COMMENT_BODY,
  SET_COMMENT_DATA,

  GET_REPLIES_SUCCESS,
  CREATE_REPLY_SUCCESS,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_ERROR,
  UPDATE_REPLY_SUCCESS,
  DELETE_REPLY_SUCCESS,
  UPDATE_DELETE_REPLY_REQUEST_ERR0R,
  GET_CREATE_REPLY_REQUEST_ERROR,
  UPDATE_DELETE_COMMENT_REQUEST_ERROR,
  GET_CREATE_COMMENT_REQUEST,
} from "./forumTypes";

import axios from 'axios';
import { requestDispatch } from "../../utils";

export const getForums = (userType, userId, pageNumber) => {
  return async(dispatch) => {
     dispatch({ type: GET_FORUMS_REQUEST });
     try {
       const { data } = await axios.get(`/api/v1/forums?user_type=${userType}&user=${userId}&page=${pageNumber}`)
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
       const { data } = await axios.get(`/api/v1/forums/${forumId}?user=${userId}`);
       dispatch({ type: GET_SINGLE_FORUM_SUCCESS, payload: data});
       dispatch({ type: SET_FORUM_VIEWS, payload: forumId});
      } catch(error) {
       dispatch({type: GET_SINGLE_FORUM_ERROR, payload: error.response.data.error || error.message })
      }
  }
}

export const createForum = (body) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Creating Forum')
    try {
      const { data } = await axios.post('/api/v1/forums', body);
      dispatch({ type: CREATE_FORUM_SUCCESS, payload: data })
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: CREATE_FORUM_ERROR, payload: error.response.data.error || error.message})
    }
  }
}
export const updateForum = (forumId, body) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Editing Forum')
    try {
      const { data } = await axios.patch(`/api/v1/forums/${ forumId }`, body);
      dispatch({ type: UPDATE_FORUM_SUCCESS, payload: data})
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: UPDATE_FORUM_ERROR ,payload : error.response.data.error || error.message})
    }
  }
}

export const deleteForum = (forumId) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Deleting Forum')
    try {
      const { data } = await axios.delete(`/api/v1/forums/${ forumId }`);
      dispatch({ type: DELETE_FORUM_SUCCESS, payload: data })
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: DELETE_FORUM_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const likeForum = (forumId) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/likes?type=forum&id=${forumId}`);
      dispatch({ type: LIKE_FORUM_SUCCESS, payload: data})
      dispatch({ type: LIKE_THE_FORUM_SUCCESS, payload: data})
    } catch(error) {
      dispatch({ type: LIKE_FORUM_ERROR, payload: error.response.data.error || error.message })
    }
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%% FORUM %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const updateTheForum = (forumId, body) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Editing Forum')
    try {
      const { data } = await axios.patch(`/api/v1/forums/${ forumId }`, body);;
      dispatch({ type: UPDATE_THE_FORUM_SUCCESS, payload: data })
      dispatch({ type: UPDATE_FORUM_SUCCESS, payload: data })
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type:UPDATE_THE_FORUM_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const deleteTheForum = (forumId) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Deleting Forum')
    try {
      const { data } = await axios.delete(`/api/v1/forums/${ forumId }`);
      dispatch({ type: DELETE_THE_FORUM_SUCCESS, payload: data })
      data.msg = '';
      dispatch({ type: DELETE_FORUM_SUCCESS, payload: data })
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: DELETE_THE_FORUM_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

//================================== COMMENTS =======================================
export const getComments = (forumId, userId, pageNumber) => {
  return async (dispatch) => {
    dispatch({ type: GET_CREATE_COMMENT_REQUEST, payload: { loader: { commentLoading: true } }} )
    try {
      const { data: { comments } } = await axios.get(`/api/v1/comments?type=forum&id=${forumId}&user=${userId}&page=${pageNumber}`);
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: comments })
    } catch(error) {
      dispatch({type: GET_COMMENTS_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const createComment = ( forumId, body ) => {
  return async (dispatch) => {
    dispatch({ type: GET_CREATE_COMMENT_REQUEST, payload: { loader: { addingComment: true} } })
    try {
      const { data: { comment } } = await axios.post(`/api/v1/comments?type=forum&id=${ forumId }`, body);
      let Comment = { ...comment, isLiked: false, numLikes: 0, likes: [] }
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: Comment})
      dispatch({ type: SET_NUMBER_OF_COMMENTS, payload: { id: forumId, commentAdded: true } })
    } catch(error) {
      dispatch({ type: CREATE_COMMENT_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const likeComment = ( commentId ) => {
  return async (dispatch) => {
    dispatch({ type: LIKE_COMMENT_REQUEST })
    try {
      let { data } = await axios.post(`/api/v1/likes?type=comment&id=${commentId}`);
      dispatch({ type: LIKE_COMMENT_SUCCESS, payload: data})
    } catch(error) {
      dispatch({ type: LIKE_COMMENT_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

export const updateComment = ( commentId, body ) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, loader: { updatingComment: true } }})
      try {
        let { data: { comment } } = await axios.patch(`/api/v1/comments/${ commentId }`, body);
        dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: { commentId, comment } })
      } catch(error) {
        dispatch({ type: UPDATE_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, loader: { updatingComment: false }, error: error.response.data.error || error.message }})
      }
    }
}

export const deleteComment = ( commentId ) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, loader: { deletingComment: true } }})
    try {
      let { data } = await axios.delete(`/api/v1/comments/${ commentId }`);
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data})
      dispatch({ type: SET_NUMBER_OF_COMMENTS, payload: { id: data.comment.forum, commentAdded: false }})
    } catch(error) {
      dispatch({ type: UPDATE_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, loader: { deletingComment: false }, error: error.response.data.error || error.message }})
    }
  }
}

export const setCommentBody = (value) => {
  return (dispatch) => {
    dispatch({ type: SET_COMMENT_BODY, payload: value })
  }
}

export const setCommentData = (commentId, name, value) => {
    return (dispatch) => {
    dispatch({ type: SET_COMMENT_DATA, payload: { commentId, name, value }})
  }
 }


//================================== REPLIES =======================================

 export const getReplies = (userId, commentId, page) => {
   return async(dispatch) => {
     dispatch({ type: GET_CREATE_REPLY_REQUEST_ERROR, payload: { commentId, loader: { replyLoading: true } } })
     try {
      let { data: { replies } } = await axios.get(`/api/v1/comments/${ commentId }/replies?user=${userId}&page=${page}`);
      dispatch({ type: GET_REPLIES_SUCCESS, payload: { commentId, replies } })
    } catch(error) {
      dispatch({ type: GET_CREATE_REPLY_REQUEST_ERROR, payload: { commentId, loader: { replyLoading: false }, error: error.response.data.error || error.message }})
    }
   }
 }
 export const addReply = ( commentId, body ) => {
  return async (dispatch) => {
    dispatch({ type: GET_CREATE_REPLY_REQUEST_ERROR, payload: { commentId, loader: { addingReply: true } } })
    try {
      let { data } = await axios.post(`/api/v1/comments/${ commentId }/replies`, body);
      dispatch({ type: CREATE_REPLY_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_CREATE_REPLY_REQUEST_ERROR, payload: { commentId, loader: { addingReply: false }, error: error.response.data.error || error.message }})
    }
  }
}

export const likeReply = ( commentId, replyId ) => {
  return async (dispatch) => {
    try {
      let { data: { Liked, Like } } = await axios.post(`/api/v1/likes?type=reply&id=${replyId}`);
      dispatch({ type: LIKE_REPLY_SUCCESS, payload: { commentId, Liked, Like } })
    } catch(error) {
      dispatch({ type: LIKE_REPLY_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

export const deleteReply = ( commentId, replyId ) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DELETE_REPLY_REQUEST_ERR0R, payload: { commentId, replyId, loader: { deletingReply: true }} })
    try {
      let { data } = await axios.delete(`/api/v1/replies/${replyId}`);
      dispatch({ type: DELETE_REPLY_SUCCESS , payload: data})
    } catch(error) {
      dispatch({ type: UPDATE_DELETE_REPLY_REQUEST_ERR0R, payload: { commentId, replyId, loader: { deletingReply: false }, error: error.response.data.error || error.message }})
    }
  }
}

export const updateReply = ( commentId, replyId, body ) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DELETE_REPLY_REQUEST_ERR0R, payload: { commentId, replyId, loader: { updatingReply: true } } })
    try {
      let { data: { reply } } = await axios.patch(`/api/v1/replies/${replyId}`, body);
      dispatch({ type: UPDATE_REPLY_SUCCESS, payload: { commentId, replyId, reply }})
    } catch(error) {
      dispatch({ type: UPDATE_DELETE_REPLY_REQUEST_ERR0R, payload: { commentId, replyId, loader: { updatingReply: false }, error: error.response.data.error || error.message }})
    }
  }
}
// ======================= REPLY ACTIONS =======================================//

 