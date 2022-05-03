
import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR,
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_ERROR,
  LIKE_POST_POSTS_SUCCESS,
  LIKE_POST_POSTS_ERROR,
  GET_COMMENTS_POSTS_REQUEST,
  GET_COMMENTS_POSTS_SUCCESS,
  GET_COMMENTS_POSTS_ERROR,
  EDIT_POST_POSTS_REQUEST,
  EDIT_POST_POSTS_SUCCESS,
  EDIT_POST_POSTS_ERROR,
  DELETE_POST_POSTS_REQUEST,
  DELETE_POST_POSTS_SUCCESS,
  DELETE_POST_POSTS_ERROR,
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
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  GET_THE_COMMENTS_REQUEST,
  GET_THE_COMMENTS_SUCCESS,
  GET_THE_COMMENTS_ERROR,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  LIKE_THE_COMMENT_REQUEST,
  LIKE_THE_COMMENT_SUCCESS,
  LIKE_THE_COMMENT_ERROR,
  EDIT_THE_COMMENT_REQUEST,
  EDIT_THE_COMMENT_SUCCESS,
  EDIT_THE_COMMENT_ERROR,
  DELETE_THE_COMMENT_REQUEST,
  DELETE_THE_COMMENT_SUCCESS,
  DELETE_THE_COMMENT_ERROR,
  SHOW_THE_COMMENTS,


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


