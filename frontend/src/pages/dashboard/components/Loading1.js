import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
 0%{ transform: rotate(0deg);}
 100% { transform: rotate(360deg); }
`
const Container = styled.div`
 width: 100%;
 padding: 8px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`
const Spinner = styled.div`
 width: 30px;
 height: 30px;
 border-radius: 50%;
 border: 3px solid #ccc;
 border-bottom: 3px solid #888;
 animation-name: ${rotateAnimation};
 animation-duration: 1s;
 animation-iteration-count: infinite;
`
const LoadingText = styled.h2`
 margin-top: 2rem;
 font-family: 'Montserrat Alternates', sans-serif;
 color: #021B41;
`
export default function Loading1({ msg }) {
  return (
    <Container>
      <Spinner />
      <LoadingText>{ msg && `${msg}...`}</LoadingText>
    </Container>
  )
}
