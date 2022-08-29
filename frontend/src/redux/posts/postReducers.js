
import { commonAddReply, commonGetReplies, commonLikeBlog, commonLikeComment, commonLikeReply, commonReplyDeleteSuccess, commonReplyEditandDelete, commonReplyFetchAndAdd, postCommentEditandDelete, postsCommentEditandDelete, postsCommentFetchandAdd, postsCommentReplyEditandDelete, postsCommentReplyFetchandAdd } from "../../utils";
import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_ERROR,
  LIKE_POST_POSTS_SUCCESS,
  LIKE_POST_POSTS_ERROR,
  GET_COMMENTS_POSTS_SUCCESS,
  EDIT_POST_POSTS_SUCCESS,
  EDIT_POST_POSTS_ERROR,
  DELETE_POST_POSTS_SUCCESS,
  DELETE_POST_POSTS_ERROR,
  ADD_COMMENT_POSTS_SUCCESS,
  DELETE_COMMENT_POSTS_SUCCESS,
  LIKE_COMMENT_POSTS_SUCCESS,
  LIKE_COMMENT_POSTS_ERROR,
  EDIT_COMMENT_POSTS_SUCCESS,
  SET_POST_VIEWS,
  
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  GET_THE_COMMENTS_SUCCESS,
  GET_THE_COMMENTS_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  LIKE_THE_COMMENT_SUCCESS,
  LIKE_THE_COMMENT_ERROR,
  EDIT_THE_COMMENT_SUCCESS,
  DELETE_THE_COMMENT_SUCCESS,
  CLEAR_POSTS_ERRORS,
  RESET_POSTS_SUCCESS,
  CLEAR_POST_ERRORS,
  RESET_POSTS,
  
  SINGLE_POST_RESET,
  SET_POSTS_COMMENT_DATA,
  GET_POSTS_COMMENT_REPLY_SUCCESS,
  ADD_POSTS_COMMENT_REPLY_SUCCESS,
  LIKE_POSTS_COMMENT_REPLY_SUCCESS,
  LIKE_POSTS_COMMENT_REPLY_ERROR,
  EDIT_POSTS_COMMENT_REPLY_SUCCESS,
  DELETE_POSTS_COMMENT_REPLY_SUCCESS,
  SET_POSTS_POST_DATA,
  SET_POST_DATA,
  SET_POST_COMMENT_DATA,
  GET_POST_REPLY_SUCCESS,
  EDIT_POST_REPLY_SUCCESS,
  LIKE_POST_REPLY_SUCCESS,
  LIKE_POST_REPLY_ERROR,
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

