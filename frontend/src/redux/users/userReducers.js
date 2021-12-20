
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT_USER,
    SET_USER,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_ERROR
  } from './userTypes';

let initialState = {
  loading: true,
  user: null,
  error: null
}

let singleUserInitialState = {
  loading: true,
  singleuser: null,
  error: null
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case LOG_IN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null
      }
    case LOG_IN_ERROR:
      return {
        loading: false,
        user: null,
        error: action.payload
      }
    case LOG_OUT_USER:
      return {
        loading: false,
        user: null,
        error: null
      }
    case SET_USER:
      return {
        loading: false,
        user: action.payload,
        error: null
      }

    default:
      return state
  }
} 

export const singleUserReducer = (state = singleUserInitialState, action) => {
  switch(action.type) {
    case GET_SINGLE_USER_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case GET_SINGLE_USER_SUCCESS:
      return {
        loading: false,
        singleuser: action.payload,
        error: null
      }
    case GET_SINGLE_USER_ERROR:
      return {
        loading: false,
        user: null,
        error: action.payload
      }
    default:
      return state
  }
} 

export default userReducer;