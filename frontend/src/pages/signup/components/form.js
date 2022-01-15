import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../../redux/users/userActions';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import  validator  from 'validator';

const FormContainer =  styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  h1 {
   font-family: 'Montserrat Alternates', sans-serif;
   font-size: 2.25rem;
   text-align: center;
   margin-bottom: 3rem;
   letter-spacing: 1px;
  }

`
const Form = styled.form`
  input[type="submit"] {
    width: 100%;
    outline: none;
    padding: 6px 10px;
    margin: 1rem auto;
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
`
const InputContainer = styled.div`
  margin: 1rem auto;
  label {
    display: block;
    margin-bottom: 0.3rem;
    letter-spacing: 1px;
    font-weight: 700;
  }
  input[type="password"], input[type="email"], input[type="text"] {
    width: 100%;
    font-size: 1rem;
    outline: none;
    padding: 8px 12px;
    letter-spacing: 1px;
  }
  
`
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
      <h1>Sign Up</h1>
      <Form onSubmit={(e) => handleSubmit(e)}><InputContainer>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="username"
            id="username"
            placeholder="Enter Your Username"
            value={signUpDetails.username}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {errors.username && <ErrorDisplay>{errors.username}</ErrorDisplay>}
        <InputContainer>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={signUpDetails.email}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {errors.email && <ErrorDisplay>{errors.email}</ErrorDisplay>}
        <InputContainer>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
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
            placeholder="Confirm Password"
            value={signUpDetails.confirmpassword}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {errors.confirmpassword && <ErrorDisplay>{errors.confirmpassword}</ErrorDisplay>}
        <input type="submit" value="Sign Up" />
      </Form>
     <p>Already Signed Up <Link to="/login">Login</Link></p> 
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
