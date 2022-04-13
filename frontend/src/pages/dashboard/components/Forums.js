import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getForums } from '../../../redux/forums/forumActions';
import Loading1 from './Loading1';
import Forum from './Forum';
import { PostsWrapper } from './Posts';
import Zeropost from './zeropost';

export default function Forums() {
  const { loading, forums } = useSelector(state => state.Forums);
  const { forumsUserType, homePageData } = useSelector(state => state.Globals)
  const [forumMarkerId] = useState(() => {
    if(forumsUserType === 'allUsers') {
      return homePageData.forum.forumMarkerId
    }
  })
  const forumMarkerRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getForums(forumsUserType))
  }, [dispatch, forumsUserType]);

  if(loading) {
    return <Loading1 msg="Forums Loading"/>
  }
  
  return (
    <PostsWrapper>
      { forums && 
        forums.length > 0 ? forums.map(forum => <Forum key={forum._id}  forumMarkerRef={forumMarkerId === forum._id ? forumMarkerRef : null} forum={forum} singleForum={false}/>) : <Zeropost blogType="forum" text="no forums yet"/>
      }
    </PostsWrapper>
  )
}
