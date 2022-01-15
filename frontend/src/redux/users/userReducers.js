
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_IN_SUCCESS_RESET,
    LOG_OUT_USER_REQUEST,
    LOG_OUT_USER_SUCCESS,
    LOG_OUT_USER_ERROR,
    
    SET_USER,
    SIGN_UP_USER_REQUEST,
    SIGN_UP_USER_SUCCESS ,
    SIGN_UP_USER_RESET,
    SIGN_UP_USER_ERROR,

    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_ERROR,

    CLEAR_USER_ERRORS,
    LOG_OUT_USER_RESET
  } from './userTypes';


const userReducer = (state = { user: null }, action) => {
  switch(action.type) {

    case LOG_IN_REQUEST:
    case LOG_OUT_USER_REQUEST:
    case SIGN_UP_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOG_IN_SUCCESS:
    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        success: action.payload.success
      }
    case LOG_OUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        success: action.payload.success
      }
    case LOG_IN_ERROR:
    case SIGN_UP_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      }
    case LOG_OUT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      }

    case LOG_IN_SUCCESS_RESET:
    case LOG_OUT_USER_RESET:
    case SIGN_UP_USER_RESET:
      return {
        ...state,
        success: false
      }
    case CLEAR_USER_ERRORS: 
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
} 

export const singleUserReducer = (state = { singleUser: {} }, action) => {
  switch(action.type) {
    case GET_SINGLE_USER_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        singleUser: action.payload,
      }
    case GET_SINGLE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_USER_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
} 

export default userReducer;

