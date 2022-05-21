import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { setPageInitialState } from '../../../redux/globals/globalActions';
import PostBar from '../components/PostBar';
import Posts from '../components/Posts';
import Forums from '../components/Forums';
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
  const { Globals : { pageData: { showPost }}} = useReduxSelector();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setPageInitialState('home', 'allUsers', true, true))
  },[dispatch])
  return (
    <HomeContainer>
      <PostBar />
      { showPost ? <Posts/> : <Forums /> }
    </HomeContainer>
  )
}

