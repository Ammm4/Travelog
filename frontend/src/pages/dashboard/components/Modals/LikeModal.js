import React, { useEffect } from 'react';
import { useReduxSelector, useReduxDispatch, handleModalClick, handleModalClose } from '../../../../utils';
import { ModalContainer, PostFormWrapper } from '../GlobalComponents/StyledComponents/Containers';
import { PostTitle } from '../GlobalComponents/StyledComponents/Headings';
import { CloseModalBtn } from '../GlobalComponents/StyledComponents/Buttons';
import { MdClear } from 'react-icons/md';
import { getLikes } from '../../../../redux/likes';
import Likes from '../Likes/Likes';


export default function LikeModal() {
  const { Globals: { showModal: { type, id } }} = useReduxSelector()
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getLikes(type,id))
  },[dispatch, type, id])
  
  return (
    <ModalContainer  className='modal' onClick={ (e) => handleModalClick(e, dispatch, 'likeModal') }>
      <CloseModalBtn  onClick={ () => handleModalClose(dispatch, 'likeModal') }><MdClear /></CloseModalBtn>
      <PostFormWrapper>
        <PostTitle>Likes</PostTitle>
        <Likes />
      </PostFormWrapper>
    </ModalContainer>
  )
}
