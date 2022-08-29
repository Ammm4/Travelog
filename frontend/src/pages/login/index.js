import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from './components/form';
import styled from 'styled-components';
import { useReduxSelector } from '../../utils';
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
  const { User: { user } } = useReduxSelector();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if(user) history.replace(from);
  }, [ user, history, from])
  return (
    <LoginWrapper>   
      <LoginForm />
      <Divider />
      <Signup />
    </LoginWrapper>
  )
}
