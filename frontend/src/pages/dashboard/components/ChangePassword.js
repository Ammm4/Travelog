import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { Container } from './profileEdit';
import ErrorDisplay from '../../../GlobalComponents/Components/Error';
import GoBackBtn from './GoBackBtn';
import { ProfileHeading } from './GlobalComponents/StyledComponents/Headings';
import { InputElement, InputLabel } from './GlobalComponents/StyledComponents/Inputs';
import { setResetPassword } from '../../../redux/globals/globalActions';
import { changePassword } from '../../../redux/users/userActions';
import { changePasswordInputs } from '../../../constants';
import Loading from './Loading';
import { UPDATE_USER_RESET } from '../../../redux/users/userTypes';

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  .form-group {
    margin: 1.5rem auto 0.5rem auto;
    padding: 10px;
    width: 100%;
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
  const { 
    User: { userUpdating, success, user },
    Globals: { resetPassword, resetPassword: { oldPassword, newPassword, confirmPassword, btnAbled, errors }}
   } = useReduxSelector()
  const history = useHistory();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if(success){
      dispatch({ type: UPDATE_USER_RESET })
      history.goBack()
    }
  },[success, history, dispatch])

  const handleChange = (e) => { 
    let disableBtn = false;
    dispatch(setResetPassword(e.target.name, e.target.value))
    if(e.target.name === 'newPassword') {
      if(e.target.value.trim().length < 8) {
        disableBtn = true;
        let message = 'Password must be more than 7 characters';
        dispatch(setResetPassword('errors', {...errors, newPassword: message }))
      } else {
        let message = e.target.value !== confirmPassword ? 'Passwords do not match' : '';
        disableBtn = message !== '' || !oldPassword.trim();
        dispatch(setResetPassword('errors', {...errors, newPassword: '', confirmPassword: message})) 
      } 
    } else if(e.target.name === 'confirmPassword') {
       let message = e.target.value !== newPassword ? 'Passwords do not match' : '';
       disableBtn = message !== '' || newPassword.trim().length < 8 || !oldPassword.trim();
       dispatch(setResetPassword('errors', {...errors, confirmPassword: message }))
    } else if(e.target.name === 'oldPassword'){
       disableBtn = !e.target.value.trim() || newPassword.length < 8 || confirmPassword !== newPassword;
    }
    dispatch(setResetPassword('btnAbled', disableBtn ))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(user._id,{resetPassword}))
  }

  if(userUpdating) {
    return <Loading msg="Password Changing"/>
  }

  return (
    <Container>
      <GoBackBtn />
      <Form>
        <ProfileHeading>Change Password</ProfileHeading>
        {
           changePasswordInputs.map(item => {
             const {inputName, title, description } = item;
             return (
               <div className="form-group">
                 <InputLabel htmlFor={inputName}><b>{ title }</b></InputLabel>
                 <InputElement 
                   id={inputName} 
                   name={inputName} 
                   type="password"
                   value={ resetPassword[inputName] }
                   onChange = {(e) => handleChange(e) }
                   placeholder={ description }/>
                   {errors && errors[inputName] && <ErrorDisplay>{errors[inputName]}</ErrorDisplay>}
               </div>
             )
           })
        }
        <div className="form-group">
          <InputElement 
            type="submit" 
            value="Change Password" 
            disabled={btnAbled}
            onClick={(e) => handleSubmit(e)} />
        </div>
      </Form>   
    </Container>
  )
}


  