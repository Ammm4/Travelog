import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../Header';
import { FormContainer, Form, InputContainer } from '../login/components/form';
import Loading from '../dashboard/components/Loading';
import { ErrorDisplay } from '../signup/components/form';

const Container = styled.div`
width: 100%;
max-width: 400px;
margin: auto;
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
    <Header />
    <Container>
    {
      resetMail ?
      <FormContainer>
        <h2>Check Your Email</h2>
      <p>An email has been sent to your email address for resetting your password</p>
       </FormContainer>
       :
      <FormContainer>
      <h2>Forgot Password</h2>
      {error && <ErrorDisplay>{ error }</ErrorDisplay>}
      <Form onSubmit={ (e) => handleSubmit(e)}>
        <InputContainer>
          <label htmlFor='email'>Enter Your Email</label>
          <input 
          type="email"
          name="email"
          id="email"
          value={ email }
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </InputContainer>
        <input type='submit' value={'Send Me Password Reset Link'} />
      </Form>
    </FormContainer>
     
    }
    
    </Container>
  </>
}
