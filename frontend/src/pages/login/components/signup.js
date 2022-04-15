import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FormContainer, Form } from './form';

const AuthLink = styled(Link)`
   display: inline-block;
   width: 100%;
   max-width: 400px;
   border: 1px solid #2e5c99;
   color: #2e5c99;
   padding: 16px 40px;
   text-align: center;
   text-decoration: none;
   &:hover {
     background-color: #2a78cd;
     border: 1px solid #2a78cd;
     color: #fff;
   }
`
export default function Signup () {
  return <FormContainer>
    <h2>Sign Up</h2>
    <h3> Join the Club, Share Posts and Forums</h3>
    <Form>
      <AuthLink to="/signup">Sign Up</AuthLink>
    </Form>
    
    </FormContainer>
}