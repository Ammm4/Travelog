import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../../redux/users/userActions';
import styled from 'styled-components';

import  validator  from 'validator';
import { FormContainer, Form, InputContainer, ToggleLink, AuthLink  } from '../../login/components/form';

export const ErrorDisplay = styled.p`
  color: red;
  font-size: 0.9rem;
`
export default function SignupForm() {
  const [signUpDetails, setSignUpDetails] = useState({ username:"", email:"", password:"", confirmpassword:"" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
     setSignUpDetails({...signUpDetails, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = errorHandler(signUpDetails)
    if(Object.keys(err).length !== 0) {
      setErrors(err);
    } else {
      dispatch(signUpUser(signUpDetails))
      setSignUpDetails({ username:"", email:"", password:"", confirmpassword:"" });
      setErrors({})
    }
  }
  
  return (
    <FormContainer>
      <h2>Join the Club</h2>
      <Form onSubmit={(e) => handleSubmit(e)}><InputContainer>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="username"
            id="username"
            value={signUpDetails.username}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {errors.username && <ErrorDisplay>{errors.username}</ErrorDisplay>}
        <InputContainer>
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            name="email"
            id="email"
            value={signUpDetails.email}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {errors.email && <ErrorDisplay>{errors.email}</ErrorDisplay>}
        <InputContainer>
          <label htmlFor="password">Choose Password</label>
          <input 
            type="password"
            name="password"
            id="password"
            value={signUpDetails.password}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {errors.password && <ErrorDisplay>{errors.password}</ErrorDisplay>}
        <InputContainer>
          <label htmlFor="password">Confirm Password</label>
          <input 
            type="password"
            name="confirmpassword"
            id="password"
            value={signUpDetails.confirmpassword}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {errors.confirmpassword && <ErrorDisplay>{errors.confirmpassword}</ErrorDisplay>}
        <input type="submit" value="Sign Up" />
      </Form>
     <ToggleLink>Got an Account ? <AuthLink to="/login">Login</AuthLink></ToggleLink> 
    </FormContainer>
  )
}

const errorHandler = (data) => {
 const error = {};
 const { username, email, password, confirmpassword } = data;
 if(username.trim() === "") {
   error.username = "Username must be provided!"
 } else if(username.trim().length < 4) {
   error.username = "Username must be greater than 4 characters"
 } else if(username.trim().length > 30) {
   error.username = "Username must be lesser than 30 characters"
 }
 if(email === "") {
   error.email = "Please provide an email!"
 } else if (!validator.isEmail(email)) {
   error.email = "Please provide a valid email!"
 }
 if(password.trim() === "") {
   error.password = "Password must be provided!"
 } else if(password.trim().length < 8) {
   error.password = "Username must be greater than 8 characters!"
 } else if(password.trim().length > 100) {
   error.password = "Username must be lesser than 100 characters!"
 }
 if(confirmpassword === "") {
   error.confirmpassword = "Please confirm your password!"
 } else if(confirmpassword !== password) {
   error.confirmpassword = "Passwords do not match!"
 }
 return error;
}
