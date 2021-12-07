import React from 'react';
import LoginForm from './components/form';
import Header from './components/header';
import Welcome from './components/welcome';
import styled from 'styled-components';

const LoginWrapper = styled.section`
 display: flex;
 width: 90%;
 max-width: 875px;
 margin:auto;
 margin-top: 3rem;
 padding: 2rem;
`

export default function Login() {
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