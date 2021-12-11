import React from 'react';
import styled from 'styled-components';

//
import { FiInbox } from "react-icons/fi";

const Container = styled.div`
  width: 98%;
  max-width: 600px;
  height: 350px;
  padding: 8px;
  border-radius: 8px;
  margin: 0.5rem auto 1.35rem auto;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Banner = styled.div`
  flex: 1 1 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    display: inline-block;
    width: 110px;
    height: 110px;
    border: 1px solid #000;
    border-radius: 50%;
    font-size: 2.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    flex: 1 1 100%;
    margin-top: 1rem;
    text-align: center;
  }
`


export default function Zeropost() {
  return (
    <Container>
      <Banner>
        <span><FiInbox/></span>
        <h2>No Posts Yet</h2>
      </Banner>
    </Container>
  )
}
