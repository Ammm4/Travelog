import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowAltCircleLeft } from "react-icons/fa";
const Container = styled.div`
  padding: 0.2rem 0 0 0.2rem;
  z-index: 5;
  button {
    display: inline-block;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    &:hover {
      color: #2a78cd;
    }
  }
`
export default function GoBackBtn() {
  const history = useHistory();
  return (
    <Container className='sticky'>
      <button onClick={() => history.goBack() }><FaArrowAltCircleLeft style={{ fontSize: '2.85rem'}}/></button>
    </Container>
  )
}
