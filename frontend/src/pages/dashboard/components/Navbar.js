import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/users/userActions';
import { resetGlobals, setShowModal, setMenubar, setCreateMenu } from '../../../redux/globals/globalActions';
import { CommonButtonTheme } from './GlobalComponents/StyledComponents/Buttons';

//============== Icons =====================//
import { SiYourtraveldottv } from "react-icons/si";
import { BiMenuAltLeft } from "react-icons/bi";
import { MdClear, MdOutlineForum, MdGridView } from "react-icons/md";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";

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
const NavLogo = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  padding-left: 8px;
  span {
    margin-right: 0.5rem;
    font-size: 2rem;
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
const CreateMenuContainer = styled.div`
  position: relative;
  margin-right: 1.5rem;
`
const CreateMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  min-width: 210px;
  background-color:#fff;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 10px;
  h4 {
    letter-spacing: 0.8px;
  }
  button {
    ${CommonButtonTheme}
    letter-spacing: 0.8px;
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
const NavAdd = styled.button`
  ${CommonButtonTheme}
  margin-top: 0.5rem;
  font-size: 1.9rem;
  color: ${ props => props.showCreateMenu ? '#2a78cd' : '#021b41'};
  &:hover {
    color: ${ props => props.showCreateMenu ? '#021b41' : '#2a78cd'};
  }
`
const MainMenu = styled.div`
  display: flex;
  align-items: center;
`
const MenuBar = styled.div`
 display: none;
 font-size: 2.5rem;
 &:hover {
   color: #2a78cd;
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
    width: 75px;
    list-style-type: none;
    border-bottom: ${props => props.active === 'home' ? '2.5px solid #021b41': '' };
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar {
    display: flex;
    padding: 8px 0px;
    border-bottom: ${props => props.active === 'profile' ? '2.5px solid #021b41' : '' };
    align-items: center;
    justify-content: center;
    margin-left: 50px;
    margin-right: 55px;
  }
  
  
  @media only screen and (max-width: 768px) { 
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-width: 100%;
    height: calc(100vh - 70px);
    background-color: #fff;
    top:70px;
    left:0;
    transform: ${props => props.menuBar? " translateX(0)" :" translateX(-100%)"};
    .nav-list {
      height: auto;
      max-height: 300px;
    }
    .avatar {
      margin-left: 0;
      margin-right: 0;
     } 
     button {
       padding: 0px;
     }
 }
`
const NavLink =  styled(Link)`
  text-decoration: none;
  padding: 0px 8px;
  width: 100%;
  height: 100%;
  display: inline-block;
  color: ${props => props.active === 'home' ? '#021b41;' : '#aaa'};
  transition: 250ms all ease-in;
  font-size: 2.2rem;
  &:hover {
    color: #2a78cd;
  }
`

const AvatarLink = styled(Link)`
  position: relative;
  text-decoration: none;
  font-family: 'Montserrat Alternates', sans-serif;
  color: #021b41; 
  transition: 250ms all ease-in;
  padding-right: 10px;
  display: flex;
  align-items: center;
  height: 2rem;
  border-radius:0px 16px 16px 0px;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  span {
    margin-left: 0.65rem;
    text-transform: capitalize;
  }
  &:hover {
    color: #fff;
    background-color: #2a78cd;
  }
`
const Button = styled.button`
  border: none;
  outline: none;
  padding: 8px 16px;
  letter-spacing: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.67rem;
  background-color: transparent;
  cursor: pointer;
  transition: .5s all ease-in;
  &:hover {
    color: #2a78cd;
    text-decoration: underline
  }
`
const Img = styled.span`
  overflow: hidden;
  img {
    position: absolute;
    top:0;
    left: -1rem;
    height: 2rem;
    width: 2rem;
    vertical-align: center;
    border-radius: 50%;
  }
`

export default function Navbar() {
  const { user } = useSelector(state => state.User)
  const { navBar: { showAddBtn, activePage: active, menuBar, showCreateMenu } } = useSelector(state => state.Globals);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleHome = () => {
    dispatch(setMenubar(false));
    if(location.pathname.match(/\/dashboard\/home/)) return 
    dispatch(resetGlobals());
  }
  const handleProfile = () => {
    dispatch(setMenubar(false));
    if(location.pathname.match(/\/dashboard\/profile/)) return 
    dispatch(resetGlobals());  
  }
  const handleLogOut = () => {
    dispatch(resetGlobals());
    dispatch(logout())
  }
  const handleCreate = (e, btnType) => {
    e.preventDefault();
    dispatch(setCreateMenu(false));
    if(btnType === 'post') {
      return dispatch(setShowModal({ modalType: 'post', action: 'create post', showPostForm: true }))
    }
    dispatch(setShowModal({ modalType: 'forum', action: 'create forum' }))
  }
  return (
    <NavContainer>
      <Nav> 
          <NavLogo to={`/dashboard/home`} onClick={handleHome}>
            <span><SiYourtraveldottv style={{ color: '#021b41' }}/></span>
            <Logo>TravelLog</Logo>
          </NavLogo>
          <MainMenu>
             { showAddBtn &&
               <CreateMenuContainer>
                <NavAdd onClick={() => dispatch(setCreateMenu(!showCreateMenu))} showCreateMenu={showCreateMenu}>
                  <CgAddR />
                </NavAdd>
                { showCreateMenu && 
                <CreateMenu>
                  <h4>Create</h4>
                  <button onClick={(e) => handleCreate(e,'post')}>Post <MdGridView /></button>
                  <button onClick={(e) => handleCreate(e, 'forum')}>Forum <MdOutlineForum /></button>
                </CreateMenu> }
             </CreateMenuContainer>}
             <MenuBar onClick={ () => dispatch(setMenubar(!menuBar)) }>
               { menuBar ?  <MdClear /> : <BiMenuAltLeft /> }
             </MenuBar>
             <NavMenu menuBar={ menuBar } active={active}>
          <ul className="nav-list">
            <li className="nav-item" onClick={handleHome}>
                <NavLink to={`/dashboard/home`} active={active}>
                  <AiFillHome />
                </NavLink>   
            </li>
          </ul>
          <div className="avatar" active={active}>
            <AvatarLink to={`/dashboard/profile`} onClick={handleProfile}>
              <Img>
                  <img src={ user.avatarURL } alt="avatar"/>
              </Img>
              <span className="username">{ user.name }</span>    
            </AvatarLink>  
          </div>
          <Button onClick={ handleLogOut }>
            <span>
              <AiOutlineLogout style={{fontSize:'1.75rem'}}/>
            </span>
            LOG OUT
          </Button>
        </NavMenu>
          </MainMenu>
      </Nav>
    </NavContainer>
  )
}
