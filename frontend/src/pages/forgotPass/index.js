import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FormContainer, InputContainer } from '../../GlobalComponents/StyledComponents/Container';
import { Input, Label, Submit } from '../../GlobalComponents/StyledComponents/Inputs';
import { H2 } from '../../GlobalComponents/StyledComponents/Headings';
import { Form } from '../../GlobalComponents/StyledComponents/Form';
import Loading from '../dashboard/components/Loading';
import ErrorDisplay from '../../GlobalComponents/Components/Error';

const Container = styled.div`
width: 100%;
max-width: 400px;
margin: 5rem auto;
`

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [resetMail, setResetMail] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('api/v1/forgot_password', { email });
      setError(null);
      setLoading(false);
    } catch(error) {
      setError(error.response.data.error || error.message);
      setLoading(false)
    }
  }
  
  return <>
    { loading && <Loading msg="Sending Email"/> }
    <Container>
    {
      resetMail ?
      <FormContainer>
        <H2>Check Your Email</H2>
        <p>An email has been sent to your email address for resetting your password</p>
      </FormContainer>
       :
      <FormContainer>
      <H2>Forgot Password</H2>
      {error && <ErrorDisplay>{ error }</ErrorDisplay>}
      <Form onSubmit={ (e) => handleSubmit(e)}>
        <InputContainer>
          <Label htmlFor='email'>Enter Your Email</Label>
          <Input 
          type="email"
          name="email"
          id="email"
          value={ email }
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </InputContainer>
        <Submit type='submit' value={'Send Me Password Reset Link'} />
      </Form>
    </FormContainer>
    }
    </Container>
  </>
}
