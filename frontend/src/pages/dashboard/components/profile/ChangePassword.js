import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch, handleChangePassword } from '../../../../utils';
import { Container } from './profileEdit';
import ErrorDisplay from '../../../../GlobalComponents/Components/Error';
import GoBackBtn from '../GlobalComponents/Components/GoBackBtn';
import { ProfileHeading } from '../GlobalComponents/StyledComponents/Headings';
import { InputElement, InputLabel } from '../GlobalComponents/StyledComponents/Inputs';
import { resetChangePasswordData } from '../../../../redux/globals/globalActions';
import { changePassword } from '../../../../redux/users/userActions';
import { changePasswordInputs } from '../../../../constants';
import Loading1 from '../Loading1';

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
    Globals: { resetPassword, resetPassword: { oldPassword, btnAbled, errors }}
   } = useReduxSelector()
  const history = useHistory();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if(success) history.push('/dashboard/profile');
    return () => dispatch(resetChangePasswordData())
  },[success, history, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(user._id,{ resetPassword }))
  }

  if(userUpdating) return <Container><Loading1 color={true} msg="Profile Updating" /></Container>
  
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
                   onChange = {(e) => handleChangePassword(e, dispatch, resetPassword, oldPassword) }
                   placeholder={ description }/>
                   { errors && errors[inputName] && <ErrorDisplay>{errors[inputName]}</ErrorDisplay> 
                   }
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


  