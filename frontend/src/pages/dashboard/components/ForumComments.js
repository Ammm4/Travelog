import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ForumComment from './ForumComment';

const CommentsContainer = styled.div`
   width: 100%;
   max-width: 750px;
   margin: auto;
`

export default function ForumComments() {
  const { forum: { comments } } = useSelector(state => state.Forum);
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
