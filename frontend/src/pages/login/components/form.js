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
  h1 {
   font-family: 'Montserrat Alternates', sans-serif;
   font-size: 2.25rem;
   text-align: center;
   margin-bottom: 3rem;
   letter-spacing: 1px;
  }

`
export const Form = styled.form`
  input[type="submit"] {
    width: 100%;
    max-width: 400px;
    outline: none;
    padding: 10px 16px;
    border: 1px solid #eee;
    margin: 1rem auto;
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-radius: 10px;
    &:hover {
      background-color: #ccc;
      color: #fff
    }
  }
`
export const InputContainer = styled.div`
  margin: 1rem auto;
  label {
    display: block;
    margin-bottom: 0.3rem;
    letter-spacing: 1px;
    font-weight: 500;
  }

  input[type="password"], input[type="email"], input[type="text"]{
    outline: none;
    width: 100%;
    max-width: 400px;
    border: 1px solid #eee;
    font-size: 0.9rem;
    letter-spacing: 1px;
    padding: 10px 16px;
    border-radius: 10px;
  }
  
`
const LoginErr = styled.p`
  color: red;
  font-size: 1rem;
`
export const ToggleLink = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;

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
      <h1>Log In</h1>
      {error && <ErrorDisplay>{ error }</ErrorDisplay>}
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
      <ToggleLink><Link to="#">Forgot Password?</Link></ToggleLink>
      <ToggleLink>Don't have an Account Sign Up ? <Link to="/signup">Sign Up</Link></ToggleLink> 
    </FormContainer>
  )
}
