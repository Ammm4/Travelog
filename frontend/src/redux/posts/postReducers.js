import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_ERROR
} from "./postTypes";

let postsInitialState = {
  loading: true,
  posts: [],
  error:''
}

let singlePostInitialState = {
  loading: true,
  singlepost: null,
  error:''
}

export const postReducer = (state = postsInitialState, action) => {  
    switch(action.type) {
     case GET_POSTS_REQUEST:
       return {
         ...state,
         loading: true,    
       }
     case GET_POSTS_SUCCESS:
       return {
         loading: false,
         posts: action.payload,
         error: ''
       }
     case GET_POSTS_ERROR:
       return {
         loading: false,
         posts: [],
         error:action.payload    
       }
     default:
       return state;
     } 
}

export const singlePostReducer = (state = singlePostInitialState, action) => {  
    switch(action.type) {
     case GET_SINGLE_POST_REQUEST:
       return {
         ...state,
         loading: true,    
       }
     case GET_SINGLE_POST_SUCCESS:
       return {
         loading: false,
         singlepost: action.payload,
         error: ''
       }
     case GET_SINGLE_POST_ERROR:
       return {
         loading: false,
         singlepost: null,
         error:action.payload    
       }
     default:
       return state;
     } 
}