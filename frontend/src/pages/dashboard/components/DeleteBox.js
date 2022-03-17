import React from 'react';
import styled from 'styled-components';
import { PostTitle, commonLabel, commonInput, BtnAdd} from './PostForm';

export const Container = styled.div`
  margin: auto;
  margin-top: 15%;
  border-radius: 10px;
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
export default function DeleteBox({ handleDeletePost, setModal, title }) {
  
  return (
    <Container>
      <PostTitle>{ title }</PostTitle>
      <p>Do you confirm to delete the profile ?</p>
      <BtnGroup>
        <Button className="red-btn" onClick={(e) => handleDeletePost(e)}>Confirm</Button>
        <Button className="green-btn" onClick={() => setModal(null)}>Cancel</Button>
      </BtnGroup>
    </Container>
  )
}
