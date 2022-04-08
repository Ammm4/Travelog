import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { GoCircleSlash } from "react-icons/go";

const MockContainer = styled.div`
  position: absolute;
  width:100%;
  max-width: 400px;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
`
const DeleteMsg = styled.div`
background-color: #e1e1e1;
  h1{
    text-align: center;
    i {
      color: #ff0101;
    }
  }
`
const MockPostContainer = styled.div`
  margin-top: 10px; 
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`

const MockPost = styled.div`
  width: 100%;
  padding: 8px;
`
const MockHeader = styled.div`
  .author-img {
    display: inline-block;
    min-height: 35px; min-width: 35px;
    border-radius: 50%;
    background-color: #e1e1e1;
  }
  .author-name {
    display: inline-block;
    min-height: 35px; min-width: 100px;
    border-radius: 35px;
    background-color: #e1e1e1;
    margin-left: 10px;
`
const MockContent = styled.div`
  height: 200px;
  background-color: #e1e1e1;
`
const Button = styled.button`
  display: block;
  background-color: #021b41;
  color: #fff;
  letter-spacing: 0.8px;
  margin: 1rem auto;
  width: 100px;
  height: 40px;
  &:hover {
    background-color: #2a78cd;
  }
`
export default function PostDelete() {
  const history = useHistory();
  return (
    <MockContainer>
        <DeleteMsg> <h1><GoCircleSlash /> <i>POST DELETED</i></h1></DeleteMsg>
        <MockPostContainer>
        <MockPost>
          <MockHeader>
            <span className="author-img"></span> 
            <span className="author-name"></span>
          </MockHeader>
          <MockContent />  
        </MockPost>
      </MockPostContainer>
      <Button onClick={() => history.goBack()}>GO BACK</Button>
    </MockContainer>
  )
}
