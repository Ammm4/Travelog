import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from './components/form';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch } from '../../utils';
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
 margin: 75px auto;
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
  const { User: { user, success, error } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  let history = useHistory();
  let location = useLocation();
  const alert = useAlert();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
   if(success) {
      alert.success(success);
      dispatch({ type : LOG_IN_SUCCESS_RESET })
    }
    if(error) {
      alert.error(error)
      dispatch(clearError())
    }
    if(user) {
      history.replace(from);
    }
  }, [alert, dispatch, success, user, error, history, from])
  
  return (
    <LoginWrapper>   
      <LoginForm />
      <Divider />
      <Signup />
    </LoginWrapper>
  )
}
