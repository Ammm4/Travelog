import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModal } from '../../../redux/globals/globalActions';
import styled from 'styled-components';
import usePostForm from './usePostForm';
import PostForm from './PostForm';
import PostConfirm from './PostConfirm';
import Loading from './Loading';

import { MdClear } from "react-icons/md";
import DeleteBox from './DeleteBox';

export const Container = styled.div`
 position: fixed;
 top:0; left:0;
 z-index: 2222;
 width: 100%;
 height: 100%;
 overflow: auto;
 background-color: rgba(0,0,0, 0.85);
 
`
export const CloseModalBtn = styled.span`
  position: absolute;
  right:1rem;
  top: 1rem;
  font-size: 2.5rem;
  color: #fff;
  &:hover {
    color: #f00;
  }
`

export default function PostModal() {
  const { showModal: { action }} = useSelector(state => state.Globals);
  const modalRef = useRef();
  const {
      singlePostError,
      postEditing,
      success,
      errors,
      images,
      imageInputRef,
      deletedImageIDs,
      showPostForm,
      imgPreview,
      destinationInfo, handleDestinationInfo,
      setDestinationInfo,
      travellerInfo, handleTravellerInfo,
      recommendations, handleRecommendations,
      setRecommendations,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
  } = usePostForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if(singlePostError) {
      dispatch(setShowModal(null));
    }
     if(success) {
      dispatch(setShowModal(null));
    } 
    
  }, [ singlePostError, success, dispatch]); 

  useEffect(() => {
    modalRef.current.scrollIntoView(true);
  }, [showPostForm])

  const handleClose = () => {
    dispatch(setShowModal(null));
  }
  const handleModalClose = (e) => {
    if(e.target.classList.contains('modal')) {
      return handleClose();
    }
  }
  return (
    <Container  className='modal' onClick={ (e) => handleModalClose(e) }>
     <span ref={modalRef}></span>
     <CloseModalBtn  onClick={ handleClose }><MdClear /></CloseModalBtn>
       { postEditing && <Loading />} 
       {
         action === 'delete post' ? 
           <DeleteBox></DeleteBox>
           :
           <>
           { 
            showPostForm && <PostForm
              errors={errors}
              images={images}
              imageInputRef={imageInputRef}
              imageUploader={imageUploader}
              deletedImageIDs={deletedImageIDs}
              imgPreview={imgPreview}
              handleFileUpload={handleFileUpload}
              removeImg={removeImg}
              destinationInfo={destinationInfo}
              handleDestinationInfo={handleDestinationInfo}
              setDestinationInfo={setDestinationInfo}
              travellerInfo={travellerInfo}
              handleTravellerInfo={handleTravellerInfo}
              recommendations={recommendations}
              setRecommendations={setRecommendations}
              handleRecommendations={handleRecommendations}
              removeInput={removeInput}
              handleChange={handleChange}
              addMoreInput={addMoreInput} 
              toggleForm={toggleForm}
              handleTitle={handleTitle}
              modalName={ action }
            />
           }
           { !showPostForm && <PostConfirm toggleForm={ toggleForm } /> }
          </>
          }
    </Container>
  )
}
