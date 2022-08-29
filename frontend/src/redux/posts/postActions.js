import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_ERROR,
  LIKE_POST_POSTS_SUCCESS,
  LIKE_POST_POSTS_ERROR,
  EDIT_POST_POSTS_SUCCESS,
  EDIT_POST_POSTS_ERROR,
  DELETE_POST_POSTS_SUCCESS,
  DELETE_POST_POSTS_ERROR, 
  GET_COMMENTS_POSTS_SUCCESS,
  ADD_COMMENT_POSTS_SUCCESS,
  DELETE_COMMENT_POSTS_SUCCESS,
  LIKE_COMMENT_POSTS_SUCCESS,
  LIKE_COMMENT_POSTS_ERROR,
  EDIT_COMMENT_POSTS_SUCCESS,
  SET_POST_VIEWS,
  
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  GET_THE_COMMENTS_SUCCESS,
  GET_THE_COMMENTS_ERROR,
  LIKE_THE_COMMENT_SUCCESS,
  LIKE_THE_COMMENT_ERROR,
  EDIT_THE_COMMENT_SUCCESS,
  DELETE_THE_COMMENT_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  SET_POST_COMMENT_DATA,
  SET_POSTS_COMMENT_DATA,
  GET_POSTS_COMMENT_REPLY_SUCCESS,
  ADD_POSTS_COMMENT_REPLY_SUCCESS,
  LIKE_POSTS_COMMENT_REPLY_SUCCESS,
  LIKE_POSTS_COMMENT_REPLY_ERROR,
  EDIT_POSTS_COMMENT_REPLY_SUCCESS,
  DELETE_POSTS_COMMENT_REPLY_SUCCESS,
  GET_POST_REPLY_SUCCESS,
  LIKE_POST_REPLY_SUCCESS,
  LIKE_POST_REPLY_ERROR,
  EDIT_POST_REPLY_SUCCESS,
  SET_POSTS_POST_DATA,
  SET_POST_DATA,
  ADD_POST_REPLY_SUCCESS,
  DELETE_POST_REPLY_SUCCESS,
  EDIT_DELETE_POST_REPLY_REQUEST_ERROR,
  EDIT_DELETE_COMMENT_REQUEST_ERROR,
  GET_ADD_POST_REPLY_REQUEST_ERROR,
  GET_ADD_POST_COMMENT_REQUEST,
  EDIT_DELETE_POSTS_REPLY_REQUEST_ERROR,
  GET_ADD_POSTS_REPLY_REQUEST_ERROR,
  EDIT_DELETE_POSTS_COMMENT_REQUEST_ERROR,
  GET_ADD_POSTS_COMMENT_REQUEST_ERROR

} from "./postTypes";
import { RESET_POST_INFO } from "../globals/globalTypes";
import { resetPostValue } from "../../constants";
import axios from 'axios';
import { requestDispatch } from "../../utils";

//  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ==== POSTS ==== %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ============ Get Posts Action Start ================ //

export const getPosts = (userType,userId,pageNumber) => {
  return async(dispatch) => {
     dispatch({ type: GET_POSTS_REQUEST });
     try {
       const { data } = await axios.get(`/api/v1/posts?user_type=${userType}&user=${userId}&page=${pageNumber}`);
       data.posts = data.posts.map(post => ({ ...post, showComments: false, singlePost: false }))
       dispatch({ type: GET_POSTS_SUCCESS, payload: data })
      } catch(error) {
        dispatch({ type: GET_POSTS_ERROR, payload: error.response.data.error || error.message})
      }
  }
}
// =========== Get Posts End ======== //
// ================= Add New Post Start ====================== //
  
