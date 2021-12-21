import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_ERROR
  

} from "./postTypes";

import axios from 'axios';

// ================================ Get Posts Action Start ============================== //
const getPostsRequest = () => {
  return {
    type: GET_POSTS_REQUEST
  }
} 

const getPostsSuccess = ( posts ) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: posts
  }
} 

const getPostsError = ( error ) => {
  return {
    type: GET_POSTS_ERROR,
    payload: error
  }
} 

export const getPosts = () => {
  return (dispatch) => {
     dispatch(getPostsRequest());
     axios.get('/api/v1/posts')
     .then(response => dispatch(getPostsSuccess(response.data.posts)))
     .catch(error => dispatch(getPostsError(error.message)))
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
       dispatch(getSinglePostSuccess(response.data.post))})
     .catch(error => dispatch(getSinglePostError(error.message)))
  }
}
// ================================ Get Single Post Action End ====================== //

// ================================ Like The Post Action Start ====================== //
export const likeThePost = (postId) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.put(`/api/v1/posts/${postId}/like_post`);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Like The Post Action End ====================== //

// ================================ Comment The Post Action Start ====================== //
export const addCommentPost = ( postId, body ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.put(`/api/v1/posts/${postId}/comment_post`, body);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}

// ================================ Comment The Post Action End ====================== //


// ================================ Like The Comment Action Start ====================== //
  export const likePostComment = ( postId, commentId ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.put(`/api/v1/posts/${postId}/comments/${commentId}/like_comment`);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Like The Comment Action End ====================== //

// ================================ Like The Comment Action Start ====================== //
  export const replyPostComment = ( postId, commentId, body ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.put(`/api/v1/posts/${ postId }/comments/${ commentId }/reply_comment`, body);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Like The Comment Action End ====================== //

// ================================ Like The Comment Action Start ====================== //
  export const likeReply = ( postId, commentId, replyId ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.put(`/api/v1/posts/${ postId }/comments/${ commentId }/replies/${ replyId}/like_comment_reply`);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Like The Comment Action End ====================== //

// ================================ Delete The Comment Action Start ====================== //
  export const deleteComment = ( postId, commentId ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.delete(`/api/v1/posts/${ postId }/comments/${ commentId }/delete_comment`);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Delete The Comment Action End ====================== //

// ================================ Delete The Reply Action Start ====================== //
  export const deleteReply = ( postId, commentId, replyId ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.delete(`/api/v1/posts/${ postId }/comments/${ commentId }/replies/${replyId}/delete_comment_reply`);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Delete The Reply Action End ====================== //

// ================================ Edit The Comment Action Start ====================== //
  export const editComment = ( postId, commentId, body ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.patch(`/api/v1/posts/${ postId }/comments/${ commentId }/edit_comment`, body);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Edit The Comment Action End ====================== //

// ================================ Edit The Reply Action Start ====================== //
  export const editReply = ( postId, commentId, replyId, body ) => {
  return async (dispatch) => {
    dispatch(getPostsRequest())
    try {
      await axios.patch(`/api/v1/posts/${ postId }/comments/${ commentId }/replies/${replyId}/edit_comment_reply`, body);
      let { data } = await axios.get('/api/v1/posts');
      dispatch(getPostsSuccess(data.posts))
    } catch(error) {
      dispatch(getPostsError(error.message))
    }
  }
}
// ================================ Edit The Reply Action End ====================== //