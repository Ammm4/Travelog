import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError } from '../../../redux/posts/postActions';
import { NEW_POST_RESET } from '../../../redux/posts/postTypes'
import usePostForm from './usePostForm';
import PostForm from './PostForm';
import PostConfirm from './PostConfirm';
import Loading from './Loading';

import { MdClear } from "react-icons/md";


const Container = styled.div`
 position: fixed;
 top:0; left:0;
 z-index: 2222;
 width: 100%;
 height: 100%;
 overflow: auto;
 background-color: rgba(0,0,0, 0.85);
 span {
   position: absolute;
   right:1rem;
   top: 1rem;
   font-size: 2.5rem;
   color: #fff;
 }
`

export default function PostModal({ setModal, postId }) {
  const { loading, error, success } = useSelector(state => state.NewPost);
  const alert = useAlert();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(error) {
      alert.error(error)
      dispatch(clearError())
    }
     if(success) {
      alert.success('Post Successfully Created');
      dispatch({ type: NEW_POST_RESET})
    }
  }, [error, success, alert, dispatch]); 

  const {
      imageInputRef,
      showPostForm,
      showReview, 
      upLoading,
      msg,
      imgPreview,
      destinationInfo, setDestinationInfo,
      travellerInfo, setTravellerInfo,
      recommendations, setRecommendations,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
      handleSubmit, handlePostSubmit
  } = usePostForm(setModal, postId);
  
  if(loading) {
    return <Loading />
  }
  
  return (
    <Container>
     <span onClick={ () => setModal(null) }><MdClear /></span>

     { showPostForm && <PostForm 
         imageInputRef={imageInputRef}
         imageUploader={imageUploader}
         imgPreview={imgPreview}
         handleFileUpload={handleFileUpload}
         removeImg={removeImg}
         destinationInfo={destinationInfo}
         setDestinationInfo={setDestinationInfo}
         travellerInfo={travellerInfo}
         setTravellerInfo={setTravellerInfo}
         recommendations={recommendations}
         setRecommendations={setRecommendations}
         removeInput={removeInput}
         handleChange={handleChange}
         addMoreInput={addMoreInput} 
         toggleForm={toggleForm}
         handleTitle={handleTitle}
         modalName={postId === 'create' ? 'Create Post' : 'Edit Post'}
      />}

      { showReview && <PostConfirm 
         imgPreview={imgPreview}
         destinationInfo={destinationInfo}       
         travellerInfo={travellerInfo}
         recommendations={recommendations}
         toggleForm={toggleForm}
         handleSubmit={handleSubmit}
      /> }

      { upLoading && <Loading msg={msg} handlePostSubmit={ handlePostSubmit }/>}

    </Container>
  )
}
