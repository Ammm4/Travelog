import React, { useState, useEffect, useRef } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { useLocation } from 'react-router-dom';
import Loading1 from './Loading1';
import Forum from './Forum';
import { Wrapper } from './GlobalComponents/StyledComponents/Containers' ;
import Zeropost from './zeropost';
import Share from './Share';
import { getForums, forumReset } from '../../../redux/forums/forumActions';

export default function Forums() {
  const { Forums: { loading, forums }, User: { user: { userId } }, 
    /* Globals: { 
      forumsUserType, homePageData, profilePageData, userPageData } */
     Globals: { pageData: { showCreate, forumMarkerId, forumsUserType } } 
  } = useReduxSelector();
  //const location = useLocation();
  const forumMarkerRef = useRef();
  const dispatch = useReduxDispatch();
  /* const [{ forumMarkerId, showShare }] = useState(() => {
    if( location.pathname.match(/\/dashboard\/home/)) {
      return { forumMarkerId: homePageData.forum.forumMarkerId, showShare:true }
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return { forumMarkerId: profilePageData.forum.forumMarkerId, showShare:true }
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      return { forumMarkerId: userPageData.forum.forumMarkerId, showShare: false }
    }
  }) */
  useEffect(() => {
    if(forumMarkerId || !forumsUserType) return;
      return dispatch(getForums(userId, forumsUserType))
  },[dispatch, forumsUserType, userId, forumMarkerId])
  /* useEffect(() => {
    dispatch(forumReset());
    if(location.pathname.match(/\/dashboard\/home/)) {
      if(forumMarkerId || !forumsUserType) return;
      return dispatch(getForums(userId, forumsUserType))
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      if(forumMarkerId || !forumsUserType) return;
      return dispatch(getForums(userId, forumsUserType))
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      if(forumMarkerId || !forumsUserType) return;
      return dispatch(getForums(userId, forumsUserType))
    } 
  }, [dispatch, forumsUserType, userId, location, forumMarkerId]); */

  if(loading) {
    return <Loading1 msg="Forums Loading"/>
  }
  
  return (
    <Wrapper>
      { showCreate && <Share />}
      { 
        forums.length > 0 ? 
        forums.map(forum => <Forum key={forum._id}  forumMarkerRef={ forumMarkerId === forum._id ? forumMarkerRef : null} forum={forum} singleForum={false}/>) 
         : 
        <Zeropost blogType="forum" text="no forums yet"/>
      }
    </Wrapper>
  )
}
