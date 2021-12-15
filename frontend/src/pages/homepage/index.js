import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Homepage() {
  const { user } = useSelector(state => state.User);

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
