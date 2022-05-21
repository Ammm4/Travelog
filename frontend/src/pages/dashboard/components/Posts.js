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
  const { Posts: 
    { loading, posts }, 
    User: { user : { userId } },
    Globals: { pageData: { showCreate, postMarkerId, postsUserType }}
  } = useReduxSelector();
 
  const dispatch = useReduxDispatch();
  const postMarkerRef = useRef();
  useEffect(() => {
    if(postMarkerId || !postsUserType) return;
    dispatch(getPosts(postsUserType, userId))
  },[dispatch, postMarkerId, postsUserType, userId])
 
  if(loading) {
    return <Loading1 msg='Posts Loading'/>
  } 
  return (
    <Wrapper>
      { showCreate && <Share />}
      { 
        posts.length > 0 ? (posts.map(post => <Post key={post._id} postMarkerRef={ postMarkerId === post._id ? postMarkerRef : null} post={post} />)) :  <Zeropost text="no posts yet" blogType="post"/>  
      }
    </Wrapper>
  )
}
