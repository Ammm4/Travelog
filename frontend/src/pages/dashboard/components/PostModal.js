import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

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
  const {
      imageInputRef,
      showPostForm,
      showReview, 
      upLoading,
      msg, 
      titles, 
      imgPreview,
      destinationInfo, setDestinationInfo,
      travellerInfo, setTravellerInfo,
      recommendations, setRecommendations,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
      handleSubmit, handlePostSubmit
  } = usePostForm(setModal, postId)
  
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
         titles={titles}
         handleTitle={handleTitle}
         modalName={postId === 'create' ? 'Create Post' : 'Edit Post'}
      />}

      { showReview && <PostConfirm 
         imgPreview={imgPreview}
         destinationInfo={destinationInfo}       
         travellerInfo={travellerInfo}
         recommendations={recommendations}
         titles={titles}
         toggleForm={toggleForm}
         handleSubmit={handleSubmit}
      /> }

      { upLoading && <Loading msg={msg} handlePostSubmit={ handlePostSubmit }/>}

    </Container>
  )
}
