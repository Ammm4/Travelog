import React from 'react'
import styled from 'styled-components';
import { SiYourtraveldottv } from "react-icons/si";

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background-color: var(--main-color);
  color: var(--main-bg-color);
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
const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 0.5rem;
   font-size: 2.5rem
  }
`
const Logo = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.75rem
`
export default function Header() {
  return (
    <HeaderContainer>
      <Brand>
      <BrandLogo>
        <span><SiYourtraveldottv /></span>
        <Logo>TravelLog</Logo>
      </BrandLogo>
      </Brand>
    </HeaderContainer>
  )
}
