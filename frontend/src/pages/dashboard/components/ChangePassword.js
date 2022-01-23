import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, EditHeading } from './profileEdit';
import { ErrorDisplay } from '../../signup/components/form';
import { changePassword } from '../../../redux/users/userActions';
import { BiArrowBack } from "react-icons/bi";
import Loading from './Loading';
import { UPDATE_USER_RESET } from '../../../redux/users/userTypes';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  
  .form-group {
  margin: 0.5rem auto 0.5rem auto;
  padding: 10px;
  width: 100%;
  }

  label {
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  letter-spacing: 1px;
 }
  input {
  outline: none;
  width: 99%;
  border: 1px solid #eee;
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 10px 16px;
  border-radius: 10px;
   &:focus {
    border: 1px solid #111;
   }
  }
 input[type="submit"] {
   color: white;
   background-color: green;
   &:disabled {
     background-color: red;
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
        <h2>Change Password</h2>
      </EditHeading>
      <Form>
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
  