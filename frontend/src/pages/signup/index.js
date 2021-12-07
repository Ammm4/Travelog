import React from 'react';
import Header from './components/header';
import Welcome from './components/welcome';
import styled from 'styled-components';
import SignupForm from './components/form';


const SignupWrapper = styled.section`
 display: flex;
 width: 90%;
 max-width: 875px;
 margin:auto;
 margin-top: 3rem;
 padding: 2rem;
`
export default function Signup() {
  return (
    <>
      <Header />
      <SignupWrapper>
        <Welcome />
        <SignupForm />
      </SignupWrapper>
    </>
  )
}