import React, { useState } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { deletePost, deleteThePost } from '../../../../redux/posts/postActions';
import { deleteForum, deleteTheForum } from '../../../../redux/forums/forumActions';
import { deleteUser } from '../../../../redux/users/userActions';
import { setShowModal } from '../../../../redux/globals/globalActions';
import { PostTitle } from '../GlobalComponents/StyledComponents/Headings';
import { InputElement, InputLabel } from '../GlobalComponents/StyledComponents/Inputs';
import { DeleteContainer, BtnGroup} from '../GlobalComponents/StyledComponents/Containers'
import { DeleteButton } from '../GlobalComponents/StyledComponents/Buttons';

export default function DeleteBox() {
  const { Globals: { showModal: { action, post, forum, singleForum, singlePost, actionMessage } } } = useReduxSelector();
  const [ password, setPassword ] = useState('')
  const [ showConfirm, setShowConfirm ] = useState(false);
  const dispatch = useReduxDispatch();
  const itemToDelete = action.split(' ')[1];
  const handleDelete = () => {
    if(itemToDelete === 'post') {
      if(singlePost){
        dispatch(deleteThePost(post._id))
      } else {
        dispatch(deletePost(post._id))
      } 
    }
    if(itemToDelete === 'forum') {
      if(singleForum) dispatch(deleteTheForum(forum._id));
      dispatch(deleteForum(forum._id));
    }
    if(itemToDelete === 'profile') {
      setShowConfirm(true);
    }
  }
  if(actionMessage) return <></>
  return (
    <DeleteContainer>
      <PostTitle>{ action }</PostTitle>
      { !showConfirm && <p>Do you confirm to delete the { itemToDelete } ?</p> }
      { showConfirm 
         &&  
        <BtnGroup>
          <InputLabel htmlFor='password'>Enter Password</InputLabel>
          <InputElement 
          type="password"
          value={ password }
          name="password" 
          id="password"
          onChange={(e) => setPassword(e.target.value)}/>
         </BtnGroup>
      }
      <BtnGroup>
        { 
          showConfirm ? 
          <DeleteButton className="red-btn" onClick={(e) => dispatch(deleteUser({ payload: password }))}>Delete</DeleteButton>
           :
          <DeleteButton onClick={handleDelete}>Confirm</DeleteButton>
        } 
        <DeleteButton onClick={() => dispatch(setShowModal(null))}>Cancel</DeleteButton>
      </BtnGroup>
    </DeleteContainer>
  )
}
