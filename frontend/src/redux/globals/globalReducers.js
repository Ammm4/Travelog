import { SHOW_CREATE_COMMENT, SHOW_MODAL, POST_DETAILS, LOADING_MESSAGE } from "./globalTypes";

let initialState = {
  showCreateComment: false,
  showModal: null,
  postDetails: null,
  loadingMsg:''
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
       default:
    return state
  }
}