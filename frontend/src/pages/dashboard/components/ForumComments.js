import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ForumComment from './ForumComment';
import { getComments } from '../../../redux/forums/forumActions';
import Loading1 from './Loading1';

const CommentsContainer = styled.div`
   width: 100%;
   max-width: 750px;
   margin: auto;
`
export default function ForumComments() {
  const { Forum: { commentLoading, forum: { _id, comments } }, User: { user: { userId }} } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(_id, userId)) 
  }, [dispatch, _id, userId])

  if(commentLoading) {
    return <Loading1 />
  }
  if (comments.length < 1) {
    return <></>
  }
  return (
    <CommentsContainer>
      {
        comments.map(comment => <ForumComment key={comment._id} comment={comment}/>)
      }
    </CommentsContainer>
  )
}
