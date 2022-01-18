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

  NEW_POST_RESET,
  CLEAR_POST_ERRORS,
  SINGLE_POST_RESET
} from "./postTypes";


export const postReducer = (state = { posts: [] }, action) => {  
    switch(action.type) {
     case GET_POSTS_REQUEST:
       return {
         ...state,
         loading: true,    
      }
     case ADD_NEW_POST_REQUEST:
     case EDIT_POST_REQUEST:
     case DELETE_POST_REQUEST:
       return {
         ...state,
         postLoading: true
       }
     case ADD_NEW_POST_SUCCESS:
     case EDIT_POST_SUCCESS:
     case DELETE_POST_SUCCESS:
       return {
        ...state,
        postLoading: false,
        posts: action.payload.posts,
        success: action.payload.message       
      }
     case GET_POSTS_SUCCESS:
       return {
         ...state,
         loading: false,
         posts: action.payload.posts,
       }
     case GET_POSTS_ERROR:
     case ADD_NEW_POST_ERROR:
     case EDIT_POST_ERROR:
     case DELETE_POST_ERROR:
       return {
         ...state,
         loading: false,
         postLoading: false,
         error:action.payload,  
       }
    case NEW_POST_RESET:
      return {
        ...state,
        success: false,
    }; 
     case CLEAR_POST_ERRORS:
       return {
         ...state,
         error: null
      }
     default:
       return state;
     } 
}

export const singlePostReducer = (state = { singlepost: {} }, action) => {  
    switch(action.type) {
     case GET_SINGLE_POST_REQUEST:
     case LIKE_POST_REQUEST:
       return {
         ...state,
         loading: true,    
       }

     case ADD_COMMENT_REQUEST:
     case DELETE_COMMENT_REQUEST:
     case LIKE_COMMENT_REQUEST:
     case EDIT_COMMENT_REQUEST:
       return {
         ...state,
         commentLoading: true
       }
     case ADD_REPLY_REQUEST:
     case LIKE_REPLY_REQUEST:
     case EDIT_REPLY_REQUEST:
     case DELETE_REPLY_REQUEST:
       return {
         ...state,
         replyLoading: true
       }
     case GET_SINGLE_POST_SUCCESS:
     case LIKE_POST_SUCCESS:
     case ADD_COMMENT_SUCCESS:
     case DELETE_COMMENT_SUCCESS:
     case LIKE_COMMENT_SUCCESS:
     case EDIT_COMMENT_SUCCESS:
     case ADD_REPLY_SUCCESS:
     case LIKE_REPLY_SUCCESS:
     case EDIT_REPLY_SUCCESS:
     case DELETE_REPLY_SUCCESS:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         replyLoading: false,
         singlepost: action.payload.post
       }

     case GET_SINGLE_POST_ERROR:
     case LIKE_POST_ERROR:
     case ADD_COMMENT_ERROR:
     case DELETE_COMMENT_ERROR:
     case LIKE_COMMENT_ERROR:
     case EDIT_COMMENT_ERROR:
     case ADD_REPLY_ERROR:
     case LIKE_REPLY_ERROR:
     case EDIT_REPLY_ERROR:
     case DELETE_REPLY_ERROR:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         replyLoading: false,
         error:action.payload    
       }
     case CLEAR_POST_ERRORS: 
       return {
         ...state,
         error: null
       }
     case SINGLE_POST_RESET: 
     return {
       singlepost: {}
     }
     default:
       return state;
     } 
}

