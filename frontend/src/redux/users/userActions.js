import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT_USER_REQUEST,
    LOG_OUT_USER_SUCCESS,
    LOG_OUT_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
    SIGN_UP_USER_REQUEST,
    SIGN_UP_USER_SUCCESS ,
    SIGN_UP_USER_ERROR,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_ERROR,
    SHOW_ME,
    DEMO_LOGIN,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
  } from './userTypes';

import axios from 'axios';
import { requestDispatch } from '../../utils';
import { resetSignUpData } from '../globals/globalActions';
import { resetAll } from '../../utils';
// ======================== LOGIN USER ACTION START ======================= //
export const login = (body) => {
  return async(dispatch) => {
    dispatch({ type: LOG_IN_REQUEST, payload: 'Logging In' })
    try {
      const { data } = await axios.post('/api/v1/login', body)
      dispatch({ type: LOG_IN_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: LOG_IN_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
// ======================== LOGIN USER  ACTION END ======================= //


// ======================== LOGOUT USER ACTION START ======================= //

export const logout = () => {
  return async(dispatch) => {
    dispatch({ type: LOG_OUT_USER_REQUEST, payload: 'Logging Off' })
    try {
      const { data: { message }} = await axios.post('/api/v1/logout');
      dispatch({ type: LOG_OUT_USER_SUCCESS,payload: { user: null, message } })
      resetAll(dispatch)
    } catch(error) {
      dispatch({ type: LOG_OUT_USER_ERROR, payload: error.response.data.error || error.message })

    }
  }
}
// ======================== LOGOUT USER ACTION END ======================= //
export const resetPassword = (passwords) => {
  return async(dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST, payload: 'Password Resetting...' })
    try {
      const { data: { message } } = await axios.post('api/v1/reset_password', passwords);
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: { message, user: null } })
    } catch(error) {
      dispatch({ type: RESET_PASSWORD_ERROR, payload: error.response.data.error || error.message })

    }
  }
}
// ======================== SET USER ACTION START ======================= //

export const showMe = () => {
  return (dispatch) => {
    axios.get('/api/v1/showMe')
    .then(response => dispatch({ type: SHOW_ME, payload: response.data.user }))
  }
}

// ======================== SET USER ACTION END ======================= //
export const demoLogin = () => {
  return async (dispatch) => {
    let { data } = await axios.post('/api/v1/demo');
    dispatch({ type: DEMO_LOGIN, payload: data.user})
  }
}

// ======================== GET SINGLE USER ACTION START ======================= //

export const getSingleUser = (user_id) => {
  return async (dispatch) => {
    dispatch({ type: GET_SINGLE_USER_REQUEST });
    try {
      const { data } = await axios.get(`/api/v1/users/${user_id}`);
      dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: data.user })
    } catch(error) {
      dispatch( { type: GET_SINGLE_USER_ERROR, payload: error.response.data.error || error.message })
    }
  }
}
// ======================== GET SINGLE USER ACTION END ======================= //

// ======================== SIGNUP USER ACTION END ===========================//
  export const signUpUser =  (body) => {
    return async (dispatch) => {
      dispatch({ type: SIGN_UP_USER_REQUEST, payload: 'Creating Profile' })
      try {
        const { data } = await axios.post('/api/v1/signup', body);
        dispatch( { type: SIGN_UP_USER_SUCCESS, payload: data })
        dispatch(resetSignUpData());
      } catch (error) {
        dispatch({ type: SIGN_UP_USER_ERROR, payload: error.response.data.error || error.message })
      }

    }
  }

// ======================== SIGNUP USER ACTION END ===========================//

// ======================== UPDATE USER ACTION START ===========================//
export const updateUser = (userID, body) => {
  return async(dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST })
    try {
     const { data } = await axios.put(`/api/v1/users/${ userID }/profile_change`, body);
     dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
    } catch(error) {
     dispatch({ type: UPDATE_USER_ERROR, payload: error.response.data.error || error.message })
    }
  }
}


// ======================== UPDATE USER ACTION END ===========================//

// ======================== DELETE USER ACTION START ===========================//
export const changePassword = (userID, body) => {
  return async(dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST })
    try {
     const { data } = await axios.put(`/api/v1/users/${ userID }/change_password`, body);
     dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: CHANGE_PASSWORD_ERROR, payload: error.response.data.error || error.message })
    }
  }
}


// ======================== DELETE USER ACTION END ===========================//

// ======================== DELETE USER ACTION START ===========================//
export const deleteUser = (body) => {
  return async(dispatch) => {
    requestDispatch(dispatch, 'Deleting Profile')
    try {
     const { data } = await axios.delete(`/api/v1/users/delete_profile`, { data: body })
     dispatch({ type: DELETE_USER_SUCCESS, payload: { user: null, message: data.message } })
    } catch(error) {
     requestDispatch(dispatch, null)
     dispatch({ type: DELETE_USER_ERROR, payload: error.response.data.error || error.message })
    }
  }
}


// ======================== DELETE USER ACTION END ===========================//

