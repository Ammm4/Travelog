import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { postNavbar } from '../../../constants';
import { getPost } from '../../../redux/posts/postActions';
import { SinglePostContainer, ImageGridWrapper } from '../components/GlobalComponents/StyledComponents/Containers';
import SinglePost from '../components/Post/SinglePost';
import SinglePostImages from '../components/Post/SinglePostImages';
import { setNavbar } from '../../../redux/globals/globalActions';
import SinglePostSkeleton from '../components/Skeleton.js/SinglePostSkeleton';
import DeletedBlog from '../components/Skeleton.js/DeletedBlog';
import { SINGLE_POST_RESET } from '../../../redux/posts/postTypes';

export default function Singlepost() {
  const { post_id } = useParams();
  const { Post: { loading, post }, User: { user : { userId } } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    function handlePopState() {
      dispatch({ type: SINGLE_POST_RESET });
    }
    window.addEventListener('popstate',handlePopState);
    return () => {
      window.removeEventListener('popstate',handlePopState)
    }
  })
  useEffect(() => {
    dispatch(setNavbar(postNavbar))
    dispatch(getPost(post_id, userId));
  }, [post_id, dispatch, userId])
  
  if(loading || Object.keys(post).length < 1) {
    return <SinglePostSkeleton loading={loading}/>
  }
  if(post.deleted) {
    return <DeletedBlog blogType='Post'/>
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



