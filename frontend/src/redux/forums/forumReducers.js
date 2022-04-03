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
  NEW_FORUM_RESET,
  SINGLE_FORUM_RESET
  
} from "./forumTypes";

export const forumsReducer = (state = { forums: [] }, action) => {  
    switch(action.type) {
     case GET_FORUMS_REQUEST:
       return {
         ...state,
         loading: true,    
      }
     case CREATE_FORUM_REQUEST:
     case UPDATE_FORUM_REQUEST:
     case DELETE_FORUM_REQUEST:
       return {
         ...state,
         forumLoading: true
       }
     case CREATE_FORUM_SUCCESS:
     case UPDATE_FORUM_SUCCESS:
     case DELETE_FORUM_SUCCESS:
       return {
        ...state,
        forumLoading: false,
        forums: action.payload.forums,
        success: action.payload.message       
      }
     case GET_FORUMS_SUCCESS:
       return {
         ...state,
         loading: false,
         forums: action.payload.forums,
       }
     case GET_FORUMS_ERROR:
     case CREATE_FORUM_ERROR:
     case UPDATE_FORUM_ERROR:
     case DELETE_FORUM_ERROR:
       return {
         ...state,
         loading: false,
         forumLoading: false,
         error: action.payload,  
       }
    case NEW_FORUM_RESET:
      return {
        ...state,
        success: false,
    }; 
     case CLEAR_FORUM_ERRORS:
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
     case GET_SINGLE_FORUM_REQUEST:
       return {
         ...state,
         loading: true,    
       }

     case CREATE_COMMENT_REQUEST:
     case DELETE_COMMENT_REQUEST:
     case LIKE_COMMENT_REQUEST:
     case UPDATE_COMMENT_REQUEST:
       return {
         ...state,
         commentLoading: true
       }
     case CREATE_REPLY_REQUEST:
     case LIKE_REPLY_REQUEST:
     case UPDATE_REPLY_REQUEST:
     case DELETE_REPLY_REQUEST:
       return {
         ...state,
         replyLoading: true
       }
     case GET_SINGLE_FORUM_SUCCESS:
     case LIKE_FORUM_SUCCESS:
     case CREATE_COMMENT_SUCCESS:
     case DELETE_COMMENT_SUCCESS:
     case LIKE_COMMENT_SUCCESS:
     case UPDATE_COMMENT_SUCCESS:
     case CREATE_REPLY_SUCCESS:
     case LIKE_REPLY_SUCCESS:
     case UPDATE_REPLY_SUCCESS:
     case DELETE_REPLY_SUCCESS:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         replyLoading: false,
         forum: action.payload.forum
       }

     case GET_SINGLE_FORUM_ERROR:
     case LIKE_FORUM_ERROR:
     case CREATE_COMMENT_ERROR:
     case DELETE_COMMENT_ERROR:
     case LIKE_COMMENT_ERROR:
     case UPDATE_COMMENT_ERROR:
     case CREATE_REPLY_ERROR:
     case LIKE_REPLY_ERROR:
     case UPDATE_REPLY_ERROR:
     case DELETE_REPLY_ERROR:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         replyLoading: false,
         error:action.payload    
       }
     case CLEAR_FORUM_ERRORS: 
       return {
         ...state,
         error: null
       }
     case SINGLE_FORUM_RESET: 
     return {
       singlepost: {}
     }
     default:
       return state;
     } 
}
