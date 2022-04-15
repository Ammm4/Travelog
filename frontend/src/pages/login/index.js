import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/form';
import Header from '../Header';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../redux/users/userActions';
import { useAlert } from 'react-alert';
import { LOG_IN_SUCCESS_RESET } from '../../redux/users/userTypes';
import Signup from './components/signup'

const LoginWrapper = styled.section`
 width: 100%;
 display: grid;
 grid-template-columns:1fr 2px 1fr;
 grid-template-rows: 1fr;
 background-color:#fff;
 padding-top: 1.75rem;
 margin:auto;
 @media(max-width: 950px) {
   grid-template-columns: 1fr;
 }
`
const Divider = styled.div`
  height: 80%;
  margin: auto 0;
  border-left: 2px solid #747682;
`
export default function Login() {
  const { user, success, error } = useSelector(state => state.User);
  const dispatch = useDispatch();
  const alert = useAlert();
  
  useEffect(() => {
   if(success) {
      alert.success(success);
      dispatch({ type : LOG_IN_SUCCESS_RESET })
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
        <LoginForm />
        <Divider />
        <Signup />
      </LoginWrapper>
    </>
  )
}
//<Welcome/>