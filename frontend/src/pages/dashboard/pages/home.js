import React, { useState } from 'react';
import styled from 'styled-components';
import Share from '../components/Share';
import PostBar from '../components/PostBar';
import Posts from '../components/Posts';
import Forums from '../components/Forums';
import { setShowModal } from '../../../redux/globals/globalActions';
const HomeContainer = styled.section`
 margin-top: 1rem;
 color:#1e1e1e;
`
export default function Home({ setModal }) {
  const [showPost, setShowPost] = useState(true);
  
  return (
    <HomeContainer>
      <Share homepage={true}/>
      <PostBar showPost={showPost} setShowPost={setShowPost}/>
      {
        showPost ? <Posts setModal={setModal}/> : <Forums />
       }
    </HomeContainer>
  )
}

