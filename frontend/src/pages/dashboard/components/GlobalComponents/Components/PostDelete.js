import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { GoCircleSlash } from "react-icons/go";

const MockContainer = styled.div`
  position: absolute;
  width:100%;
  max-width: 400px;
  top: 11.5rem; left: 50%;
  transform: translate(-50%,-50%);
`
const DeleteMsg = styled.div`
background-color: #ccc;
padding: 15px 40px;
border-radius: 3px;
  h1{
    text-align: center;
    i {
      color: #ff0101;
    }
  }
`

const Button = styled.button`
  display: block;
  background-color: #021b41;
  color: #fff;
  letter-spacing: 0.8px;
  margin: 1rem auto;
  border-radius: 3px;
  width: 100px;
  height: 40px;
  &:hover {
    background-color: #2a78cd;
  }
`
export default function PostDelete({ blogType }) {
  const history = useHistory();
  return (
    <MockContainer>
      <DeleteMsg> <h1><GoCircleSlash /> <i>{ blogType } DELETED</i></h1></DeleteMsg>
      <Button onClick={() => history.goBack()}>GO BACK</Button>
    </MockContainer>
  )
}
