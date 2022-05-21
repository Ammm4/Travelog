import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ForumBody from './ForumBody';
import { PostForumWrapper } from './GlobalComponents/StyledComponents/Containers';
import { PostForumLink } from './GlobalComponents/StyledComponents/Link';
import { setPageDataForumMarkerId } from '../../../redux/globals/globalActions';


export default function Forum({ forum, forumMarkerRef }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!forumMarkerRef) return;
    forumMarkerRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })
  },[forumMarkerRef])

  const handleClick = (forumId) => {
    dispatch(setPageDataForumMarkerId(forumId))
  }
  
  return (
    <PostForumLink to={`/dashboard/forums/${forum._id}`} onClick={() => handleClick(forum._id)}>
      <PostForumWrapper ref={forumMarkerRef}>
          <ForumBody forum={forum}/>
      </PostForumWrapper>
    </PostForumLink>
  )
}