export const postsReducer = (state = { posts: [] }, action) => {  
    switch(action.type) {
     case GET_POSTS_REQUEST:
       return {
         ...state,
         loading: true,    
      }
    case GET_POSTS_SUCCESS:
       return {
         ...state,
         loading: false,
         posts: action.payload.posts,
     }
     case ADD_NEW_POST_REQUEST:
       return {
         ...state,
         postLoading: true
       }
     case ADD_NEW_POST_SUCCESS:
       return {
        ...state,
        postLoading: false,
        posts: [action.payload.post, ...state.posts],
        success: action.payload.message       
      }
     case LIKE_POST_POSTS_SUCCESS:
       const { Like, Liked } = action.payload;
       state.posts = state.posts.map(post => {
         if(post._id === Like.post) {
           let NumLikes = Liked ? post.numLikes + 1 : post.numLikes - 1;
           return {
              ...post,
              isLiked: Liked,
              numLikes: NumLikes
            }
         }
         return post
       })
       return {
         ...state
       }
     case EDIT_POST_POSTS_SUCCESS:
       state.posts = state.posts.map(post => {
         if(post._id === action.payload.post._id) {
           return {
             ...post,
             images: action.payload.post.images,
             travellerInfo: action.payload.post.travellerInfo,
             destinationInfo: action.payload.post.destinationInfo,
             recommendations: action.payload.post.recommendations
           }
         }
         return post
       }) 
       return { ...state }
     case DELETE_POST_POSTS_SUCCESS:
       state.posts = state.posts.map(post => {
         if(post._id === action.payload.post._id){
           return { ...post, deleted: true }
         }
         return post
       })
       return { ...state }
     case ADD_COMMENT_POSTS_SUCCESS:
       const { comment } = action.payload;
       state.posts = state.posts.map(post => {
         if(post._id === comment.post) {
            return {
              ...post,
              numComments : post.numComments + 1,
              comments: [comment, ...post.comments]
            }
         }
         return post
       })
       return {
         ...state
       }
     case GET_COMMENTS_POSTS_SUCCESS:
       const { comments } = action.payload;
       state.posts = state.posts.map(post => {
         if(post._id === action.payload.post) {
           return {...post, comments: [...post.comments, ...comments]}
         }
       return post
        })
       return {
         ...state
       }
     case EDIT_COMMENT_POSTS_SUCCESS:
       state.posts = state.posts.map(post => {
         if(post._id === action.payload.comment.post) {
           let newComments = post.comments.map(comment => {
             if(comment._id === action.payload.comment._id) {
               return {...comment, body: action.payload.comment.body}
           }
           return comment
          })
          return {...post, comments: newComments}
         }
       return post
       })
      return { ...state }
    case LIKE_COMMENT_POSTS_SUCCESS:
      state.posts = state.posts.map(post => {
       if(post._id === action.payload.post) {
         let newComments = post.comments.map(comment => {
           if(comment._id === action.payload.Like.comment) {
             let NumLikes = action.payload.Liked ? comment.numLikes + 1 : comment.numLikes - 1;
               return { ...comment, isLiked: action.payload.Liked, numLikes: NumLikes }
           }
           return comment
         })
         return {...post, comments: newComments}
       }
         return post
      })
     return { ...state }
    case DELETE_COMMENT_POSTS_SUCCESS:
      state.posts = state.posts.map(post => {
       if(post._id === action.payload.comment.post) {
         let newComments = post.comments.filter(comment => comment._id !== action.payload.comment._id)
         return {...post, numComments: post.numComments - 1, comments: newComments}
       }
         return post
      })
      return {...state}
    case SHOW_COMMENTS: 
     state.posts = state.posts.map(post => {
       if(post._id === action.payload.id) {
         return { ...post, showComments: action.payload.show }
       }
       return post
     })
     return {...state}
     case GET_POSTS_ERROR:
     case ADD_NEW_POST_ERROR:
     case EDIT_POST_POSTS_ERROR:
     case LIKE_POST_POSTS_ERROR:
     case DELETE_POST_POSTS_ERROR:
     case ADD_COMMENT_POSTS_ERROR:
     case DELETE_COMMENT_POSTS_ERROR:
     case EDIT_COMMENT_POSTS_ERROR:
     case LIKE_COMMENT_POSTS_ERROR:
     case GET_COMMENTS_POSTS_ERROR:
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

export const postReducer = (state = { post: {} }, action) => {  
    switch(action.type) {
     case GET_POST_REQUEST:
       return {
         ...state,
         loading: true,    
       }
     case EDIT_POST_SUCCESS:
        state.post = {
              ...state.post, 
             images: action.payload.post.images,
             travellerInfo: action.payload.post.travellerInfo,
             destinationInfo: action.payload.post.destinationInfo,
             recommendations: action.payload.post.recommendations
        }
       return{ ...state }
     case LIKE_POST_SUCCESS: 
       const { Liked } = action.payload;
       const numOfLikes = Liked ? state.post.numLikes + 1 : state.post.numLikes - 1;
       state.post = {
         ...state.post,
         numLikes:numOfLikes,
         isLiked: Liked
       }
       return { ...state }
     case DELETE_POST_SUCCESS:
       return { ...state, post: {...state.post, deleted: true } }
     case GET_POST_SUCCESS:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         replyLoading: false,
         post: action.payload.post
       }
     case GET_THE_COMMENTS_SUCCESS: 
       return{
         ...state,
         post: { ...state.post, comments: action.payload.comments }
       }
     case ADD_COMMENT_SUCCESS:
       return {
         ...state, post: { ...state.post, comments: [action.payload.comment, ...state.post.comments] }
       }
     case LIKE_THE_COMMENT_SUCCESS: 
       const newComments = state.post.comments.map(comment => {
         if(comment._id === action.payload.Like.comment) {
           let NumLikes = action.payload.Liked ? comment.numLikes + 1 : comment.numLikes - 1;
           return { ...comment, isLiked: action.payload.Liked, numLikes: NumLikes } 
         }
         return comment;
       })
       return { ...state, post: { ...state.post, comments: newComments }}
     case EDIT_THE_COMMENT_SUCCESS:
       let newPostComments = state.post.comments.map(comment => {
         if(comment._id === action.payload.comment._id) {
           return {...comment, body: action.payload.comment.body}
         }
         return comment
       })
       return {...state, post: {...state.post, comments: newPostComments }}
     case DELETE_THE_COMMENT_SUCCESS:
       let Comments = state.post.comments.filter(comment => comment._id !== action.payload.comment._id)
       return { ...state, post: {...state.post, numComments: state.post.numComments - 1, comments: Comments} }
     case ADD_COMMENT_ERROR:
     case GET_POST_ERROR:
     case EDIT_POST_ERROR:
     case LIKE_POST_ERROR:
     case DELETE_POST_ERROR:
     case GET_THE_COMMENTS_ERROR:
     case EDIT_THE_COMMENT_ERROR:
     case LIKE_THE_COMMENT_ERROR:
     case DELETE_THE_COMMENT_ERROR:
       return {
         ...state,
         loading: false,
         commentLoading: false,
         error:action.payload    
       }
       
     case SHOW_THE_COMMENTS: 
       return {
         ...state, post:{ ...state.post, showComments: action.payload }
       }

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

