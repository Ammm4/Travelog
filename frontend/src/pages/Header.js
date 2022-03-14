import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SiYourtraveldottv } from "react-icons/si";

const HeaderContainer = styled.header`
  width: 100%;
  height: 75px;
  background-color: #fff;
  color: #222;
  padding: 5px 8px;
  display: flex;
  justify-items: center;
  align-items: center;
`
const Brand = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const BrandLogo = styled(Link)`
  text-decoration: none;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    margin-right: 0.5rem;
    font-size: 2rem
  }
`
const Logo = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  color: #021b41; 
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: #021b41;
`


export default function Header() {
  return (
    <HeaderContainer>
      <Brand>
      <BrandLogo to="/">
        <span><SiYourtraveldottv /></span>
        <Logo>TravelLog</Logo>
      </BrandLogo>
      </Brand>
    </HeaderContainer>
  )
}
