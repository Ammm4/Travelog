import React, { useState }from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../redux/users/userActions';
import { ErrorDisplay } from '../../signup/components/form';
import Loading from '../../dashboard/components/Loading';

export const FormContainer =  styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  h2 {
   font-family: 'Montserrat Alternates', sans-serif;
   font-size: 40px;
   font-weight: 400;
   text-align: center;
   margin-bottom: 3rem;
   letter-spacing: 0.8px;
   color: #021b41;
  }
  h3{
    width: 100%;
    max-width: 400px;
    font-size: 32px;
    color: #021b41;
    font-weight: 400;
    margin: 25px auto;
    text-align: center;
    letter-spacing: .8px;
  }
  p {
   font-size: 0.95rem;
  }

`
export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: auto;
  input[type="submit"] {
  width: 100%;
  outline: none;
  padding: 16px 40px;
  background-color: #2e5c99;
  border: 1px solid #2e5c99;
  color: #fff;
  margin: 1rem auto;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: .4px;
  border-radius: 2px;
  &:hover {
      background-color: #2a78cd;
    }
  }
`
export const InputContainer = styled.div`
  margin: 2.25rem auto;
  label {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
    color:#004684;
    line-height: 2.4rem;
    letter-spacing: 0.8px;
    font-weight: bold;
  }

  input[type="password"], input[type="email"], input[type="text"]{
    outline: none;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    color:#666666;
    font-size: 1.2rem;
    line-height: 2rem;
    padding: 17px 14px 17px 4px;
    border-radius: 0px;
    &:focus {
      border: 1px solid #2e5c99;
      border-left: 5px solid #2e5c99;
    }
  }
  
`

export const ToggleLink = styled.p`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  //margin-top: 1rem;
  font-size: 0.95rem;
`
export const AuthLink = styled(Link)`
 color: #2671d3;
 text-decoration: none;
 letter-spacing: 1.8px;
 &:hover {
   border-bottom: 1px solid #2671d3;
 }
`


export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState({ email:"", password:"" });
  const { loading } = useSelector(state => state.User)
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
     setLoginDetails({...loginDetails, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!loginDetails.email || !loginDetails.password) {
      return setError('Oops! something went wrong.');
    }
    dispatch(login(loginDetails));
    setLoginDetails({ email:"", password:"" })
    setError('')
  }

  if(loading) {
    return <Loading msg="Loading"/>
  }

  return (
    <FormContainer>
      <h2>Your Account</h2>
      {error && <ErrorDisplay>{ error }</ErrorDisplay>}
      <Form onSubmit={ (e) => handleSubmit(e) }>
        <InputContainer>
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          name="email"
          id="email"
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
          value={loginDetails.password}
          onChange={ (e) => handleChange(e) }
          />
        </InputContainer>
        <input type="submit" value="Log In" />
      </Form>
      <ToggleLink><AuthLink to="/forgot_password">FORGOT YOUR DETAILS?</AuthLink></ToggleLink>  
    </FormContainer>
  )
}
//<ToggleLink>Don't have an Account Sign Up ? <AuthLink to="/signup">Sign Up</AuthLink></ToggleLink> 