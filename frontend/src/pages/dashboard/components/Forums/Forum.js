import React, { useEffect } from 'react';
import ForumBody from '../GlobalComponents/Components/ForumBody';
import { PostForumWrapper } from '../GlobalComponents/StyledComponents/Containers';
import ForumSkeleton from '../Skeleton.js/ForumSkeleton';


export default function Forum({ forum, forumMarkerRef, singleForum }) {
  useEffect(() => {
    if(!forumMarkerRef) return;
    forumMarkerRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })
  },[forumMarkerRef])

  if(forum.deleted) return <ForumSkeleton deleted={true} forumMarkerRef={forumMarkerRef}/>
  return (
      <PostForumWrapper ref={forumMarkerRef} >
          <ForumBody forum={forum} singleForum={singleForum} />
      </PostForumWrapper>
  )
}
