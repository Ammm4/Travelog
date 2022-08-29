import React, { useEffect, useRef } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import throttle from 'lodash.throttle';
import usePosts from '../hooks/usePosts';
import Forum from './Forum';
import { Wrapper } from '../GlobalComponents/StyledComponents/Containers' ;
import Zeropost from '../GlobalComponents/Components/ZeroPost';
import Share from '../GlobalComponents/Components/Share';
import { getForums } from '../../../../redux/forums/forumActions';
import ForumSkeleton from '../Skeleton.js/ForumSkeleton';
import SeenAll from '../GlobalComponents/Components/SeenAll';
import { RESET_FORUMS } from '../../../../redux/forums/forumTypes';
export default function Forums() {
  const { Forums: { loading, forums, hasMoreForums }, 
    User: { user: { userId } }, 
     Globals: { homePage, profilePage, userPage } 
  } = useReduxSelector();
  const { pageData: { userType, showCreate, forumMarkerId } } = usePosts(homePage, profilePage, userPage)
  const forumMarkerRef = useRef();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if(forumMarkerId || !userType) return;
    new Promise((resolve) => resolve(dispatch({ type: RESET_FORUMS })))
    .then(() => {
      dispatch(getForums(userType, userId, 1))
    })
   },[dispatch, userType, userId, forumMarkerId])
  useEffect(() => {
    function handleScroll() {
       const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 ) {
          if(!hasMoreForums) return 
          const pageNumber = Math.floor((forums.length/3) + 1);
          dispatch(getForums( userType, userId, pageNumber))
        }
      }
     const throttledRequest = throttle(handleScroll, 100);
     window.addEventListener('scroll', throttledRequest)
     return () => window.removeEventListener('scroll', throttledRequest);
  },[dispatch, forums, userType, userId, hasMoreForums ])
  
  return (
    <Wrapper>
      { showCreate && <Share />} 
      { 
        forums.length > 0 && forums.map(forum => <Forum key={forum._id}  forumMarkerRef={ forumMarkerId === forum._id ? forumMarkerRef : null} forum={forum} singleForum={false}/>)  
      }
      {!loading && forums.length < 1 && <Zeropost text="no forums yet" blogType="forum"/> }
      {loading && [1,2,3,4].map(n => <ForumSkeleton key={n}/>) }
      {!hasMoreForums && <SeenAll />}
    </Wrapper>
  )
}
