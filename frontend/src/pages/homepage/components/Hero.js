import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { IoIosAirplane } from "react-icons/io";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
const commonBtnStyle = css`
  border: 1px solid #fff;
  display: block;
  width: 100%;
  max-width: 268px;
  margin: 10px auto 10px auto;
  outline: none;
  padding: 16px 40px;
  border-radius: 2px;
  letter-spacing: 2px;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  background-color: transparent;
  cursor: pointer;
  transition: .5s all ease-in;
  &:hover {
    background-color: #fff;
    color:#292929;
    background-clip: border-box;
  }
`

const HeroContainer = styled.section`
  //margin-top: 100px;
  min-height: 100vh;
  min-width: 100vw;
  background: url("./images/pichu1.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @media only screen and (max-width: 640px) {
    background-image: url("./images/pichu2.jpg");
  }
`
const HeroBanner = styled.div`
  width: 100%;
  h2 {
    font-size: 2rem;
    line-height: 2.625rem;
    text-shadow: 0 0.1rem 0.2rem rgb(0 0 0 / 50%);
    margin-bottom: 16px;
    font-weight: 300;
    color: #fff;
    letter-spacing: 1px;
    text-align: center;
    text-transform: Capitalize;
  }
  
  @media only screen and (max-width:768px) {
    h2 {
    font-size: 1.75rem; 
    }
  }
`
const Quote = styled.p`
  width: 100%;
  max-width: 500px;
  font-style: italic;
  font-size: 1.25rem;
  letter-spacing: 1px;
  text-shadow: 0 0.1rem 0.2rem rgb(0 0 0 / 50%);
  text-align: center;
  margin: auto;
  color: #fff;
  span {
    font-size: 0.8rem;
  }
`
const ButtonGroup = styled.div`
 margin-top: 2rem;
 margin-bottom: 2rem;
 text-align: center
`
const Button = styled.button`
  ${commonBtnStyle}
`
const BtnLink = styled(Link)`
 text-decoration: none;
 ${commonBtnStyle}
`
const IconContainer = styled.div`
  margin-top: 0.8rem;
  text-align: center;
  font-size: 1.65rem;
  color:#fff;
`
export default function Hero() {
  return (
    <HeroContainer>
      <HeroBanner>
        <Quote><RiDoubleQuotesL/> To travel is to live <RiDoubleQuotesR /> - <span>Hans Christian Anderson</span> </Quote>
        <IconContainer><IoIosAirplane /></IconContainer>
        <h2>share your travelling experiences & knowledge</h2>
        <ButtonGroup>
          <BtnLink to="/signup"> SIGN UP </BtnLink>
          <Button>DEMO </Button>
       </ButtonGroup>
    </HeroBanner>   
    </HeroContainer>
  )
}

