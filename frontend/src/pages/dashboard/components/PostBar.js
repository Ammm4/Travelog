import React from 'react';
import styled from 'styled-components';

import { MdOutlineForum } from "react-icons/md";
import { MdGridView } from "react-icons/md";

const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  font-size: 1rem;
  margin: 1rem auto 1.5rem auto;
  background-color: #fff; 
  grid-template-columns: 1fr 1fr;
`
const Button = styled.button`
  display: block;
  position: relative;
  outline: none;
  background-color:#fff;
  cursor: pointer;
  width: 100%;
  margin: 1rem auto 1.5rem auto;
  text-align: center;
  font-size: 1.5rem;
  color:${ props => props.btnStyle ? '#021b41' : '#2671d3'};
  border-bottom: ${ props => props.btnStyle ? '1px solid #021b41' : ''};
  padding: 16px 40px;
  &:hover {
     color:${ props => props.btnStyle ? '#2671d3' : '#021b41'};
     border: none;
   }
   &:hover .tooltip {
     visibility: visible;
   }
   .tooltip {
      visibility: hidden;
      width: 120px;
      background-color: #021b41;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 80%;
      left: 50%;
      margin-left: -60px;
   }
`

export default function PostBar({ showPost, setShowPost }) {
  return (
    <Container className='sticky'>
      <Button btnStyle={showPost} onClick={() => setShowPost(true)}>
        <MdGridView /><span className='tooltip'>Posts</span>
      </Button>
      <Button btnStyle={!showPost} onClick={() => setShowPost(false)}>
        <MdOutlineForum /><span className='tooltip'>Forums</span>
      </Button>
    </Container>
  )
}