export const addPost = (body) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Creating Post' )
    try {
      const { data } = await axios.post('/api/v1/posts', body);
      dispatch({ type: RESET_POST_INFO, payload: resetPostValue() })
      dispatch({ type: ADD_NEW_POST_SUCCESS, payload: data})
    } catch (error) {
      requestDispatch(dispatch, null )
      dispatch({ type: ADD_NEW_POST_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

// =================Add New Post End ====================== //
// =========== Like Post Start ====================== //


export const likePost = (postId) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/likes?type=post&id=${postId}`);
      dispatch({ type: LIKE_POST_POSTS_SUCCESS, payload: data})
    } catch(error) {
      dispatch( { type: LIKE_POST_POSTS_ERROR, payload: error.response.data.error || error.message})
    }
  }
}
// ============ Like Post End ==================== //
// ============ Delete Post Start ====================== //
export const deletePost = (postId) => {
  return async (dispatch) => {
    requestDispatch(dispatch,'Deleting Post')
    try {
      await axios.delete(`/api/v1/posts/${ postId }`);
      dispatch({ type: DELETE_POST_POSTS_SUCCESS, payload: { postId }})
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: DELETE_POST_POSTS_ERROR, payload: error.response.data.error || error.message })    
    }
  }
}
// =============== Delete Post End ====================== //
// ===============  Edit Post Start ====================== //
export const editPost = (postId, body) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Post Editing')
    try {
      const { data: { post } } = await axios.patch(`/api/v1/posts/${ postId }`, body);
      dispatch({ type: EDIT_POST_POSTS_SUCCESS, payload: { postId, post }})
      dispatch({ type: RESET_POST_INFO, payload: resetPostValue() })
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: EDIT_POST_POSTS_ERROR, payload: error.response.data.error || error.message})
    }
  }
}
// ============Edit Post End ====================== //

// =========== Get Comments ======== //
export const getComments = ( postId, userId, page) => {
  return async (dispatch) => {
    dispatch({ type: GET_ADD_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, loader: { commentsLoading: true } } })
    try {
      const { data } = await axios.get(`/api/v1/comments?type=post&id=${postId}&user=${userId}&page=${page}`);
      data.post = postId;
      dispatch({ type: GET_COMMENTS_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_ADD_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, loader: { commentsLoading: false}, error: error.response.data.error || error.message} })
    }
  }
}
// =========== Get Comments ======== //

// =========== Add Comment Start ================//
export const addComment = ( postId, body ) => {
  return async (dispatch) => {
    dispatch({type: GET_ADD_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, loader: { addingComment: true } } })
    try {
      const { data } = await axios.post(`/api/v1/comments?type=post&id=${postId}`, body);
      dispatch({ type: ADD_COMMENT_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_ADD_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, loader: { addingComment: false }, error: error.response.data.error || error.message }})
    }
  }
}
// ======================Add Comment End ====================== //

// ================================ Like Comment Start ====================== //
  export const likeComment = ( postId, commentId ) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/likes?type=comment&id=${commentId}`);
      data.post = postId;
      dispatch({ type: LIKE_COMMENT_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: LIKE_COMMENT_POSTS_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
// ================= Like Comment End ====================== //

// ================= Edit Comment Start ====================== //
  export const editComment = ( postId, commentId, body ) => {
    return async (dispatch) => {
      dispatch({ type: EDIT_DELETE_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, commentId, loader: { editingComment: true } } })
      try {
        let { data: { comment } } = await axios.patch(`/api/v1/comments/${ commentId }`, body);
        dispatch({ type: EDIT_COMMENT_POSTS_SUCCESS, payload: { postId, commentId, comment } })
      } catch(error) {
        dispatch({ type: EDIT_DELETE_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, commentId, loader: { editingComment: false }, error: error.response.data.error || error.message } })
      }
    }
}
// ============ Edit Comment End ====================== //

// ============ Delete Comment Start ====================== //
  export const deleteComment = ( postId, commentId ) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_DELETE_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, commentId, loader: { deletingComment: true } } })
    try {
      let { data } = await axios.delete(`/api/v1/comments/${ commentId }`);
      dispatch({ type: DELETE_COMMENT_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: EDIT_DELETE_POSTS_COMMENT_REQUEST_ERROR, payload: { postId, commentId, loader: { deletingComment: false }, error: error.response.data.error || error.message } })
    }
  }
}
// ============== Delete Comment End ====================== //
export const setPostsPostData = (postId, name, value) => {
   return (dispatch) => {
      dispatch({ type: SET_POSTS_POST_DATA, payload: { postId, name, value } })
    }
}

 export const setPostsCommentData = (postId, commentId, name, value) => {
   return (dispatch) => {
    dispatch({ type: SET_POSTS_COMMENT_DATA, payload: { postId, commentId, name, value } })
   }
 }
