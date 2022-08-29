import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
 0%{ transform: rotate(0deg);}
 100% { transform: rotate(360deg); }
`
const Container = styled.div`
 width: 100%;
 margin-top: 2rem;
 padding: 8px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`
const Spinner = styled.div`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 border: 3.5px solid #ccc;
 border-bottom: 3px solid #888;
 animation-name: ${rotateAnimation};
 animation-duration: 1s;
 animation-iteration-count: infinite;
`
const LoadingText = styled.h3`
 margin-top: 2rem;
 font-family: 'Montserrat Alternates', sans-serif;
 color: ${props => props.color ? '#021b41': '#fff'};
`
export default function Loading1({ msg, color }) {

  return (
    <Container>
      <Spinner />
      <LoadingText color={color}>{ msg && `${msg}...` }</LoadingText>
    </Container>
  )
}
