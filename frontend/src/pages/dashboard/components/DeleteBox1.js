import React from 'react';
import { Container, BtnGroup } from './DeleteBox';
import { PostTitle } from './PostForm';

export default function DeleteBox1({ handleDeletePost, setShowModal }) {
  return <Container>
    <PostTitle> Delete Profile </PostTitle>
    <BtnGroup>
      <label htmlFor='password'>Enter Password</label>
      <input type="password" name="password" id="password"/>
    </BtnGroup>
    <BtnGroup>
      <button className="red-btn" onClick={(e) => handleDeletePost(e)}>Delete</button>
      <button className="green-btn" onClick={() => setShowModal(false)}>Cancel</button>
    </BtnGroup>
  </Container>;
}
