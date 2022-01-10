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


export default function Loading() {
    return ( <Container>
                <Spinner>
                </Spinner>
                <LoadingText>Post Uploading...</LoadingText>
             </Container>   
          )
  } 
  


/* 
import { TiTickOutline } from "react-icons/ti";
import { BiMessageAltError } from "react-icons/bi";
const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    font-size: 3.5rem;
    color: #fff
  }
`
const Button = styled.button`
  outline: none;
  border: none;
  margin-top: 1rem;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 10px;
  &:hover {
    background: transparent;
    color: #fff;
  }
`
const msg = "error";
else {
    return ( <Container>
                <IconWrapper>
                  {msg === 'success'? <TiTickOutline />:<BiMessageAltError />}
                </IconWrapper>
                <LoadingText>{msg === 'success'? 'Successfully Posted!!' : 'Sorry..'}</LoadingText>
                <Button onClick={(e) => handlePostSubmit(e, msg)}>{msg === 'success'? 'Close': 'Try Again'}</Button>
             </Container>   
          )
  } */
