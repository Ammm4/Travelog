import React from 'react';
import { useLocation } from 'react-router-dom';
import { useReduxDispatch } from '../../../../utils';
import useCommonDispatch from '../hooks/useCommonDispatch';
import styled from 'styled-components';
import NavLogo from './NavLogo';
import MainMenu from './MainMenu';
import { setNavbarItems } from '../../../../redux/globals/globalActions';
//============== Icons =====================//

const NavContainer = styled.div`
  position: fixed;
  top:0;
  left:0;
  z-index: 1111;
  width: 100%;
  height: 68px;
  background-color: #fff;
  color: #021b41;
  border-bottom: 1px solid #efeff0;
`
const Nav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`

export default function Navbar() {
  const dispatch = useReduxDispatch();
  const { pathname } = useLocation();
  const { actionsToDispatch } = useCommonDispatch();
  const handleHome = () => {
    dispatch(setNavbarItems('menuBar',false));
    if(pathname.match(/\/dashboard/)) return
    actionsToDispatch()
  }
  return (
    <NavContainer>
      <Nav> 
          <NavLogo handleHome={ handleHome }/>
          <MainMenu handleHome={ handleHome }/>
      </Nav>
    </NavContainer>
  )
}
