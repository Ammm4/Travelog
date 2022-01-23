import React from 'react';
import styled from 'styled-components';
import { PostTitle } from './PostForm';

export const Container = styled.div`
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
export const BtnGroup = styled.div`
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
      padding: 10px 16px;
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

    label {
     display: block;
     font-size: 0.9rem;
     margin-bottom: 0.6rem;
     letter-spacing: 1px;
    }

    input {
     outline: none;
     width: 100%;
     max-width: 400px;
     border: 1px solid #eee;
     font-size: 0.9rem;
     letter-spacing: 1px;
     padding: 10px 16px;
     border-radius: 10px;
    }
`
export default function DeleteBox({ handleDeletePost, setModal, title }) {
  
  return (
    <Container>
      <PostTitle>{ title }</PostTitle>
      <p>Do you confirm to delete the profile ?</p>
      <BtnGroup>
        <button className="red-btn" onClick={(e) => handleDeletePost(e)}>Confirm</button>
        <button className="green-btn" onClick={() => setModal(null)}>Cancel</button>
      </BtnGroup>
      
    </Container>
  )
}
