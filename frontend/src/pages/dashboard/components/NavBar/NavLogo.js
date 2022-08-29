import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '../../../../GlobalComponents/StyledComponents/Headings';
import { SiYourtraveldottv } from "react-icons/si";

const NavLogoLink = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  padding-left: 8px;
  span {
    margin-right: 0.5rem;
    font-size: 2rem;
  }
`
export default function NavLogo({ handleHome }) {
  return (
    <NavLogoLink to={`/dashboard`} onClick={handleHome}>
       <span><SiYourtraveldottv style={{ color: '#021b41' }}/></span>
       <Logo>TravelLog</Logo>
    </NavLogoLink>
  )
}
