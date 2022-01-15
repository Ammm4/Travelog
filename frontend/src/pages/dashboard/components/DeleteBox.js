import React from 'react';
import styled from 'styled-components';
import { PostTitle } from './PostForm';

const Container = styled.div`
  margin: auto;
  margin-top: 15%;
  border-radius: 10px;
  padding: 10px;
  width: 98%;
  max-width: 800px;
  background-color: #fff;

  p {
    margin-top: 2rem;
    text-align: center;
    letter-spacing: 1px;
  }
`
const BtnGroup = styled.div`
    width: 100%;
    max-width: 250px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    button {
      display: inline-block;
      letter-spacing: 1px;
      margin: 0.4rem;
      padding: 8px 16px;
      border-radius: 5px;
      font-family: inherit;
      outline: none;
      border: none;
    }
    .red-btn:hover {
      background-color: red;
      color: #fff;
    }
    .green-btn:hover {
      background-color: green;
      color: #fff;
    }
`
export default function DeleteBox({ handleDeletePost, setModal }) {
  
  return (
    <Container>
      <PostTitle>Delete Post</PostTitle>
      <p>Do you confirm to delete the post ?</p>
      <BtnGroup>
        <button className="red-btn" onClick={(e) => handleDeletePost(e)}>Confirm</button>
        <button className="green-btn" onClick={() => setModal(null)}>Cancel</button>
      </BtnGroup>
      
    </Container>
  )
}