export const setPostViews = ( postId ) => {
  return (dispatch) => dispatch({ type: SET_POST_VIEWS, payload: { postId } })
}
 // ======================= Replies ============================== //
 export const getPostsCommentsReplies = (postId, commentId, userId, page) => {
  return async (dispatch) => {
    dispatch({ type: GET_ADD_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, loader: { replyLoading: true } } });
    try {
      let { data: { replies } } = await axios.get(`/api/v1/comments/${ commentId }/replies?user=${userId}&page=${page}`);
      dispatch({ type: GET_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, commentId, replies } })
    } catch(error) {
      dispatch( {type: GET_ADD_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, loader: { replyLoading: false }, error: error.response.data.error || error.message }} )
    }
   }
 }

 export const addPostsCommentReply = (postId, commentId, body) => {
   return async (dispatch) => {
    dispatch({ type: GET_ADD_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, loader: { addingReply: true } } });
    try {
      let { data: { reply } } = await axios.post(`/api/v1/comments/${ commentId }/replies`, body);
      dispatch({ type: ADD_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, commentId, reply } })
    } catch(error) {
      dispatch( {type: GET_ADD_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, loader: { addingReply: false }, error: error.response.data.error || error.message }} )
    }
   }
 }
 export const likePostsCommentReply = ( postId, commentId, replyId ) => {
  return async (dispatch) => {
    try {
      let { data: { Liked, Like } } = await axios.post(`/api/v1/likes?type=reply&id=${replyId}`);
      dispatch({ type: LIKE_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, commentId, Liked, Like } })
    } catch(error) {
      dispatch({ type: LIKE_POSTS_COMMENT_REPLY_ERROR, payload: error.response.data.error || error.message})
    }
  }
}

export const editPostsCommentReply = ( postId, commentId, replyId, body ) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_DELETE_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, replyId, loader: { editingReply: true } }})
    try {
      let { data: { reply } } = await axios.patch(`/api/v1/replies/${replyId}`, body);
      dispatch({ type: EDIT_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, commentId, replyId, reply}})
    } catch(error) {
      dispatch({ type: EDIT_DELETE_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, replyId, loader: { editingReply: false }, error: error.response.data.error || error.message}})
    }
  }
}

export const deletePostsCommentReply = ( postId, commentId, replyId) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_DELETE_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, replyId, loader: { deletingReply: true } }})
    try {
      let { data: { reply} } = await axios.delete(`/api/v1/replies/${replyId}`);
      dispatch({ type: DELETE_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, reply }})
    } catch(error) {
      dispatch({ type: EDIT_DELETE_POSTS_REPLY_REQUEST_ERROR, payload: { postId, commentId, replyId, loader: { deletingReply: false }, error: error.response.data.error || error.message}})
    }
  }
}
//  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ==== POST ==== %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// ======== Get Post Start ============= //
export const getPost = ( postId, userId ) => {
  return async (dispatch) => {
     dispatch({ type: GET_POST_REQUEST });
     try{
       const { data } = await axios.get(`/api/v1/posts/${ postId }?user=${ userId }`);
       data.post = { ...data.post, showComments: true, singlePost: true, expand: false };
       dispatch({ type: GET_POST_SUCCESS, payload: data })
     } catch(error){
       dispatch({ type: GET_POST_ERROR, payload: error.response.data.error || error.message })
     }
  }
}
// =================== Get Post End ================= //

