import React, { useRef } from 'react';
import { useReduxSelector, useReduxDispatch, checkSignUpErrors } from '../../../utils';
import Asterisk from '../../../GlobalComponents/Components/Asterisk';
import { signUpInputs } from '../../../constants';
import { signUpUser } from '../../../redux/users/userActions';
import { setSignUpData } from '../../../redux/globals/globalActions';
import ErrorDisplay from '../../../GlobalComponents/Components/Error';
import { Input, Submit, Label } from '../../../GlobalComponents/StyledComponents/Inputs';
import { FormContainer, InputContainer, ToggleLinkContainer } from '../../../GlobalComponents/StyledComponents/Container';
import { AuthLink } from '../../../GlobalComponents/StyledComponents/Links';
import { H2 } from '../../../GlobalComponents/StyledComponents/Headings';
import { Form } from '../../../GlobalComponents/StyledComponents/Form';

export default function SignupForm() {
  const { Globals: { signUpData, signUpData: { errors } } } = useReduxSelector();
  const errorRef = useRef();
  const dispatch = useReduxDispatch();
  
  const handleChange = (e) => {
    dispatch(setSignUpData(e.target.name,e.target.value))
     
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let err = checkSignUpErrors(signUpData)
    new Promise((resolve) => resolve(dispatch(setSignUpData('errors', null))))
    .then(() => {
      if(Object.keys(err).length !== 0) {
        dispatch(setSignUpData('errors', err));
      } else {
        dispatch(signUpUser(signUpData));
    }
    }) 
  }
  
  return (
    <FormContainer>
      <H2>Join the Club</H2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        { signUpInputs.map((input) => {
          return (
            <InputContainer >
              <Label htmlFor={input}>{ input === 'confirmpassword' ? 'confirm password': input }<Asterisk /></Label>
              <Input 
              type={input === 'username' ? 'text' : input === 'confirmpassword' ? 'password' : input} 
              name={input}
              id={input}
              value={ signUpData[input] }
              onChange={(e) => handleChange(e)}
              errors={ errors && errors[input]}
              />
              {errors && errors[input] && <ErrorDisplay errorRef={ errors.errorMarker === input ? errorRef : null}>{errors.username}</ErrorDisplay>}
            </InputContainer>
           )
         })}
        <Submit type="submit" value="Sign Up" />
      </Form>
     <ToggleLinkContainer>Got an Account ? <AuthLink to="/login">Login</AuthLink></ToggleLinkContainer> 
    </FormContainer>
  )
}

