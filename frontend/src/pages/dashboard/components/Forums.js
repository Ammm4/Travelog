import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getForums, forumReset } from '../../../redux/forums/forumActions';
import Loading1 from './Loading1';
import Forum from './Forum';
import { Wrapper } from './GlobalComponents/StyledComponents/Containers' ;
import Zeropost from './zeropost';

export default function Forums() {
  const { Forums: { loading, forums }, User: { user: { userId } }} = useSelector(state => state);
  const { forumsUserType, homePageData, profilePageData, userPageData } = useSelector(state => state.Globals);
  const location = useLocation();
  const [forumMarkerId] = useState(() => {
    if( location.pathname.match(/\/dashboard\/home/)) {
      return homePageData.forum.forumMarkerId
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return profilePageData.forum.forumMarkerId
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      return userPageData.forum.forumMarkerId
    }
  })
  const forumMarkerRef = useRef();
  const dispatch = useDispatch();
  
  useEffect(() => {
  dispatch(forumReset())
  if(location.pathname.match(/\/dashboard\/home/)) {
      if(homePageData.forum.forumMarkerId || !forumsUserType) return;
      return dispatch(getForums(userId, forumsUserType))
    }
  if( location.pathname.match(/\/dashboard\/profile/)) {
      if(profilePageData.forum.forumMarkerId || !forumsUserType) return;
      return dispatch(getForums(userId, forumsUserType))
    }
   if( location.pathname.match(/\/dashboard\/user_profile/)) {
      if(userPageData.forum.forumMarkerId || !forumsUserType) return;
      return dispatch(getForums(userId, forumsUserType))
    } 
  }, [dispatch, forumsUserType, userId, location, homePageData, profilePageData, userPageData]);

  if(loading) {
    return <Loading1 msg="Forums Loading"/>
  }
  
  return (
    <Wrapper>
      { 
        forums.length > 0 ? 
        forums.map(forum => <Forum key={forum._id}  forumMarkerRef={ forumMarkerId === forum._id ? forumMarkerRef : null} forum={forum} singleForum={false}/>) 
         : 
        <Zeropost blogType="forum" text="no forums yet"/>
      }
    </Wrapper>
  )
}
