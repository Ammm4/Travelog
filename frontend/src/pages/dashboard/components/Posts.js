import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getPosts } from '../../../redux/posts/postActions';
import Post from './Post';
import Loading1 from './Loading1';
import Zeropost from '../components/zeropost';

export const PostsWrapper = styled.section`
 margin: 1rem auto;
 width: 100%;
 max-width: 600px;
`
export default function Posts() {
  const { loading, posts } = useSelector(state => state.Post);
  const { postsUserType, homePageData } = useSelector(state => state.Globals);
  const [postMarkerId] = useState(() => {
    if(postsUserType === 'allUsers') {
      return homePageData.post.postMarkerId
    }
  })
  
  const dispatch = useDispatch();
  const postMarkerRef = useRef();
  
  useEffect(() => {
  dispatch(getPosts(postsUserType))
  }, [dispatch, postsUserType]);

  if(loading) {
    return <Loading1 msg='Posts Loading'/>
  }
  return (
    <PostsWrapper>
      { 
        posts 
         &&
        posts.length > 0 ? (posts.map(post => <Post key={post._id} postMarkerRef={ postMarkerId === post._id ? postMarkerRef : null} post={post}  singlePost={false}/>)) :  <Zeropost text="no posts yet" blogType="post"/>  
      }  
    </PostsWrapper>
  )
}
