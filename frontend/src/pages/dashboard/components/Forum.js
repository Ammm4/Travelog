import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PostForumWrapper } from './GlobalComponents/StyledComponents/Containers';
import { PostForumLink } from './GlobalComponents/StyledComponents/Link';
import { setHomeForumMarkerId, setProfileForumMarkerId, setUserForumMarkerId } from '../../../redux/globals/globalActions';

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
  const location = useLocation();
  useEffect(() => {
    if(!forumMarkerRef) return;
    forumMarkerRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })
  })

  const handleClick = () => {
    if( location.pathname.match(/\/dashboard\/home/)) {
      return dispatch(setHomeForumMarkerId(forum._id))
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return dispatch(setProfileForumMarkerId(forum._id))
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      return dispatch(setUserForumMarkerId(forum._id))
    }  
  }
  
  return (
    <PostForumLink to={`/dashboard/forums/${forum._id}`} onClick={handleClick}>
      <PostForumWrapper ref={forumMarkerRef}>
          <ForumBody forum={forum}/>
      </PostForumWrapper>
    </PostForumLink>
  )
}
