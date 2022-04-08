import { 
  SHOW_CREATE_COMMENT, 
  SHOW_MODAL, 
  POST_DETAILS, 
  LOADING_MESSAGE, 
  POSTS_USER_TYPE,
  FORUMS_USER_TYPE } from "./globalTypes";

export const showCreateCommentForm = ( toggle ) => {
  return (dispatch) => {
    dispatch({ type: SHOW_CREATE_COMMENT, payload: toggle })
  }
}

export const setShowModal = ( modalType ) => {
  return (dispatch) => {
    dispatch( { type: SHOW_MODAL, payload: modalType })
  }
}

export const setPostDetails = ( details ) => {
  return (dispatch) => {
    dispatch( { type: POST_DETAILS, payload: details })
  }
}

export const setLoadingMessage = ( message ) => {
  return (dispatch) => {
    dispatch( { type: LOADING_MESSAGE, payload: message })
  }
}

export const setPostsUserType = ( user ) => {
  return (dispatch) => {
    dispatch( { type: POSTS_USER_TYPE, payload: user })
  }
}

export const setForumsUserType = ( user ) => {
  return (dispatch) => {
    dispatch( { type: FORUMS_USER_TYPE, payload: user })
  }
}