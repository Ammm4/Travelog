import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_ERROR } from "./postTypes";

let initialState = {
  loading: false,
  allPosts: [],
  error:''
}
export const postReducer = (state = initialState, action) => {  
    switch(action.type) {
     case GET_POSTS_REQUEST:
       return {
         ...state,
         loading: true,    
       }
     case GET_POSTS_SUCCESS:
       return {
         loading: false,
         allPosts: action.payload,
         error: ''
       }
     case GET_POSTS_ERROR:
       return {
         loading: false,
         allPosts: [],
         error:action.payload    
       }
     default:
       return state;
     } 
}