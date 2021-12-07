import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
 padding: 1rem;
 h1 {
   font-family: 'Montserrat Alternates', sans-serif;
   font-size: 2.75rem;
   text-align: center;
 }
 @media only screen and (max-width: 768px){
   display: none;
 }
`
const Image = styled.div`
 margin-top: -2rem;
 img {
   width: 300px;
   height: 300px;
 }

`
export default function Welcome() {
  return (
    <Container>
      <h1>Welcome Back!</h1>
      <Image>
        <img src="./images/cat.png" alt="Welcome"/>
      </Image>
    </Container>
  )
}