// =================== Edit Post End ================= //
export const editThePost = (postId, body) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Post Editing')
    try {
      const { data } = await axios.patch(`/api/v1/posts/${ postId }`, body);
      dispatch({ type: EDIT_POST_SUCCESS, payload: data})
      dispatch({ type: EDIT_POST_POSTS_SUCCESS, payload: { postId, post: data.post }})
      dispatch({ type: RESET_POST_INFO, payload: resetPostValue()})
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: EDIT_POST_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
// =================== Edit Post End ================= //

export const likeThePost = (postId) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/likes?type=post&id=${postId}`);
      dispatch({ type: LIKE_POST_SUCCESS, payload: data })
      dispatch({ type: LIKE_POST_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch( { type: LIKE_POST_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const deleteThePost = (postId) => {
  return async (dispatch) => {
    requestDispatch(dispatch, 'Deleting Post')
    try {
      const { data } = await axios.delete(`/api/v1/posts/${ postId }`);
      dispatch({ type: DELETE_POST_SUCCESS, payload: data})
      dispatch({ type: DELETE_POST_POSTS_SUCCESS, payload: { postId }})
    } catch (error) {
      requestDispatch(dispatch, null)
      dispatch({ type: DELETE_POST_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const getTheComments = (postId,userId,pageNumber) => {
  return async (dispatch) => {
    dispatch({ type: GET_ADD_POST_COMMENT_REQUEST, payload: { loader: { commentLoading: true }} })
    try {
      const { data } = await axios.get(`/api/v1/comments?type=post&id=${postId}&user=${userId}&page=${pageNumber}`);
      dispatch({ type: GET_THE_COMMENTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_THE_COMMENTS_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const addAComment = ( postId, body ) => {
  return async (dispatch) => {
    dispatch({ type: GET_ADD_POST_COMMENT_REQUEST, payload: { loader: { addingComment: true }} })
    try {
      const { data } = await axios.post(`/api/v1/comments?type=post&id=${postId}`, body);
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: data })
      dispatch({ type: ADD_COMMENT_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: ADD_COMMENT_ERROR, payload: error.response.data.error || error.message })
    }
  }
}

export const likeTheComment = ( postId, commentId ) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/v1/likes?type=comment&id=${commentId}`);
      data.post = postId;
      dispatch({ type: LIKE_THE_COMMENT_SUCCESS, payload: data })
      dispatch({ type: LIKE_COMMENT_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: LIKE_THE_COMMENT_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
export const editTheComment = ( commentId, body ) => {
    return async (dispatch) => {
      dispatch({ type: EDIT_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, actionName: 'editingComment', value: true } })
      try {
        let { data: { comment } } = await axios.patch(`/api/v1/comments/${ commentId }`, body);
        dispatch({ type: EDIT_THE_COMMENT_SUCCESS, payload: { commentId, comment }})
        dispatch({ type: EDIT_COMMENT_POSTS_SUCCESS, payload: { postId: comment.post, commentId, comment } })
      } catch(error) {
        dispatch({ type: EDIT_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, actionName: 'editingComment', value: false, error: error.response.data.error || error.message } })
      }
    }
}
export const deleteTheComment = ( commentId ) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, actionName: 'deletingComment', value: true } })
    try {
      let { data } = await axios.delete(`/api/v1/comments/${ commentId }`);
      dispatch({ type: DELETE_THE_COMMENT_SUCCESS, payload: data });
      dispatch({ type: DELETE_COMMENT_POSTS_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: EDIT_DELETE_COMMENT_REQUEST_ERROR, payload: { commentId, actionName: 'deletingComment', value: false, error: error.response.data.error || error.message}})
    }
  }
}
export const setPostData = (name,value) => {
  return (dispatch) => {
      dispatch({ type: SET_POST_DATA, payload: { name, value } })
    }
  }

