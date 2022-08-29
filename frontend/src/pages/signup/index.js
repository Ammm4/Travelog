import React from 'react';
import { Redirect } from 'react-router-dom';
import { useReduxSelector } from '../../utils';
import styled from 'styled-components';

// Components 
import SignupForm from './components/form';

export const SignupWrapper = styled.section`
 display: flex;
 width: 98%;
 max-width: 875px;
 margin:auto;
 margin-top: 4rem;
 padding: 2rem;
`
export default function Signup() {
  const { User: { user } } = useReduxSelector();
  if(user) return <Redirect to="/dashboard" />  
  return (
    <>
      <SignupWrapper>
        <SignupForm />
      </SignupWrapper>
    </>
  )
}
