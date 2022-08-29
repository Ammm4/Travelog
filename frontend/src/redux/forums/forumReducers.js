import { commonAddReply, commonGetReplies, commonLikeBlog, commonLikeComment, commonLikeReply, commonReplyDeleteSuccess, commonReplyEditandDelete, commonReplyFetchAndAdd, postCommentEditandDelete } from "../../utils";
import { 
  GET_FORUMS_REQUEST, 
  GET_FORUMS_SUCCESS, 
  GET_FORUMS_ERROR,
  SET_NUMBER_OF_COMMENTS,
  SET_FORUM_VIEWS,
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
  UPDATE_THE_FORUM_SUCCESS,
  UPDATE_THE_FORUM_ERROR,
  DELETE_THE_FORUM_SUCCESS,
  DELETE_THE_FORUM_ERROR,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_ERROR,
  UPDATE_COMMENT_SUCCESS,
  GET_REPLIES_SUCCESS,
  CREATE_REPLY_SUCCESS,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_ERROR,
  UPDATE_REPLY_SUCCESS,
  DELETE_REPLY_SUCCESS,
  RESET_FORUMS_SUCCESS,
  CLEAR_FORUMS_ERRORS,
  CLEAR_FORUM_ERRORS,
  RESET_FORUMS,
  FORUM_RESET,
  SET_COMMENT_BODY,
  SET_COMMENT_DATA,
  UPDATE_DELETE_REPLY_REQUEST_ERR0R,
  GET_CREATE_REPLY_REQUEST_ERROR,
  UPDATE_DELETE_COMMENT_REQUEST_ERROR,
  GET_CREATE_COMMENT_REQUEST,
} from "./forumTypes";

export const forumsReducer = (state = { forums: [] }, action) => {  
    switch(action.type) {
     case GET_FORUMS_REQUEST:
       return {
         ...state,
         loading: true,    
      }
     case LIKE_FORUM_SUCCESS:
       let likedForums = state.forums.map(forum => {
         if(forum._id === action.payload.Like.forum) {
          return commonLikeBlog(forum, action.payload)    
         }
         return forum
       })
       return { ...state, forums: likedForums } 
     case CREATE_FORUM_SUCCESS:
       return {
        ...state,
        forums: [ action.payload.forum, ...state.forums ],
        success: action.payload.msg       
      }
     case UPDATE_FORUM_SUCCESS:
       let updatedForums = state.forums.map(forum => {
         if(forum._id === action.payload.forum._id){
           return { ...forum, body: action.payload.forum.body, title: action.payload.forum.title  }
         }
         return forum
       })
       return {
        ...state,
        forums: updatedForums,
        success: action.payload.msg      
      }
     case DELETE_FORUM_SUCCESS:
       let newForums = state.forums.map(forum => {
         if(forum._id === action.payload.forum._id){
           return { ...forum, deleted: true }
         }
         return forum
       })
       return {
        ...state,
        forums: newForums,
        success: action.payload.msg      
      }
     case GET_FORUMS_SUCCESS:
       let newRequestedForums = [...state.forums, ...action.payload.forums.filter(forum => !state.forums.some(item => item._id === forum._id))]
       return {
         ...state,
         loading: false,
         hasMoreForums: newRequestedForums.length < action.payload.count,
         forums: newRequestedForums,
       }
     case SET_NUMBER_OF_COMMENTS:
       let commentedForums = state.forums.map(forum => {
         if(forum._id === action.payload.id) {
           if(action.payload.commentAdded) return { ...forum, numComments: forum.numComments + 1 }
            return { ...forum, numComments: forum.numComments - 1 }
         } 
         return forum
       })
      return {
        ...state,
        forums: commentedForums
      } 
     case SET_FORUM_VIEWS:
       let viewedForums = state.forums.map(forum => {
         if(forum._id === action.payload) {
            return { ...forum, views: forum.views + 1 }
         } 
         return forum
       })
      return {
        ...state,
        forums: viewedForums
      } 
     case GET_FORUMS_ERROR:
     case CREATE_FORUM_ERROR:
     case UPDATE_FORUM_ERROR:
     case DELETE_FORUM_ERROR:
       return {
         ...state,
         loading: false,
         error: action.payload,  
       }
    case RESET_FORUMS:
      return {
        forums: []
      }
    case RESET_FORUMS_SUCCESS:
      return {
        ...state,
        success: false,
      }; 
     case CLEAR_FORUMS_ERRORS:
       return {
         ...state,
         error: null
      }
     default:
       return state;
     } 
}

