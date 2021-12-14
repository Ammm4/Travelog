import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setuser } from '../../redux/users/userActions';


export default function Homepage() {
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setuser())
  },[dispatch]);

  if(user) {
    return <Redirect to='/dashboard' />
  }
  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}
