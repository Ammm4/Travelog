import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setPostsUserType, setForumsUserType } from '../../../redux/globals/globalActions';
import Share from '../components/Share';
import PostBar from '../components/PostBar';
import Posts from '../components/Posts';
import Forums from '../components/Forums';
const HomeContainer = styled.section`
 margin-top: 1rem;
 color:#1e1e1e;
`
export default function Home() {
  const [showPost, setShowPost] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPostsUserType('allUsers'))
    dispatch(setForumsUserType('allUsers'))
  },[dispatch])
  return (
    <HomeContainer>
      <Share homepage={true}/>
      <PostBar showPost={showPost} setShowPost={setShowPost}/>
      {
        showPost ? <Posts/> : <Forums />
      }
    </HomeContainer>
  )
}

