import React, {useState} from 'react';
import styled from 'styled-components';
import { SiYourtraveldottv } from "react-icons/si";
import { BiMenuAltLeft } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { Link } from 'react-router-dom';
import { RiUserLine } from "react-icons/ri";

const NavContainer = styled.div`
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 75px;
  background-color: transparent;
  color: #021b41;
  padding: 5px 8px;
  display: flex;
  justify-items: center;
  align-items: center;
  transition: .5s all ease-in;
  &:hover {
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
  }
`
const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;

`
const NavLogo = styled.div`
display: flex;
align-items: center;
color: #021b41;
span {
  margin-right: 0.5rem;
  font-size: 2rem
}
`
const Logo = styled.h1 `
  font-family: 'Montserrat Alternates', sans-serif;
  color: #021b41; 
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: #021b41;
`
const MenuBar = styled.div`
  display: none;
  font-size: 2.5rem;
  &:hover {
    color: #2a78cd
  }
  @media only screen and (max-width: 768px){
    display: flex;
    justify-items: center;
    align-items: center;
  }
 `
const NavMenu = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  transition: 250ms all ease-in;
  .nav-list {
    list-style-type: none;
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .nav-list .nav-item{
    margin-right: 20px;
    letter-spacing: 1px;
  }

  @media only screen and (max-width: 768px){ 
    position: absolute;
    top:0;
    left:0;
    min-width: 100%;
    height: 100vh;
    z-index: -1;
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
    transform: ${props => props.menuBar? " translateY(0)" :" translateY(-100%)"};
    .nav-list {
       height: 100%;
       max-height: 300px;
       flex-direction: column;
       justify-content: space-around;
   }
 }
`
const NavLink =  styled(Link)`
 display: flex;
 align-items: center;
 text-decoration: none;
 color: #021b41;
 transition: 250ms all ease-in;
 letter-spacing: 2px;
 font-weight: 400;
 &:hover {
    color: #2a78cd;
    text-decoration: underline;
 }
`
const Button = styled.button`
  border: 1px solid #021b41;
  outline: none;
  padding: 16px 40px;
  border-radius: 28px;
  letter-spacing: 1px;
  font-family: inherit;
  color: #021b41;
  font-size: 1rem;
  background-color: transparent;
  cursor: pointer;
  transition: .5s all ease-in;
  &:hover {
    background-color: #2a78cd;
    border: none;
    color: #fff;
  }
`
export default function Navbar() {
  const [menuBar, setMenubar] = useState(false)
  
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
        <NavMenu menuBar={ menuBar }>
          <ul className="nav-list">
            <li className="nav-item">
                <Button>DEMO</Button>
            </li>
            <li className="nav-item">
              <NavLink to="/login">
                <RiUserLine style={{fontSize: '1.75rem'}}/> LOG IN
              </NavLink>
            </li>
          </ul>
        </NavMenu>
      </Nav>
    </NavContainer>
  )
}
