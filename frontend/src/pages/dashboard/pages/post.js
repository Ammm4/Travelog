import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getSinglePost } from '../../../redux/posts/postActions';

//import Post from '../components/Post';
import SinglePost from '../components/SinglePost';
import SinglePostImages from '../components/SinglePostImages';
import Loading from '../components/Loading';

const SinglePostContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.35fr .65fr;
  grid-template-rows: 100vh;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 50vh;
  }
`
const ImageGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #111111;
  padding: 0%;
`

export default function Singlepost({ setModal }) {
  const { post_id } = useParams();
  const { loading, singlepost:post } = useSelector(state => state.SinglePost);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSinglePost(post_id));
  }, [post_id, dispatch])
  

  if(loading || Object.keys(post).length < 1) {
    return <Loading msg="Post Loading"/>
  }
  return (
    <SinglePostContainer>
      <ImageGridWrapper>
        <SinglePostImages images={ post.images }/>
      </ImageGridWrapper>
      <SinglePost post={post} setModal={ setModal } singlePost={ true } />
    </SinglePostContainer>
  )
}



