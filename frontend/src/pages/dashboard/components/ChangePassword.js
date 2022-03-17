import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, EditHeading } from './profileEdit';
import { commonLabel, commonInput } from './PostForm';
import { ErrorDisplay } from '../../signup/components/form';
import { changePassword } from '../../../redux/users/userActions';
import { BiArrowBack } from "react-icons/bi";
import Loading from './Loading';
import { UPDATE_USER_RESET } from '../../../redux/users/userTypes';

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  h2 {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 40px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.8px;
    color: #021b41;
  }
  .form-group {
  margin: 1.5rem auto 0.5rem auto;
  padding: 10px;
  width: 100%;
  }
  label {
  ${commonLabel}
 }
  input {
  ${ commonInput }
  }
 input[type="submit"] {
   color: #fff;
   background-color: #021b41;
   &:hover {
     background-color: #2a78cd;
   }
   &:disabled {
     background-color: #ccc;
   }
  }
   
`
export default function ChangePassword() {
  const { userUpdating, success, user } = useSelector(state => state.User)
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword:''});
  const [btnAble, setBtnAble] = useState(true);
  const [errors, setErrors] = useState({ newPasswordErrors: null, confirmPasswordErrors: null });
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
   let inputErrorCheck = checkForErrors(passwords);
   if(inputErrorCheck) {
     setBtnAble(false)
   } else {
     setBtnAble(true)
   } 
  }, [passwords])

  useEffect(() => {
    if(success){
      dispatch({ type: UPDATE_USER_RESET })
      history.goBack()
    }
  },[success, history, dispatch])

  const handleChange = (e) => {
    setPasswords(prev => ({ ...prev, [e.target.name] : e.target.value }));
    if(e.target.name === 'newPassword') {
      if(e.target.value.length < 8) {
        setErrors(prev => ({ ...prev, newPasswordErrors: 'Password must be at least 8 characters' }))
      } else {
        setErrors(prev => ({ ...prev, newPasswordErrors: null }))
      }
      if(passwords.confirmPassword.length > 0) {
        if(passwords.confirmPassword !== e.target.value) {
          setErrors(prev => ({ ...prev, confirmPasswordErrors: "Passwords do not match" }))
        } else {
          setErrors(prev => ({ ...prev, confirmPasswordErrors: null }))
        }
      }
    }
   if(e.target.name === "confirmPassword") {
     if(e.target.value !== passwords.newPassword) {
          setErrors(prev => ({ ...prev, confirmPasswordErrors: "Passwords do not match" }))
        } else {
          setErrors(prev => ({ ...prev, confirmPasswordErrors: null }))
        }
   }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(user._id,{...passwords}))
  }

  if(userUpdating) {
    return <Loading msg="Password Changing"/>
  }

  return (
    <Container>
      <EditHeading>
        <button onClick={(e) => history.goBack()}><BiArrowBack/> <span>Go Back</span></button>
      </EditHeading>
      
      <Form>
        <h2>Change Password</h2>
        <div className="form-group">
          <label htmlFor="oldPassword"><b>Old Password</b></label>
            <input 
              id="oldPassword" 
              name="oldPassword" 
              type="password"
              value={ passwords.oldPassword }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter Old Password"/>

        </div>
        <div className="form-group">
          <label htmlFor="newPassword"><b>New Password</b></label>
            <input 
              id="newPassword" 
              name="newPassword" 
              type="password"
              value={ passwords.newPassword }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter New Password"/>
          { errors.newPasswordErrors && <ErrorDisplay>{ errors.newPasswordErrors }</ErrorDisplay> }
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword"><b>Confirm New Password</b></label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password"
              value={ passwords.confirmPassword }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter New Password Again"/>
            { errors.confirmPasswordErrors && <ErrorDisplay>{ errors.confirmPasswordErrors }</ErrorDisplay> }
        </div>
        <div className="form-group">
          <input 
            type="submit" 
            value="Change Password" 
            disabled={btnAble}
            onClick={(e) => handleSubmit(e)} />
        </div>
      </Form>   
    </Container>
  )
}

const checkForErrors = (passwords) => {
  let result = true;
  const { oldPassword, newPassword, confirmPassword } = passwords;
  if(oldPassword.trim() === "") {
    result = false
  }
  if(newPassword.length < 8) {
    result = false
  }
  if(confirmPassword.trim() === "" || (newPassword !== confirmPassword)) {
    result = false
  }
  return result;
}
  