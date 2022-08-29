import React from 'react';
import styled,{ keyframes } from 'styled-components';

const rotateAnimation = keyframes`
 100% { transform: rotate(360deg); }
`
const Container = styled.div`
 position: absolute;
 top: 0; left: 0;
 bottom:0; right:0;
 background: rgba(0,0,0,0.8);
 z-index: 8000;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;

`
const Spinner = styled.div`
 width: 120px;
 height: 120px;
 border-radius: 50%;
 border-bottom: 2px solid #fff;
 animation-name: ${rotateAnimation};
 animation-duration: 1s;
 animation-iteration-count: infinite;
`

const LoadingText = styled.h2`
 margin-top: 2rem;
 font-family: 'Montserrat Alternates', sans-serif;
 color: #fff;
`


export default function Loading({ msg }) {
    return ( <Container>
                <Spinner/>
                <LoadingText> { msg }...</LoadingText>
             </Container>   
          )
  } 
  

