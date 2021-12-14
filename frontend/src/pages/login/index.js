import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/form';
import Header from './components/header';
import Welcome from './components/welcome';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


const LoginWrapper = styled.section`
 display: flex;
 width: 90%;
 max-width: 875px;
 margin:auto;
 margin-top: 3rem;
 padding: 2rem;
`

export default function Login() {
  const user = useSelector(state => state.User);
  if (user.user) {
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