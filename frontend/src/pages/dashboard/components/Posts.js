import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getPosts } from '../../../redux/posts/postActions';
import Post from './Post';
import { Wrapper } from './GlobalComponents/StyledComponents/Containers';
import Loading1 from './Loading1';
import Zeropost from '../components/zeropost';

export default function Posts() {
  const { Posts: { loading, posts }, User: { user : { userId } }} = useSelector(state => state);
  const { postsUserType, homePageData, profilePageData, userPageData } = useSelector(state => state.Globals);
  const location = useLocation();
  const [postMarkerId] = useState(() => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      return homePageData.post.postMarkerId
    }
    if(location.pathname.match(/\/dashboard\/profile/)) {
      return profilePageData.post.postMarkerId
    }
    if(location.pathname.match(/\/dashboard\/user_profile/)) {
      return userPageData.post.postMarkerId
    }
  })
  
  const dispatch = useDispatch();
  const postMarkerRef = useRef();

  useEffect(() => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      if(homePageData.post.postMarkerId || !postsUserType) return;
      return dispatch(getPosts(postsUserType,userId))
    }
  if( location.pathname.match(/\/dashboard\/profile/)) {
      if(profilePageData.post.postMarkerId || !postsUserType) return;
      return dispatch(getPosts(postsUserType,userId))
    }
   if( location.pathname.match(/\/dashboard\/user_profile/)) {
      if(userPageData.post.postMarkerId || !postsUserType) return;
      return dispatch(getPosts(postsUserType,userId))
    } 
  }, [dispatch, postsUserType, userId, location, homePageData, profilePageData, userPageData])
  ;

  if(loading) {
    return <Loading1 msg='Posts Loading'/>
  }
  return (
    <Wrapper>
      { 
        posts 
         &&
        posts.length > 0 ? (posts.map(post => <Post key={post._id} postMarkerRef={ postMarkerId === post._id ? postMarkerRef : null} post={post}  singlePost={false}/>)) :  <Zeropost text="no posts yet" blogType="post"/>  
      }  
    </Wrapper>
  )
}