export const forumReducer = (state = { forum: {} }, action) => {  
    switch(action.type) {
     //================== FORUM ====================//
     case GET_SINGLE_FORUM_REQUEST:
       return {
         ...state,
         loading: true,    
       }
     case GET_SINGLE_FORUM_SUCCESS:
      return {
        ...state,
        loading: false,
        forum: action.payload.forum
      }
     case UPDATE_THE_FORUM_SUCCESS:
       return {
         ...state,
         forum: {...state.forum, body: action.payload.forum.body, title: action.payload.forum.title }
       }
     case LIKE_THE_FORUM_SUCCESS:
       state.forum = commonLikeBlog(state.forum, action.payload)
      return { ...state } 
     case DELETE_THE_FORUM_SUCCESS:
       return { ...state, forum: {...state.forum, deleted: true } }
     //================== FORUM ENDS ====================//
     //================== COMMENTS ======================//
      case GET_CREATE_COMMENT_REQUEST:
       return { ...state, ...action.payload.loader }
     case GET_COMMENTS_SUCCESS:
       if(!state.forum.comments) return state
       let newGetComments = action.payload.filter(comment => !state.forum.comments.some(item => item._id === comment._id))
       return {
         ...state,
         commentLoading: false,
         forum: { ...state.forum, comments: [ ...state.forum.comments, ...newGetComments ] }
       }
     case CREATE_COMMENT_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.numComments++;
       state.forum.comments = [action.payload, ...state.forum.comments];
       state.forum.commentBody = '';
       return { ...state, addingComment: false }
     case LIKE_COMMENT_SUCCESS:
      if(!state.forum.comments) return state
      state.forum.comments = commonLikeComment(state.forum.comments, action.payload)
      return { ...state }
     case UPDATE_COMMENT_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.comments = postCommentEditandDelete(state.forum.comments, action.payload, { updatingComment: false, body: action.payload.comment.body })
       return { ...state }
     case DELETE_COMMENT_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.numComments--;
       state.forum.comments = state.forum.comments.filter(comment => comment._id !== action.payload.comment._id)
       return { ...state }
     case SET_COMMENT_BODY:
       return { ...state, forum: { ...state.forum, commentBody: action.payload } }
     case SET_COMMENT_DATA:
       if(!state.forum.comments) return state
       state.forum.comments = postCommentEditandDelete(state.forum.comments, action.payload, { [action.payload.name]: action.payload.value })
       return { ...state }
     //================== COMMENTS ENDS ======================//
     
     // ====================== REPLY ========================= //
     case GET_REPLIES_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.comments = commonGetReplies(state.forum.comments, action.payload)
       return { ...state }
     case CREATE_REPLY_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.comments = commonAddReply(state.forum.comments,action.payload)
       return { ...state }
     case LIKE_REPLY_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.comments = commonLikeReply(state.forum.comments, action.payload)
       return { ...state }
     case UPDATE_REPLY_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.comments = commonReplyEditandDelete(state.forum.comments, action.payload, { updatingReply: false, body: action.payload.reply.body })
       return { ...state }
     case DELETE_REPLY_SUCCESS:
       if(!state.forum.comments) return state
       state.forum.comments = commonReplyDeleteSuccess(state.forum.comments, action.payload)
       return { ...state }
  
     case UPDATE_DELETE_COMMENT_REQUEST_ERROR:
       if(!state.forum.comments) return state
       state.forum.comments = postCommentEditandDelete(state.forum.comments, action.payload, { ...action.payload.loader })
       if(action.payload.error) return { ...state, error: action.payload.error }
       return { ...state }
     case UPDATE_DELETE_REPLY_REQUEST_ERR0R:
      if(!state.forum.comments) return state
      state.forum.comments = commonReplyEditandDelete(state.forum.comments, action.payload, { ...action.payload.loader })
      if(action.payload.error) return { ...state, error: action.payload.error }
      return { ...state }
     case GET_CREATE_REPLY_REQUEST_ERROR:
      if(!state.forum.comments) return state
      state.forum.comments = commonReplyFetchAndAdd(state.forum.comments, action.payload, { ...action.payload.loader })
      if(action.payload.error) return { ...state, error: action.payload.error }
      return { ...state }
     case GET_SINGLE_FORUM_ERROR:
     case UPDATE_THE_FORUM_ERROR:
     case DELETE_THE_FORUM_ERROR:
     case GET_COMMENTS_ERROR:
     case LIKE_FORUM_ERROR:
     case CREATE_COMMENT_ERROR:
     case LIKE_COMMENT_ERROR:
     case LIKE_REPLY_ERROR:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         addingComment: false,
         error:action.payload    
       }
     case CLEAR_FORUM_ERRORS: 
       return { ...state, error: null }
     case FORUM_RESET: 
      return { forum: {} }
     default:
       return state;
     } 
}
