import React, { useRef } from 'react';
import { useReduxSelector, useReduxDispatch, handleModalClick, handleModalClose } from '../../../../utils';
import { createForum, updateForum, updateTheForum } from '../../../../redux/forums/forumActions';
import { ModalContainer } from '../GlobalComponents/StyledComponents/Containers';
import { CloseModalBtn } from '../GlobalComponents/StyledComponents/Buttons';
import Form from '../forumForm/form';
import DeleteBox from './DeleteBox';
import { MdClear } from "react-icons/md";
import Loading1 from '../Loading1';

export default function ForumModal() {
  const {
    Globals: { showModal: { action, forum, singleForum, actionMessage }, forumForm },
  } = useReduxSelector();
  const modalType = action.split(' ')[0];
  const dispatch = useReduxDispatch();
  const forumModalRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    forumModalRef.current.scrollIntoView();
    if(modalType === 'edit') {
     if(singleForum) return dispatch(updateTheForum(forum._id, forumForm))
     return dispatch(updateForum(forum._id, forumForm))
    }
    if(modalType === 'create') {
      dispatch(createForum(forumForm))
    }
  }

  return (
    <ModalContainer className='modal' onClick={(e) => handleModalClick(e,dispatch,'forumModal')}>
      <span ref={ forumModalRef }></span>
      <CloseModalBtn onClick={ () => handleModalClose(dispatch,'forumModal') } > <MdClear /> </CloseModalBtn>
      { actionMessage && <Loading1 msg={ actionMessage } /> }
      { modalType === 'delete' ? <DeleteBox /> : <Form title={action} showForm={ actionMessage }  handleSubmit={handleSubmit}/> }
    </ModalContainer>
  )
}
