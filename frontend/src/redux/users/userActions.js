import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,

    LOG_OUT_USER_REQUEST,
    LOG_OUT_USER_SUCCESS,
    LOG_OUT_USER_ERROR,
    SET_USER,
    SIGN_UP_USER_REQUEST,
    SIGN_UP_USER_SUCCESS ,
    SIGN_UP_USER_ERROR,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_ERROR,
    CLEAR_USER_ERRORS
  } from './userTypes';

import axios from 'axios';

// ======================== LOGIN USER ACTION START ======================= //
const loginRequest = () => {
  return {
    type: LOG_IN_REQUEST
  }
}

const loginSuccess = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    payload: data
  }
}

const loginError = (error) => {
  return {
    type: LOG_IN_ERROR,
    payload: error
  }
}

export const login = (body) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios.post('/api/v1/login', body)
    .then(response => {
      dispatch(loginSuccess(response.data))})
    .catch(error => {
      dispatch(loginError(error.response.data.error))})
  }
}//status: error.status, error:error.response.data.error
// ======================== LOGIN USER  ACTION END ======================= //


// ======================== LOGOUT USER ACTION START ======================= //
const logoutUserRequest = () => {
  return {
    type: LOG_OUT_USER_REQUEST
  }
}
const logoutUserSuccess = (data) => {
  return {
    type: LOG_OUT_USER_SUCCESS,
    payload: data
  }
}
const logoutUserError = (error) => {
  return {
    type: LOG_OUT_USER_ERROR,
    payload: error
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutUserRequest())
    axios.post('/api/v1/logout')
    .then(response => {
      dispatch(logoutUserSuccess(response.data))
    })
    .catch(error => {
      dispatch(logoutUserError(error.response.data.error))
    })
  }
}
// ======================== LOGOUT USER ACTION END ======================= //


// ======================== SET USER ACTION START ======================= //
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const setuser = () => {
  return (dispatch) => {
    axios.post('/api/v1/setuser')
    .then(response => {
      dispatch(setUser(response.data.user))
    })
  }
}

// ======================== SET USER ACTION END ======================= //


// ======================== GET SINGLE USER ACTION START ======================= //

const getSingleUserRequest = () => {
  return {
    type: GET_SINGLE_USER_REQUEST
  }
}

const getSingleUserSuccess = (user) => {
  return {
    type: GET_SINGLE_USER_SUCCESS,
    payload: user
  }
}

const getSingleUserError = (error) => {
  return {
    type: GET_SINGLE_USER_ERROR,
    payload: error
  }
}

export const getSingleUser = (user_id) => {
  return async (dispatch) => {
    dispatch(getSingleUserRequest);
    try {
      const { data } = await axios.get(`/api/v1/users/${user_id}`);
      dispatch(getSingleUserSuccess(data.user))
    } catch(error) {
      dispatch(getSingleUserError(error.response.data.error))
    }
  }
}
// ======================== GET SINGLE USER ACTION END ======================= //

// ======================== SIGNUP USER ACTION END ===========================//
  const signUpUserRequest = () => {
    return {
      type: SIGN_UP_USER_REQUEST
    }
  }

  const signUpUserSuccess = ( data ) => {
    return {
      type: SIGN_UP_USER_SUCCESS,
      payload: data
    }
  }

  const signUpUserError = ( error ) => {
    return {
      type: SIGN_UP_USER_ERROR,
      payload: error
    }
  }

  export const signUpUser =  (body) => {
    return async (dispatch) => {
      dispatch(signUpUserRequest());
      try {
        const { data } = await axios.post('/api/v1/signup', body);
        dispatch(signUpUserSuccess( data ))
      } catch (error) {
        dispatch(signUpUserError(error.response.data.error))
      }

    }
  }

// ======================== SIGNUP USER ACTION END ===========================//


// ========================= CLEAR ERRORS ACTION START ====================== //
 const clearErrorAction = () => {
    return {
      type: CLEAR_USER_ERRORS
    }
  }
  export const clearError = () => {
     return (dispatch) => {
       dispatch(clearErrorAction())
     }
  }

// ========================= CLEAR ERRORS ACTION END ====================== //