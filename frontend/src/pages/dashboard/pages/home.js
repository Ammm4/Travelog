import React, { useEffect } from 'react';
import styled from 'styled-components';
import Share from '../components/Share';
import Post from '../components/Post';
import { getPosts } from '../../../redux/posts/postActions';


import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';

export const PostsWrapper = styled.section`
 margin: 1rem auto;
 width: 100%;
 max-width: 600px;
`

const HomeContainer = styled.section`
 margin-top: 1rem;
 color:#1e1e1e;
`

export default function Home({ setModal }) {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(state => state.Post);
  useEffect(() => {
    dispatch(getPosts())
  },[dispatch]);

  if(loading) {
    return <Loading />
  }
  return (
    <HomeContainer>
      <Share setModal={setModal}/>
      <PostsWrapper>
        { posts &&
          posts.map(post => <Post key={post.post_id} post={post} setModal={setModal} singlePost={false}/>)
        }    
      </PostsWrapper>
    </HomeContainer>
  )
}

//<Post key={post.post_id} postId={post.post_id} setModal={setModal} singlePost={false}/>
