import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../utils';
import { FormContainer, InputContainer, ForgotPasswordContainer } from '../GlobalComponents/StyledComponents/Container';
import { H2 } from '../GlobalComponents/StyledComponents/Headings';
import { Form } from '../GlobalComponents/StyledComponents/Form';
import { Input, Label, Submit } from '../GlobalComponents/StyledComponents/Inputs';
import Loading from '../GlobalComponents/Components/Loading'
import ErrorDisplay from '../GlobalComponents/Components/Error';
import { PasswordErrors, PasswordSuccess } from '../GlobalComponents/StyledComponents/Error';
import { handleChangePassword } from '../utils';
import { changePasswordInputs } from '../constants';
import { GoToHomeLink } from '../GlobalComponents/StyledComponents/Links';

export default function ResetPassword() {
  const { User: { user }, Globals: { resetPassword, resetPassword: { btnAbled, errors } } } = useReduxSelector();
  const { reset_token } = useParams();
  const [loading, setLoading] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useReduxDispatch();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/v1/reset_password/${ reset_token }`, {resetPassword});
      setResetSuccessful(true);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error || error.message)
    }
  
  }
  if(user) return <Redirect to="/dashboard"/>
  if(loading) return <Loading msg="Reseting Password" />
  return (
    <ForgotPasswordContainer>
      {
        resetSuccessful ? 
        <FormContainer>
          <H2>Congratulations</H2>
          <PasswordSuccess>Password Change Successful!</PasswordSuccess>
          <GoToHomeLink to="/login">Log In</GoToHomeLink >
        </FormContainer>
        :
        <FormContainer>
        <H2>Reset Password</H2>
        { error && <PasswordErrors >{ error } <GoToHomeLink to="/forgot_password">Send me new Link</GoToHomeLink></PasswordErrors>}
        { !error && <Form onSubmit={ (e) => handleSubmit(e) }>
          { changePasswordInputs.map(item => {
            const { inputName, title, description } = item;
            if(inputName !== 'oldPassword') {     
              return (
               <InputContainer key={inputName}>
                 <Label htmlFor={inputName}>{ title }</Label>
                 <Input 
                   id={inputName} 
                   name={inputName} 
                   type="password"
                   value={ resetPassword[inputName] }
                   onChange = {(e) => handleChangePassword(e, dispatch, resetPassword, 'abcxyz') }
                   placeholder={ description }/>
                   { errors && errors[inputName] && <ErrorDisplay>{errors[inputName]}</ErrorDisplay> 
                   }
               </InputContainer>
             )
            }
            return null
          })}
         <Submit 
             type="submit" 
              value="Change Password" 
              disabled={btnAbled}
              onClick={(e) => handleSubmit(e)} 
              />
        </Form>}
      </FormContainer> 
      }
    </ForgotPasswordContainer>
  )
}
