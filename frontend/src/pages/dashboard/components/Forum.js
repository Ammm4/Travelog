import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ForumBody from './ForumBody';
import { PostForumWrapper } from './GlobalComponents/StyledComponents/Containers';
import { PostForumLink } from './GlobalComponents/StyledComponents/Link';
import { setHomeForumMarkerId, setProfileForumMarkerId, setUserForumMarkerId } from '../../../redux/globals/globalActions';


export default function Forum({ forum, forumMarkerRef }) {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if(!forumMarkerRef) return;
    forumMarkerRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })
  },[forumMarkerRef])

  const handleClick = (forumId) => {
    if( location.pathname.match(/\/dashboard\/home/)) {
      return dispatch(setHomeForumMarkerId(forumId))
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return dispatch(setProfileForumMarkerId(forumId))
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      return dispatch(setUserForumMarkerId(forumId))
    }  
  }
  
  return (
    <PostForumLink to={`/dashboard/forums/${forum._id}`} onClick={() => handleClick(forum._id)}>
      <PostForumWrapper ref={forumMarkerRef}>
          <ForumBody forum={forum}/>
      </PostForumWrapper>
    </PostForumLink>
  )
}
