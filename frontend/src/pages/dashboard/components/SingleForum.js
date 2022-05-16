import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getForum } from '../../../redux/forums/forumActions';
import { PostContainer } from './GlobalComponents/StyledComponents/Containers';
import ForumBody from './ForumBody';
import ForumComments from './ForumComments';
import Loading from './Loading';
import CreateComment from './CreateComment';
import GoBackBtn from './GoBackBtn';
import { setPageInitialState } from '../../../redux/globals/globalActions';

export const ForumContainer = styled.div`
   width: 100%;
   max-width: 750px;
   margin: 70px auto 15px auto;
   border-bottom: 1px solid #021b41;
`
export default function SingleForum() {
  const { forumId } = useParams();
  const { Forum : { loading, forum } , User : { user: { userId } }, Globals: { showCreateComment }} = useSelector(state => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setPageInitialState(null,null))
    dispatch(getForum(forumId, userId));
  }, [forumId, dispatch, userId])
  
  if(loading || Object.keys(forum).length < 1) {
    return <Loading msg="Forum Loading"/>
  }
  
  return (
    <PostContainer style={{ paddingTop:'0', marginBottom: '80px' }}>
      <GoBackBtn />
      <ForumContainer>
        <ForumBody forum={ forum } singleForum={ true }/>
      </ForumContainer>
      <ForumComments />
      { showCreateComment && <CreateComment forum = { forum }/> }    
    </PostContainer>
  )
}
