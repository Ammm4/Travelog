import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/form';
import Header from './components/header';
import Welcome from './components/welcome';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../redux/users/userActions';
import { useAlert } from 'react-alert';
import { LOG_IN_SUCCESS_RESET, LOG_OUT_USER_RESET } from '../../redux/users/userTypes';

const LoginWrapper = styled.section`
 display: flex;
 width: 90%;
 max-width: 875px;
 margin:auto;
 margin-top: 3rem;
 padding: 2rem;
`

export default function Login() {
  const { user, success, error } = useSelector(state => state.User);
  const dispatch = useDispatch();
  const alert = useAlert();
  
  useEffect(() => {
   if(success && user) {
      alert.success('Logged In Successfully');
      dispatch({ type : LOG_IN_SUCCESS_RESET })
    }
   if(success && !user) {
      alert.success('Logged Out Successfully');
      dispatch({ type : LOG_OUT_USER_RESET })
    }
    if(error) {
      alert.error(error)
      dispatch(clearError())
    }
  }, [alert, dispatch, success, user, error])
  
  if (user) {
    return <Redirect to="/dashboard" />
  } 
  return (
    <>
      <Header />
      <LoginWrapper>
        <Welcome/>
        <LoginForm />
      </LoginWrapper>
    </>
  )
}