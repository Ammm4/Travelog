import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import styled from 'styled-components';
import PostDelete from '../components/PostDelete';
import { getPost } from '../../../redux/posts/postActions';

import SinglePost from '../components/SinglePost';
import SinglePostImages from '../components/SinglePostImages';
import Loading from '../components/Loading';
import { setPageInitialState, setLoadingMessage } from '../../../redux/globals/globalActions';

const SinglePostContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: ${ props => props.expand ? '1fr' : '1.35fr 0.65fr'};
  grid-template-rows: 100vh auto;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: ${ props => props.expand ? '100vh' : '50vh auto'};
  }
`
const ImageGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #111111;
  padding: 0%;
`

export default function Singlepost() {
  const { post_id } = useParams();
  const { Post: { loading, post }, User: { user : { userId }}} = useReduxSelector();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setPageInitialState(null,null))
    dispatch(getPost(post_id, userId));
  }, [post_id, dispatch, userId])
  
 /*  useEffect(() => {
    dispatch(setLoadingMessage('Post Loading'));
  }, [loading, dispatch]) */

  if(loading || Object.keys(post).length < 1) {
    return <Loading />
  }
  if(post.deleted) {
    return <PostDelete />
  }
  
  return (
    <SinglePostContainer expand={ post.expand }>
      <ImageGridWrapper>
        <SinglePostImages />
      </ImageGridWrapper>
      <SinglePost/>
    </SinglePostContainer>
  )
}



