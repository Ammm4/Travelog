import React, { useState } from 'react';
import axios from 'axios';
import { useReduxSelector } from '../../utils';
import { Redirect } from 'react-router-dom';
import { FormContainer, InputContainer, ForgotPasswordContainer } from '../../GlobalComponents/StyledComponents/Container';
import { Input, Label, Submit } from '../../GlobalComponents/StyledComponents/Inputs';
import { H2 } from '../../GlobalComponents/StyledComponents/Headings';
import { Form } from '../../GlobalComponents/StyledComponents/Form';
import Loading from '../../GlobalComponents/Components/Loading';
import { PasswordErrors, PasswordSuccess } from '../../GlobalComponents/StyledComponents/Error';
export default function ForgotPassword() {
  const { User: { user } } = useReduxSelector();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [resetMail, setResetMail] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('api/v1/forgot_password', { email });
      setResetMail(true);
      setEmail('');
      setLoading(false);
      setError(null);
    } catch(error) {
      setLoading(false);
      setError('Sorry, an error occurred. Please try again Later. Thanks');
    }
  }
  if(user) return <Redirect to="/dashboard" />  
  if(loading) return <Loading msg="Requesting"/>
  return <>
    <ForgotPasswordContainer>
    {
      resetMail ?
      <FormContainer>
        <H2>Reset Link</H2>
        <PasswordSuccess>A link has been sent to your email address.</PasswordSuccess>
      </FormContainer>
       :
      <FormContainer>
      <H2>Forgot Password</H2>
      { error && <PasswordErrors>{ error }</PasswordErrors>}
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
    </ForgotPasswordContainer>
  </>
}
