import React, { useState }from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  input[type="password"], input[type="email"] {
    width: 100%;
    font-size: 1rem;
    outline: none;
    padding: 8px 12px;
    letter-spacing: 1px;
  }
  
`
const LoginErr = styled.p`
  color: red;
  font-size: 1rem;
`
export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState({ email:"", password:"" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
     setLoginDetails({...loginDetails, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!loginDetails.email || !loginDetails.password) {
      return setError('Please enter email or password!');
    }
    setError('')
  }
  return (
    <FormContainer>
      <h1>Log In</h1>
      {error && <LoginErr>{ error }</LoginErr>}
      <Form onSubmit={ (e) => handleSubmit(e) }>
        <InputContainer>
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          name="email"
          id="email"
          placeholder="Enter Your Email"
          value={ loginDetails.email }
          onChange={ (e) => handleChange(e) }
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password</label>
          <input 
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          value={loginDetails.password}
          onChange={ (e) => handleChange(e) }
          />
        </InputContainer>
        <input type="submit" value="Log In" />
      </Form>
      <Link to="#">Forgot Password</Link>
    </FormContainer>
  )
}
