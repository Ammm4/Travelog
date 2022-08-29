import React, { useEffect, useRef } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import throttle from 'lodash.throttle';
import Post from './Post';
import { Wrapper } from '../GlobalComponents/StyledComponents/Containers';
import Share from '../GlobalComponents/Components/Share';
import Zeropost from '../GlobalComponents/Components/ZeroPost';
import { getPosts } from '../../../../redux/posts/postActions';
import SeenAll from '../GlobalComponents/Components/SeenAll';
import usePosts from '../hooks/usePosts';
import { RESET_POSTS } from '../../../../redux/posts/postTypes';
import PostSkeleton from '../Skeleton.js/PostSkeleton';
export default function Posts() {
  const { Posts: { loading, posts, hasMorePosts }, 
    User: { user : { userId } },
    Globals: { homePage, profilePage, userPage }
  } = useReduxSelector();
  
  const { pageData: { showCreate, userType, postMarkerId } } = usePosts(homePage,profilePage,userPage);
  const dispatch = useReduxDispatch();
  const postMarkerRef = useRef();
 
  useEffect(() => {
    if(postMarkerId || !userType) return;
    new Promise((resolve) => resolve(dispatch({ type: RESET_POSTS })))
    .then(() => {
      dispatch(getPosts(userType, userId, 1))
    })
  },[dispatch, postMarkerId, userType, userId])
  useEffect(() => {
    function handleScroll() {
      const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 ) {
          if(!hasMorePosts) return
          const pageNumber = Math.floor((posts.length/4) + 1);
          dispatch(getPosts(userType, userId, pageNumber))
        }
      }
     const throttledRequest = throttle(handleScroll, 100);
     window.addEventListener('scroll', throttledRequest)
     return () => window.removeEventListener('scroll', throttledRequest);
  },[ dispatch, posts,  userType, userId, hasMorePosts ])
  
  return (
    <Wrapper>
      { showCreate && <Share />} 
      { 
        posts.length > 0 && (posts.map(post => <Post key={post._id} postMarkerRef={ postMarkerId === post._id ? postMarkerRef : null} post={post} />))  
      }
      {!loading && posts.length < 1 && <Zeropost text="no posts yet" blogType="post"/> }
      {loading && [1,2,3,4].map(n => <PostSkeleton key={n}/>) }
      {!hasMorePosts && <SeenAll />}
    </Wrapper>
  )
}
