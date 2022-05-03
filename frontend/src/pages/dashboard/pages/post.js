import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostDelete from '../components/PostDelete';
import { getPost } from '../../../redux/posts/postActions';

import SinglePost from '../components/SinglePost';
import SinglePostImages from '../components/SinglePostImages';
import Loading from '../components/Loading';
import { setLoadingMessage } from '../../../redux/globals/globalActions';

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
  const [ expand, setExpand ] = useState(false);
  const { post_id } = useParams();
  const { Post: { loading, post }, User: { user : { userId }}} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
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
    <SinglePostContainer expand={ expand }>
      <ImageGridWrapper>
        <SinglePostImages expand={ expand } setExpand={ setExpand }/>
      </ImageGridWrapper>
      <SinglePost/>
    </SinglePostContainer>
  )
}



