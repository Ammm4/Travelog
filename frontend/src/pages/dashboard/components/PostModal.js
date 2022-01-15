import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import usePostForm from './usePostForm';
import PostForm from './PostForm';
import PostConfirm from './PostConfirm';
import Loading from './Loading';

import { MdClear } from "react-icons/md";
import DeleteBox from './DeleteBox';
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


export default function PostModal({ setModal, postModalInfo }) {
  const { postId, action } = postModalInfo;
  const {
      postLoading,
      singlePostError,
      postEditing,
      success,
      errors,
      msg,
      imageInputRef,
      reviewRef,
      showPostForm,
      showReview, 
      imgPreview,
      destinationInfo, handleDestinationInfo,
      travellerInfo, handleTravellerInfo,
      recommendations, handleRecommendations,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
      handleSubmit,
      handleEditPost,
      handleDeletePost
  } = usePostForm(postId, action);

  useEffect(() => {
    if(singlePostError) {
      setModal(null);
    }
     if(success) {
      setModal(null);
    } 
  }, [singlePostError, success, setModal]);   
   
  
  return (
    <Container >
     <span onClick={ () => setModal(null) } ref={reviewRef} ><MdClear /></span>
       { postLoading && <Loading msg="Post Loading"/> }
       { postEditing && <Loading msg={msg} />} 
       {
         action === 'delete' ? 
           <DeleteBox handleDeletePost={handleDeletePost} setModal={setModal}>
           </DeleteBox>
           :
           <>
           { 
            showPostForm && <PostForm
              errors={errors}
              imageInputRef={imageInputRef}
              imageUploader={imageUploader}
              imgPreview={imgPreview}
              handleFileUpload={handleFileUpload}
              removeImg={removeImg}
              destinationInfo={destinationInfo}
              handleDestinationInfo={handleDestinationInfo}
              travellerInfo={travellerInfo}
              handleTravellerInfo={handleTravellerInfo}
              recommendations={recommendations}
              handleRecommendations={handleRecommendations}
              removeInput={removeInput}
              handleChange={handleChange}
              addMoreInput={addMoreInput} 
              toggleForm={toggleForm}
              handleTitle={handleTitle}
              modalName={ action }
            />
           }

           { 
            showReview && <PostConfirm
            imgPreview={imgPreview}
            destinationInfo={destinationInfo}       
            travellerInfo={travellerInfo}
            recommendations={recommendations}
            toggleForm={toggleForm}
            handleSubmit={ !postId ? handleSubmit : handleEditPost }
            /> 
           }
          </>
          }
    </Container>
  )
}
