import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { PostWrapper, LinkToPostDetails } from './Post';
import { setHomeForumMarkerId } from '../../../redux/globals/globalActions';
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
export default function Forum({ forum, forumMarkerRef }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!forumMarkerRef) return;
    forumMarkerRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })
  })

  const handleClick = () => {
    dispatch(setHomeForumMarkerId(forum._id))
  }
  
  return (
    <PostWrapper ref={forumMarkerRef}>
      <LinkToPostDetails to={`/dashboard/forums/${forum._id}`} onClick={handleClick}>
        <ForumBody forum={forum}/>
      </LinkToPostDetails>
    </PostWrapper>
  )
}