export const postsReducer = (state = { posts: [] }, action) => {  
    switch(action.type) {
     case GET_POSTS_REQUEST:
       return {
         ...state,
         loading: true,    
      }
    case GET_POSTS_SUCCESS:
      let newPosts = [...state.posts, ...action.payload.posts.filter(post => !state.posts.some(item => item._id === post._id))]
       return {
         ...state,
         loading: false,
         hasMorePosts: newPosts.length < action.payload.postCount,
         posts: newPosts,
     }
     case ADD_NEW_POST_SUCCESS:
       return {
        ...state,
        postLoading: false,
        posts: [ action.payload.post, ...state.posts ],
        success: action.payload.message       
      }
     case LIKE_POST_POSTS_SUCCESS:
       const { Like } = action.payload;
       state.posts = state.posts.map(post => {
         if(post._id === Like.post) {
           let editedPost = commonLikeBlog(post, action.payload);
           return editedPost
         }
         return post
       })
       return { ...state }
     case EDIT_POST_POSTS_SUCCESS:
      const editedPostData = {
        images: action.payload.post.images,
        travellerInfo: action.payload.post.travellerInfo,
        destinationInfo: action.payload.post.destinationInfo,
        recommendations: action.payload.post.recommendations
      }
      state.posts = postsCommentFetchandAdd(state.posts, action.payload, editedPostData)
      return { ...state, success:'Post Edited'}
     case DELETE_POST_POSTS_SUCCESS:
       state.posts = postsCommentFetchandAdd(state.posts, action.payload, { deleted: true })
       return { ...state,  success:'Post Deleted' }
     case SET_POST_VIEWS:
       state.posts = state.posts.map(post => {
         if(post._id === action.payload.postId) {
           return {
              ...post,
              views: post.views + 1
            }
         }
         return post
       })
       return {
         ...state,
       }
     case ADD_COMMENT_POSTS_SUCCESS:
       const { comment } = action.payload;
       state.posts = state.posts.map(post => {
         if(post._id === comment.post) {
            return {
              ...post,
              addingComment: false,
              commentBody: '',
              numComments : post.numComments + 1,
              comments: [comment, ...post.comments]
            }
         }
         return post
       })
       return { ...state }
     case GET_COMMENTS_POSTS_SUCCESS:
       const { comments } = action.payload;
       state.posts = state.posts.map(post => {
         if(post._id === action.payload.post) {
           return { ...post, commentsLoading: false , comments: [...post.comments, ...comments.filter(comment => !post.comments.some(item => item._id === comment._id))] }
         }
       return post
        })
       return {
         ...state
       }
     case EDIT_COMMENT_POSTS_SUCCESS:
      state.posts = postsCommentEditandDelete(state.posts, action.payload, { editingComment: false, body: action.payload.comment.body })
      return { ...state }
    case LIKE_COMMENT_POSTS_SUCCESS:
      state.posts = state.posts.map(post => {
       if(post._id === action.payload.post) {
         let newComments = commonLikeComment(post.comments, action.payload)
         return {...post, comments: newComments}
       }
         return post
      })
     return { ...state }
    case DELETE_COMMENT_POSTS_SUCCESS:
      state.posts = state.posts.map(post => {
       if(post._id === action.payload.comment.post) {
         let newComments = post.comments.filter(comment => comment._id !== action.payload.comment._id)
         return { ...post, numComments: post.numComments - 1, comments: newComments }
       }
         return post
      })
      return { ...state }
    case SET_POSTS_POST_DATA:
      state.posts = postsCommentFetchandAdd(state.posts, action.payload, { [action.payload.name]: action.payload.value })
     return { ...state }
    case SET_POSTS_COMMENT_DATA:
      state.posts = postsCommentReplyFetchandAdd(state.posts, action.payload, { [action.payload.name]: action.payload.value })
      return { ...state }
    case GET_POSTS_COMMENT_REPLY_SUCCESS:
      state.posts = state.posts.map(post => {
        if(post._id === action.payload.postId) {
           let newComments = commonGetReplies(post.comments, action.payload)
            return { ...post, comments: newComments }
        }
       return post
      })
      return { ...state }
    case ADD_POSTS_COMMENT_REPLY_SUCCESS:
       state.posts = state.posts.map(post => {
        if(post._id === action.payload.postId) {
           let newComments = commonAddReply(post.comments,action.payload);
            return { ...post, comments: newComments }
        }
       return post
      })
      return { ...state }
    
    case LIKE_POSTS_COMMENT_REPLY_SUCCESS:
       state.posts = state.posts.map(post => {
        if(post._id === action.payload.postId) {
           let newComments = commonLikeReply(post.comments,action.payload)
            return { ...post, comments: newComments }
        }
       return post
      })
      return { ...state }
    case EDIT_POSTS_COMMENT_REPLY_SUCCESS:
      state.posts = postsCommentReplyEditandDelete(state.posts, action.payload, { editingReply: false, body: action.payload.reply.body })
      return {
        ...state
       }
    case DELETE_POSTS_COMMENT_REPLY_SUCCESS:
      state.posts = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          let newComments = commonReplyDeleteSuccess(post.comments,action.payload)
          return { ...post, comments: newComments }
        }
        return post
      })
       return {
        ...state
       }
    case GET_POSTS_ERROR:
     case ADD_NEW_POST_ERROR:
     case EDIT_POST_POSTS_ERROR:
     case LIKE_POST_POSTS_ERROR:
     case DELETE_POST_POSTS_ERROR:
     case LIKE_COMMENT_POSTS_ERROR:
     case LIKE_POSTS_COMMENT_REPLY_ERROR:
       return {
         ...state,
         loading: false,
         error:action.payload,  
       }
    case GET_ADD_POSTS_COMMENT_REQUEST_ERROR:
      state.posts = postsCommentFetchandAdd(state.posts, action.payload, { ...action.payload.loader });
      if(action.payload.error) return { ...state, error: action.payload.error }
       return { ...state }
    case EDIT_DELETE_POSTS_COMMENT_REQUEST_ERROR:
      state.posts = postsCommentEditandDelete(state.posts, action.payload, { ...action.payload.loader })
      if(action.payload.error) return { ...state, error: action.payload.error }
      return { ...state }
    case GET_ADD_POSTS_REPLY_REQUEST_ERROR:
      state.posts = postsCommentReplyFetchandAdd(state.posts, action.payload, { ...action.payload.loader })
      if(action.payload.error) return { ...state, error: action.payload.error }
      return { ...state }
    case EDIT_DELETE_POSTS_REPLY_REQUEST_ERROR:
      state.posts = postsCommentReplyEditandDelete(state.posts, action.payload, { ...action.payload.loader })
      if(action.payload.error) return { ...state,  error: action.payload.error }
      return { ...state }
    case RESET_POSTS_SUCCESS:
      return {
        ...state,
        success: false,
     }
     case CLEAR_POSTS_ERRORS:
       return {
         ...state,
         error: null
      }
    case RESET_POSTS:
     return { posts: [] }
     default:
       return state;
     } 
}

