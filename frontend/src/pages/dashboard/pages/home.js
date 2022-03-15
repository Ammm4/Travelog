import React, {useEffect} from 'react';
import styled from 'styled-components';
import { getPosts } from '../../../redux/posts/postActions';
import Share from '../components/Share';
import Post from '../components/Post';

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
  const { loading, posts } = useSelector(state => state.Post);
  let Posts = [ ...posts];
  let newPosts = Posts.reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  
 if(loading) {
   return <Loading msg="Posts Loading"/>
 }
  return (
    <HomeContainer>
      <Share setModal={setModal} homepage={true}/>
      <PostsWrapper>
        { newPosts &&
          newPosts.map(post => <Post key={post.post_id} post={post} setModal={setModal} singlePost={false}/>)
        }    
      </PostsWrapper>
    </HomeContainer>
  )
}


