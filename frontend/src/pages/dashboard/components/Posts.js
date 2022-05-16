import React, { useState, useEffect, useRef } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { useLocation } from 'react-router-dom';
import Post from './Post';
import { Wrapper } from './GlobalComponents/StyledComponents/Containers';
import Share from './Share';
import Loading1 from './Loading1';
import Zeropost from '../components/zeropost';
import { getPosts } from '../../../redux/posts/postActions';
export default function Posts() {
  const { Posts: { loading, posts }, User: { user : { userId } }} = useReduxSelector();
  const { Globals: { postsUserType, homePageData, profilePageData, userPageData }} = useReduxSelector();
  const location = useLocation();
  const dispatch = useReduxDispatch();
  const postMarkerRef = useRef();
  const [{ postMarkerId, showShare }] = useState(() => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      return { postMarkerId: homePageData.post.postMarkerId, showShare: true }
    }
    if(location.pathname.match(/\/dashboard\/profile/)) {
      return { postMarkerId: profilePageData.post.postMarkerId, showShare: true }
    }
    if(location.pathname.match(/\/dashboard\/user_profile/)) {
      return { postMarkerId: userPageData.post.postMarkerId, showShare: false }
    }
  })
  
  useEffect(() => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      if(postMarkerId || !postsUserType) return;
      return dispatch(getPosts(postsUserType,userId))
    }
  if( location.pathname.match(/\/dashboard\/profile/)) {
      if(postMarkerId || !postsUserType) return;
      return dispatch(getPosts(postsUserType,userId))
    }
   if( location.pathname.match(/\/dashboard\/user_profile/)) {
      if(postMarkerId || !postsUserType) return;
      return dispatch(getPosts(postsUserType,userId))
    } 
  }, [dispatch, postsUserType, userId, location, postMarkerId]);
  
  
  if(loading) {
    return <Loading1 msg='Posts Loading'/>
  } 
  return (
    <Wrapper>
      { showShare && <Share />}
      { 
        posts.length > 0 ? (posts.map(post => <Post key={post._id} postMarkerRef={ postMarkerId === post._id ? postMarkerRef : null} post={post} />)) :  <Zeropost text="no posts yet" blogType="post"/>  
      }
    </Wrapper>
  )
}
