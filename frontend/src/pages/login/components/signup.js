import React from 'react';
import { FormContainer } from '../../../GlobalComponents/StyledComponents/Container';
import { Form } from '../../../GlobalComponents/StyledComponents/Form';
import { H2,H3 } from '../../../GlobalComponents/StyledComponents/Headings';
import { SignUpLink } from '../../../GlobalComponents/StyledComponents/Links';

export default function Signup () {
  return <FormContainer>
    <H2>Sign Up</H2>
    <H3> Join the Club, Share Posts and Forums</H3>
    <Form>
      <SignUpLink to="/signup">Sign Up</SignUpLink>
    </Form>
    
    </FormContainer>
}