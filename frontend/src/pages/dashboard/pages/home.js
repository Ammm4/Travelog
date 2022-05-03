import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setPageInitialState, setShowPostHome } from '../../../redux/globals/globalActions';
import Share from '../components/Share';
import PostBar from '../components/PostBar';
import Posts from '../components/Posts';
import Forums from '../components/Forums';

const HomeContainer = styled.section`
 margin-top: 1rem;
 color:#1e1e1e;
`
export default function Home() {
  const { homePageData: { showPost }} = useSelector(state => state.Globals)
  const dispatch = useDispatch();
  const setShowPost = () =>{
    dispatch(setShowPostHome(!showPost))
  }
  useEffect(() => {
    dispatch(setPageInitialState('home', 'allUsers'))
  },[dispatch])
  return (
    <HomeContainer>
      <Share homepage={ true }/>
      <PostBar showPost={ showPost } setShowPost={ setShowPost } />
      { showPost ? <Posts/> : <Forums /> }
    </HomeContainer>
  )
}

