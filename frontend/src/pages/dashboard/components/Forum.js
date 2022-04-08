import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PostWrapper, 
  LinkToPostDetails, 
} from './Post';
import ForumBody from './ForumBody';
export const ForumNumbers = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1.2rem 1rem 0;
  .number{
    font-size: 1.85rem;
  }
`
export default function Forum({ forum }) {
  const location = useLocation();
  return (
    <PostWrapper>
      <LinkToPostDetails to={`${location.pathname}/forums/${forum._id}`}>
        <ForumBody forum={forum}/>
      </LinkToPostDetails>
    </PostWrapper>
  )
}