export const postReducer = (state = { post: {} }, action) => {  
    switch(action.type) {
     case GET_POST_REQUEST:
       return {
         ...state,
         loading: true,    
       }
     case GET_ADD_POST_COMMENT_REQUEST:
      return { ...state, ...action.payload.loader }
     case EDIT_POST_SUCCESS:
        state.post = {
              ...state.post, 
             images: action.payload.post.images,
             travellerInfo: action.payload.post.travellerInfo,
             destinationInfo: action.payload.post.destinationInfo,
             recommendations: action.payload.post.recommendations
        }
       return { ...state }
     case LIKE_POST_SUCCESS: 
       state.post = commonLikeBlog( state.post, action.payload )
       return { ...state }
     case DELETE_POST_SUCCESS:
       return { ...state, post: { ...state.post, deleted: true } }
     case GET_POST_SUCCESS:
       return {
         ...state,
         loading: false,
         post: action.payload.post
       }
     case GET_THE_COMMENTS_SUCCESS: 
       if(!state.post.comments) return state
       let newGetComments = action.payload.comments.filter(comment => !state.post.comments.some(item => item._id === comment._id))
       return{
         ...state,
         commentLoading: false,
         post: { ...state.post, comments: [...state.post.comments, ...newGetComments] }
       }
     case ADD_COMMENT_SUCCESS:
      if(!state.post.comments) return state
       return {
         ...state, addingComment: false,  post: { ...state.post, commentBody: '', numComments: state.post.numComments + 1, comments: [action.payload.comment, ...state.post.comments] }
       }
     case LIKE_THE_COMMENT_SUCCESS:
      if(!state.post.comments) return state
       state.post.comments = commonLikeComment(state.post.comments, action.payload)
       return { ...state }
     case EDIT_THE_COMMENT_SUCCESS:
      if(!state.post.comments) return state
      state.post.comments = postCommentEditandDelete(state.post.comments, action.payload, { editingComment: false, body: action.payload.comment.body });
      return {...state }
     case DELETE_THE_COMMENT_SUCCESS:
      if(!state.post.comments) return state
       let Comments = state.post.comments.filter(comment => comment._id !== action.payload.comment._id)
       return { ...state, post: {...state.post, numComments: state.post.numComments - 1, comments: Comments } }

    case GET_POST_REPLY_SUCCESS:
      if(!state.post.comments) return state
      state.post.comments = commonGetReplies(state.post.comments, action.payload)
      return { ...state }
    case LIKE_POST_REPLY_SUCCESS:
      if(!state.post.comments) return state
      state.post.comments = commonLikeReply(state.post.comments, action.payload)
      return { ...state }
    case ADD_POST_REPLY_SUCCESS:
      if(!state.post.comments) return state
      state.post.comments = commonAddReply(state.post.comments,action.payload)
      return { ...state }
    case EDIT_POST_REPLY_SUCCESS:
      if(!state.post.comments) return state
      state.post.comments = commonReplyEditandDelete(state.post.comments, action.payload, { editingReply: false, body: action.payload.reply.body })
      return { ...state }
    case DELETE_POST_REPLY_SUCCESS:
       if(!state.post.comments) return state
       state.post.comments = commonReplyDeleteSuccess(state.post.comments, action.payload)
       return { ...state }
    case EDIT_DELETE_COMMENT_REQUEST_ERROR:
      if(!state.post.comments) return state
       state.post.comments = postCommentEditandDelete(state.post.comments, action.payload, { [action.payload.actionName]: action.payload.value });
       if(action.payload.error) return { ...state, error: action.payload.error }
       return state
    case GET_ADD_POST_REPLY_REQUEST_ERROR:
      if(!state.post.comments) return state
      state.post.comments = commonReplyFetchAndAdd(state.post.comments, action.payload, { ...action.payload.loader })
      if(action.payload.error) return { ...state, error: action.payload.error }
      return state 
    case EDIT_DELETE_POST_REPLY_REQUEST_ERROR:
      if(!state.post.comments) return state
      state.post.comments = commonReplyEditandDelete(state.post.comments, action.payload, { [action.payload.actionName]: action.payload.value })
      if(action.payload.error) return { ...state, error: action.payload.error }
      return { ...state }
    case GET_POST_ERROR:
     case EDIT_POST_ERROR:
     case LIKE_POST_ERROR:
     case DELETE_POST_ERROR:
     case GET_THE_COMMENTS_ERROR:
     case ADD_COMMENT_ERROR:
     case LIKE_THE_COMMENT_ERROR:
     case LIKE_POST_REPLY_ERROR:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         addingComment: false,
         error: action.payload    
       }
    case SET_POST_DATA:
      return { ...state, post: { ...state.post, [action.payload.name]: action.payload.value} }
    case SET_POST_COMMENT_DATA:
      state.post.comments = postCommentEditandDelete(state.post.comments, action.payload, { [action.payload.name]: action.payload.value })
      return { ...state }
    case SINGLE_POST_RESET: 
     return {
       post: {}
     }
     case CLEAR_POST_ERRORS: 
       return {
         ...state,
         error: null
       }
     default:
       return state;
     } 
}

