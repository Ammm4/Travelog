import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAlert } from 'react-alert';
import { clearError } from '../../redux/users/userActions';
import { SIGN_UP_USER_RESET } from '../../redux/users/userTypes';

// Components 
import Header from '../Header';
import SignupForm from './components/form';
import Loading from '../dashboard/components/Loading';

const SignupWrapper = styled.section`
 display: flex;
 width: 90%;
 max-width: 875px;
 margin:auto;
 margin-top: 1.75rem;
 padding: 2rem;
`
export default function Signup() {
  const { loading, user, error, success } = useSelector(state => state.User);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if(error) {
      alert.error(error)
      dispatch(clearError());
    }
    if(success) {
      alert.success("Sign Up Successful")
      dispatch({ type: SIGN_UP_USER_RESET})
    }
  }, [alert, dispatch, success, error])

  if (loading) {
    <Loading />
  }

  if(user) {
    return <Redirect to="/dashboard" />
  }
  
  return (
    <>
      <Header />
      <SignupWrapper>
        <SignupForm />
      </SignupWrapper>
    </>
  )
}