export const setPostCommentData = (commentId, name, value) => {
  return (dispatch) => {
    dispatch({ type: SET_POST_COMMENT_DATA, payload: { commentId, name, value } })
  }
}


//########################################### REPLY ##################################### 
export const getPostCommentReplies = (commentId, userId, page) => {
   return async(dispatch) => {
     dispatch({ type: GET_ADD_POST_REPLY_REQUEST_ERROR, payload: { commentId, loader: { replyLoading: true } } })
     try {
      let { data: { replies } } = await axios.get(`/api/v1/comments/${ commentId }/replies?user=${userId}&page=${page}`);
      dispatch({ type: GET_POST_REPLY_SUCCESS, payload: { commentId, replies } })
    } catch(error) {
      dispatch({ type: GET_ADD_POST_REPLY_REQUEST_ERROR, payload: { commentId, loader: { replyLoading: false }, error: error.response.data.error || error.message }})
    }
   }
}
export const likePostCommentReplies = (postId, commentId, replyId) => {
   return async (dispatch) => {
    try {
      let { data: { Liked, Like } } = await axios.post(`/api/v1/likes?type=reply&id=${replyId}`);
      dispatch({ type: LIKE_POST_REPLY_SUCCESS, payload: { commentId, Liked, Like } })
      dispatch({ type: LIKE_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, commentId, Liked, Like } })
    } catch(error) {
      dispatch({ type: LIKE_POST_REPLY_ERROR, payload: error.response.data.error || error.message})
    }
  }
}
export const addPostReply = ( postId, commentId, body) => {
  return async (dispatch) => {
    dispatch({ type: GET_ADD_POST_REPLY_REQUEST_ERROR, payload: { commentId, loader: { addingReply: true } } })
    try {
      let { data, data: { reply } } = await axios.post(`/api/v1/comments/${ commentId }/replies`, body);
      dispatch({ type: ADD_POST_REPLY_SUCCESS, payload: data })
      dispatch({ type: ADD_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, commentId, reply } })
    } catch(error) {
      dispatch({ type: GET_ADD_POST_REPLY_REQUEST_ERROR, payload: { commentId, loader: { addingReply: false }, error: error.response.data.error || error.message }})
    }
  }
}
export const editPostCommentReplies = (postId, commentId, replyId, body) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_DELETE_POST_REPLY_REQUEST_ERROR, payload: { commentId, replyId, actionName:'editingReply', value: true } })
    try {
      let { data: { reply } } = await axios.patch(`/api/v1/replies/${replyId}`, body);
      dispatch({ type: EDIT_POST_REPLY_SUCCESS, payload: { commentId, replyId, reply }})
      dispatch({ type: EDIT_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, commentId, replyId, reply}})
    } catch(error) {
      dispatch({ type: EDIT_DELETE_POST_REPLY_REQUEST_ERROR, payload: { commentId, replyId, actionName:'editingReply', value: false, error: error.response.data.error || error.message }})
    }
  }
}

export const deletePostReply = (postId,commentId,replyId) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_DELETE_POST_REPLY_REQUEST_ERROR, payload: { commentId, replyId, actionName:'deletingReply', value: true } })
    try {
      let { data, data: { reply } } = await axios.delete(`/api/v1/replies/${ replyId }`);
      dispatch({ type: DELETE_POST_REPLY_SUCCESS , payload: data })
      dispatch({ type: DELETE_POSTS_COMMENT_REPLY_SUCCESS, payload: { postId, reply }})
    } catch(error) {
      dispatch({ type: EDIT_DELETE_POST_REPLY_REQUEST_ERROR, payload: { commentId, actionName:'deletingReply', value: false, replyId, error: error.response.data.error || error.message }})
    }
  }
}

