import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT_USER,
    SET_USER
  } from './userTypes';

import axios from 'axios';

const loginRequest = () => {
  return {
    type: LOG_IN_REQUEST
  }
}

const loginSuccess = (user) => {
  return {
    type: LOG_IN_SUCCESS,
    payload: user
  }
}
const loginError = (error) => {
  return {
    type: LOG_IN_ERROR,
    payload: error
  }
}

const logoutUser = () => {
  return {
    type: LOG_OUT_USER
  }
}

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const login = (body) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios.post('/api/v1/login', body)
    .then(response => {
      dispatch(loginSuccess(response.data.user))})
    .catch(error => {
      console.log(error.status);
      dispatch(loginError({status: error.status, error:error.response.data.error}))})
  }
}

export const logout = () => {
  return (dispatch) => {
    axios.post('/api/v1/logout')
    .then(response => {
      dispatch(logoutUser)
    })
    .catch(error => {
      dispatch(loginError({error: error.response.data.error}))
    })
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