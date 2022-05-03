import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal } from '../../../redux/globals/globalActions';
import { createForum, updateForum } from '../../../redux/forums/forumActions';
import { Container, CloseModalBtn } from './PostModal';
import { Container as ForumContainer, BtnGroup, Button } from './DeleteBox';
import DeleteBox from './DeleteBox';
import { PostTitle } from './PostForm';
import { MdClear } from "react-icons/md";

export default function ForumModal() {
  const { showModal: { action }} = useSelector(state => state.Globals);
  const { forum } = useSelector(state => state.Forum)
  const itemToDelete = action.split(' ')[0];
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(itemToDelete === 'edit') {
      setBody(forum.body);
    }
  }, [itemToDelete, forum]);
  
  const handleSubmit = () => {
    if(itemToDelete === 'edit') {
     return dispatch(updateForum(forum._id, { body }))
    }
    if(itemToDelete === 'create') {
      dispatch(createForum({ body }))
    }
  }

  return (
    <Container>
      <CloseModalBtn onClick={ () => dispatch(setShowModal(null)) } > <MdClear /> </CloseModalBtn>
      <ForumContainer>
         <PostTitle>{ action }</PostTitle>
         { itemToDelete === 'delete' && <DeleteBox /> }
         <BtnGroup>
         <label htmlFor='body'>Ask Something ...</label>
         <input 
           type="text"
           value={ body }
           name="body" 
           id="body"
           onChange={(e) => setBody(e.target.value)}/>
         </BtnGroup>
         <BtnGroup>
           <Button className="red-btn" onClick={handleSubmit}>Submit</Button>
           <Button onClick={ () => dispatch(setShowModal(null)) }> Cancel</Button>
         </BtnGroup>
      </ForumContainer>
    </Container>
  )
}
