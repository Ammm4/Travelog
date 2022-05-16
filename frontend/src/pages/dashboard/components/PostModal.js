import React, { useRef, useEffect } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { resetPostInfo, setShowModal } from '../../../redux/globals/globalActions';
import { ModalContainer } from './GlobalComponents/StyledComponents/Containers';
import { CloseModalBtn } from './GlobalComponents/StyledComponents/Buttons';
import usePostForm from './usePostForm';
import PostForm from './PostForm';
import PostConfirm from './PostConfirm';
import Loading from './Loading';
import { MdClear } from "react-icons/md";
import DeleteBox from './DeleteBox';

export default function PostModal() {
  const { Globals: { showModal: { action, showPostForm } } } = useReduxSelector();
  const modalRef = useRef();
  const {
      singlePostError,
      postEditing,
      success,
      toggleForm,
  } = usePostForm();
  const dispatch = useReduxDispatch();

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
    dispatch(resetPostInfo());
    dispatch(setShowModal(null));
  }
  const handleModalClose = (e) => {
    if(e.target.classList.contains('modal')) {
      return handleClose();
    }
  }
  return (
    <ModalContainer  className='modal' onClick={ (e) => handleModalClose(e) }>
      <span ref={ modalRef }></span>
      <CloseModalBtn  onClick={ handleClose }><MdClear /></CloseModalBtn>
        { postEditing && <Loading />} 
        { action === 'delete post' ? <DeleteBox /> : showPostForm ? <PostForm /> : <PostConfirm toggleForm={ toggleForm } /> }
    </ModalContainer>
  )
}

