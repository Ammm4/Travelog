import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getPosts } from '../../../redux/posts/postActions';
import Post from './Post';
import Loading1 from './Loading1';

export const PostsWrapper = styled.section`
 margin: 1rem auto;
 width: 100%;
 max-width: 600px;
`
export default function Posts({ setModal }) {
  const { loading, posts } = useSelector(state => state.Post);
  const dispatch = useDispatch();
  let Posts = [ ...posts ];
  let newPosts = Posts.reverse();

  useEffect(() => {
  dispatch(getPosts())
  }, [dispatch]);

  if(loading) {
    return <Loading1 msg='Posts Loading'/>
  }
  return (
    <PostsWrapper>
      { newPosts &&
        newPosts.map(post => <Post key={post.post_id} post={post} setModal={setModal} singlePost={false}/>)
      }  
    </PostsWrapper>
  )
}
