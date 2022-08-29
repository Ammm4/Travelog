import React, { useRef, useEffect } from 'react';
import { useReduxDispatch, handleModalClose ,handleModalClick } from '../../../../utils';
import { ModalContainer } from '../GlobalComponents/StyledComponents/Containers';
import { CloseModalBtn } from '../GlobalComponents/StyledComponents/Buttons';
import usePostForm from '../hooks/usePostForm';
import PostForm from '../postForm/PostForm';
import PostConfirm from '../PostConfirm/PostConfirm';
import Loading1 from '../Loading1';
import { MdClear } from "react-icons/md";
import DeleteBox from './DeleteBox';

export default function PostModal() {
  const { action, showPostForm, actionMessage } = usePostForm();
  const modalRef = useRef();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    modalRef.current.scrollIntoView();
  }, [showPostForm])

  return (
    <ModalContainer  className='modal' onClick={ (e) => handleModalClick(e, dispatch, 'postModal') }>
      <span ref={ modalRef }></span>
      <CloseModalBtn  onClick={() => handleModalClose(dispatch, 'postModal') }><MdClear /></CloseModalBtn>
      { actionMessage && <Loading1 msg={ actionMessage }/> }
      { action === 'delete post' ? <DeleteBox /> : showPostForm ? <PostForm /> : <PostConfirm modalRef={modalRef}/> }
    </ModalContainer>
  )
}

