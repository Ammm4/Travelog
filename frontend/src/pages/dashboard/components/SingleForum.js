import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getForum } from '../../../redux/forums/forumActions';
import { PostContainer } from './SinglePost';
import ForumBody from './ForumBody';
import ForumComments from './ForumComments';
import Loading from './Loading';
import CreateComment from './CreateComment';
import GoBackBtn from './GoBackBtn';

export const ForumContainer = styled.div`
   width: 100%;
   max-width: 750px;
   margin: 70px auto 15px auto;
   border-bottom: 1px solid #021b41;
`
export default function SingleForum() {
  const { forumId } = useParams();
  const { loading, forum } = useSelector(state => state.Forum);
  const { showCreateComment } = useSelector(state => state.Globals);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getForum(forumId));
  }, [forumId, dispatch])
  
  if(loading || Object.keys(forum).length < 1) {
    return <Loading msg="Forum Loading"/>
  }
  
  return (
    <PostContainer style={{ paddingTop:'0', marginBottom: '80px'}}>
      <GoBackBtn />
      <ForumContainer>
        <ForumBody forum={ forum } singleForum={true}/>
      </ForumContainer>
      <ForumComments />
      { showCreateComment && <CreateComment forum = { forum }/> }    
    </PostContainer>
  )
}
