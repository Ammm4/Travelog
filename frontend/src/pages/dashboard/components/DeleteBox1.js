import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Container, BtnGroup } from './DeleteBox';
import { PostTitle } from './PostForm';
import { deleteUser } from '../../../redux/users/userActions';
import Loading from './Loading';

export default function DeleteBox1({ handleDeletePost, setShowModal }) {
  const { loading } = useSelector(state => state.User);
  const [ password,setPassword ] = useState('')
  const dispatch = useDispatch();
  
  if(loading) {
    return <Loading msg="Delete Profile"/>
  }
  return <Container>
    <PostTitle> Delete Profile </PostTitle>
    <BtnGroup>
      <label htmlFor='password'>Enter Password</label>
      <input 
       type="password"
       value={ password }
       name="password" 
       id="password"
       onChange={(e) => setPassword(e.target.value)}/>
    </BtnGroup>
    <BtnGroup>
      <button className="red-btn" onClick={(e) => dispatch(deleteUser({ payload: password }))}>Delete</button>
      <button className="green-btn" onClick={() => setShowModal(false)}>Cancel</button>
    </BtnGroup>
  </Container>;
}
