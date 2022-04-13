import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setLoadingMessage } from '../../../redux/globals/globalActions';
import { deletePost } from '../../../redux/posts/postActions';
import { deleteForum } from '../../../redux/forums/forumActions';
import { deleteUser } from '../../../redux/users/userActions';
import { setShowModal } from '../../../redux/globals/globalActions';
import { PostTitle, commonLabel, commonInput, BtnAdd } from './PostForm';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  padding: 10px;
  width: 98%;
  max-width: 800px;
  background-color: #fff;

  p {
    margin: 2rem 0;
    color:#004684;
    font-size: 1.15rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: .5px;
  }
`
export const BtnGroup = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 2rem auto;

    label {
     ${commonLabel}
    }

    input {
     ${commonInput}
    }
`
export const Button = styled(BtnAdd)`
   display: block;
   margin: 1.65rem auto;
   width: 99%;
  `
export default function DeleteBox() {
  const { showModal: { action } } = useSelector(state => state.Globals);
  const { singlepost: { _id: postId, images } } = useSelector(state => state.SinglePost);
  const { forum } = useSelector(state => state.Forum);
  const [ password, setPassword ] = useState('')
  const [ showConfirm, setShowConfirm ] = useState(false);
  const dispatch = useDispatch();
  const itemToDelete = action.split(' ')[1];
  const handleDelete = () => {
    if(itemToDelete === 'post') {
      dispatch(setLoadingMessage('Deleting Post'))
      dispatch(deletePost(postId))
      return dispatch(setShowModal(null))
    }
    if(itemToDelete === 'forum') {
      dispatch(deleteForum(forum._id));
       return dispatch(setShowModal(null))
    }
    if(itemToDelete === 'profile') {
      setShowConfirm(true);
    }
  }
  return (
    <Container>
      <PostTitle>{ action }</PostTitle>
      { !showConfirm && <p>Do you confirm to delete the { itemToDelete } ?</p> }
      { showConfirm 
         &&  
        <BtnGroup>
          <label htmlFor='password'>Enter Password</label>
          <input 
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
          <Button className="red-btn" onClick={(e) => dispatch(deleteUser({ payload: password }))}>Delete</Button>
           :
          <Button onClick={handleDelete}>Confirm</Button>
        } 
        <Button onClick={() => dispatch(setShowModal(null))}>Cancel</Button>
      </BtnGroup>
    </Container>
  )
}
