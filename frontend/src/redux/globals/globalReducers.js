import { 
  SHOW_CREATE_COMMENT, 
  SHOW_MODAL, 
  POST_DETAILS, 
  LOADING_MESSAGE, 
  POSTS_USER_TYPE,
  FORUMS_USER_TYPE } from "./globalTypes";

let initialState = {
  showCreateComment: false,
  showModal: null,
  postDetails: null,
  loadingMsg:'',
  postsUserType:'allUsers',
  forumsUserType:'allUsers'
}

export const globalReducers = ( state = initialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_COMMENT:
      return {
        ...state,
        showCreateComment: action.payload
      }
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      }
    case POST_DETAILS:
      return {
        ...state,
        postDetails: action.payload
      }
    case LOADING_MESSAGE: 
      return {
        ...state,
        loadingMsg: action.payload
      }
    case POSTS_USER_TYPE: 
      return {
        ...state,
        postsUserType: action.payload
      }
    case FORUMS_USER_TYPE: 
      return {
        ...state,
        forumsUserType: action.payload
      }
       default:
    return state
  }
}