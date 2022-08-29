import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { resetHomePage, setNavbar } from '../../../redux/globals/globalActions';
import { homeNavbar } from '../../../constants';
import PostBar from '../components/GlobalComponents/Components/PostBar';
import Posts from '../components/Posts/Posts';
import Forums from '../components/Forums/Forums';
const HomeContainer = styled.section`
 color:#1e1e1e;
 margin-top: 5.65rem;
 padding: 0 1.4rem;
 display: grid;
 grid-template-columns: 0.2fr 0.8fr;
 grid-gap: 0.5rem;
 @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 0 0.75rem;
  }
`

export default function Home() {
  const { Globals : { homePage: { showPost } } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setNavbar(homeNavbar))
    function handlePopState() {
      dispatch(resetHomePage())
    }
    window.addEventListener('popstate',handlePopState);
    return () => {
      window.removeEventListener('popstate',handlePopState)
    } 
  },[dispatch])
  return (
    <HomeContainer>
      <PostBar />
      { showPost ? <Posts/> : <Forums /> }
    </HomeContainer>
  )
}

