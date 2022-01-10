import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout, clearError } from '../../../redux/users/userActions';

//============== Components =================//
import Loading from './Loading';
//============== Icons =====================//

import { SiYourtraveldottv } from "react-icons/si";
import { BiMenuAltLeft } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { Link, useRouteMatch } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";




const NavContainer = styled.div`
  position: fixed;
  top:0;
  left:0;
  z-index: 1111;
  width: 100%;
  height: 60px;
  background-color: #1e1e1e;
  color: var(--main-bg-color);
`
const Nav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`
const NavLogo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 8px;
  span {
    margin-right: 0.5rem;
    font-size: 2.5rem
  }
`
const Logo = styled.h1 `
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.75rem
`
const MenuBar = styled.div`
 display: none;
 font-size: 2.5rem;
 &:hover {
   color: #888
 }
 @media only screen and (max-width: 768px){
   display: flex;
   justify-items: center;
   align-items: center;
 }
 `
const NavMenu = styled.div`
  height: 100%;
  display: flex;
  transition: 250ms all ease-in;
  
  .nav-list {
    height: 100%;
    width: 75px;
    list-style-type: none;
    border-bottom: ${props => props.active === 'home' ? '3px solid #aaa':''};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar {
    display: flex;
    width: 100px;
    border-bottom: ${props => props.active === 'avatar' ? '3px solid #fff' : ''};
    align-items: center;
    justify-content: center;
    margin-left: 50px;
    margin-right: 50px;
  }
  
  
  @media only screen and (max-width: 768px){ 
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-width: 100%;
    height: calc(100vh - 70px);
    background-color: var(--main-color);
    top:70px;
    left:0;
    transform: ${props => props.menuBar? " translateX(0)" :" translateX(-100%)"};
    
    .nav-list {
      height: auto;
      max-height: 300px;
    .avatar {
      margin-left: 0;
      margin-right: 0
  } 
  }
 }
`
const NavLink =  styled(Link)`
  text-decoration: none;
  padding: 0px 8px;
  width: 100%;
  height: 100%;
  display: inline-block;
  color: ${props => props.active === 'home' ? '#aaa' : '#fff'};
  transition: 250ms all ease-in;
  font-size: 2.2rem;
  &:hover {
    color: #888;
  }
`

const AvatarLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: var(--main-color);
  transition: 250ms all ease-in;
  display: flex;
  align-items: center;
  height: 2rem;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  &::after {
    content:"";
    position: absolute;
    background-color:#fff;
    height:2rem;
    width:2rem;
    z-index: -1;
    border-radius: 50%;
    right:-17px; 
  }
  span {
    margin-left: 0.65rem;
    text-transform: capitalize;
  }
  &:hover {
    &:after {
    background-color: rgb(244,244,244);
    }
    color: #888;
    background-color: rgb(244,244,244);
  }
`
const Button = styled.button`
  border: none;
  outline: none;
  padding: 8px 16px;
  border-radius: 11px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  color: var(--main-bg-color);
  font-size: 0.66rem;
  background-color: transparent;
  cursor: pointer;
  transition: .5s all ease-in;
  span {
    font-size: 1.175rem;
  }
  &:hover {
    color: #888;
  }
`
const Img = styled.span`
  overflow: hidden;
  img {
    position: absolute;
    top:0;
    left: -15px;
    height: 2rem;
    width: 2rem;
    vertical-align: center;
    border-radius: 50%;
  }
`

export default function Navbar({ active }) {
  const { loading, user, error } = useSelector(state => state.User)
  const [menuBar, setMenubar] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const alert = useAlert();
  
  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearError())
    }
  }, [alert, dispatch, error])
 
  
  if(loading) {
    return <Loading />
  }

  return (
    <NavContainer>
      <Nav>
        <NavLogo>
          <span><SiYourtraveldottv /></span>
          <Logo>TravelLog</Logo>
        </NavLogo>
        <MenuBar onClick={ () => setMenubar(!menuBar) }>
          { menuBar ?  <MdClear /> : <BiMenuAltLeft /> }
        </MenuBar>
        <NavMenu menuBar={ menuBar } active={active}>
          <ul className="nav-list">
            <li className="nav-item" >
                <NavLink to={`${match.url}/home`} active={active} >
                  <AiFillHome />
                </NavLink>   
            </li>
          </ul>
          <div className="avatar" >
            <AvatarLink to={`${match.url}/profile`}>
              <Img>
                  <img src={user.avatar.avatar_url} alt="avatar"/>
              </Img>
              <span className="username">{user.username}</span>    
              </AvatarLink>  
          </div>
          <Button onClick={ () => dispatch(logout()) }>
            <span>
              <MdOutlineLogout />
            </span>
            Log Out
          </Button>
        </NavMenu>
      </Nav>
    </NavContainer>
  )
}
