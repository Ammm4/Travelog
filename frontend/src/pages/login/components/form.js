import React, { useRef } from 'react';
import { useReduxSelector, useReduxDispatch, checkLoginErrors } from '../../../utils';
import { loginInputs } from '../../../constants';
import { login } from '../../../redux/users/userActions';
import { Label, Input, Submit } from '../../../GlobalComponents/StyledComponents/Inputs';
import { FormContainer, InputContainer, ToggleLinkContainer } from '../../../GlobalComponents/StyledComponents/Container';
import { H2 } from '../../../GlobalComponents/StyledComponents/Headings';
import { AuthLink } from '../../../GlobalComponents/StyledComponents/Links';
import { Form } from '../../../GlobalComponents/StyledComponents/Form';
import Loading from '../../dashboard/components/Loading';
import { setLoginData, resetLoginData } from '../../../redux/globals/globalActions';
import ErrorBox from './errorBox';

export default function LoginForm() {
  const { User: { loading }, Globals: { loginData, loginData: { email, password, errors }} } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const errorRef = useRef();

  const handleChange = (e) => {
    dispatch(setLoginData(e.target.name,e.target.value))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    let err = checkLoginErrors(email, password);
    console.log(err);
    new Promise((resolve) => resolve(dispatch(setLoginData('errors', null )))).then(() => {
      if(Object.keys(err).length > 0) {    
        return dispatch(setLoginData('errors', err ))
      }
      dispatch(login({ email, password }));
      dispatch(resetLoginData())
    })
  }

  if(loading) {
    return <Loading msg="Loading"/>
  }

  return (
    <FormContainer>
      <H2>Your Account</H2>
      { errors && <ErrorBox errorRef={errorRef}/> }
      <Form onSubmit={ (e) => handleSubmit(e) }>
        { loginInputs.map((input) => {
          return ( 
            <InputContainer key={input}>
              <Label htmlFor={input}>{input}</Label>
              <Input 
                type={input === 'email' ? 'email' : 'password'} 
                name={input}
                id={input}
                value={ loginData[input] }
                onChange={ (e) => handleChange(e) }
                errors={ errors && errors[input] }
              />
           </InputContainer>
        )
        })}
        <Submit type="submit" value="Log In" />
      </Form>
      <ToggleLinkContainer><AuthLink to="/forgot_password">FORGOT YOUR DETAILS?</AuthLink></ToggleLinkContainer>  
    </FormContainer>
  )
}
 