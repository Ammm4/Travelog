import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const HeroContainer = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  background: url("./images/traveller.jpg") no-repeat center;
  background-cover: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @media only screen and (max-width: 640px) {
    background-image: url("./images/bus-2.jpg");
  }
`
const HeroBanner = styled.div`
  width: 100%;
  h2 {
    font-family: 'Montserrat Alternates', sans-serif;
    color: #1e1e1e;
    letter-spacing: 1px;
    font-size: 2.75rem;
    text-align: center;
    text-transform: Capitalize;
  }
  
  @media only screen and (max-width:768px) {
    h2 {
    font-size: 1.75rem; 
    }
  }
`
const ButtonGroup = styled.div`
 margin-top: 2rem;
 margin-bottom: 2rem;
 text-align: center
`
const Button = styled.button`
  border: 2px solid #1f1f1f;
  width: 150px;
  margin: 10px;
  outline: none;
  padding: 8px 16px;
  border-radius: 3px;
  letter-spacing: 1px;
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  background-color: #fff;
  cursor: pointer;
  transition: .5s all ease-in;
  &:hover {
    background-color: transparent;
    background-clip: border-box;
  }
`
const BtnLink = styled(Link)`
 text-decoration: none;
 color: #1e1e1e;
`
export default function Hero() {
  return (
    <HeroContainer>
      <HeroBanner>
        <h2>share your experiences.</h2>
        <ButtonGroup>
          <Button>
            <BtnLink to="/signup">Sign Up</BtnLink>
          </Button>
          <Button>
            Demo
          </Button>
       </ButtonGroup>
    </HeroBanner>   
    </HeroContainer>
  )
}

