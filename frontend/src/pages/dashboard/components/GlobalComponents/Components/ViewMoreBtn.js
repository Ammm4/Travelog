import React from 'react';
import styled from 'styled-components';
import { CommentContainer } from '../StyledComponents/Containers';
import { Button } from '../StyledComponents/Buttons';
const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #e1e1e1;
`
export default function ViewMoreBtn({ numComments, comments, handleClick }) {
  const totalCommentsLeftToSee = (numComments - comments) <= 3 ? `${numComments - comments} more` : 'more';
  const commentType = (numComments - comments) === 1 ? 'comment' : 'comments';
 
  if(numComments === comments) return <></>
  return (
    <CommentContainer>
      <span></span>
        <Button onClick={handleClick}><Line /> View { totalCommentsLeftToSee } {commentType}</Button>
      <span></span>
    </CommentContainer>
  )
}
