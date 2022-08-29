import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { setNavbarItems, setShowModal } from '../../../../redux/globals/globalActions';
import { CommonButtonTheme } from '../GlobalComponents/StyledComponents/Buttons';

import useCommonDispatch from '../hooks/useCommonDispatch';
import { logout } from '../../../../redux/users/userActions';
//============= Icons ================ //
import { CgAddR } from 'react-icons/cg';
import { MdClear, MdOutlineForum, MdGridView } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";

const MainMenuContainer =  styled.div`
  display: flex;
  align-items: center;
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

export default function MainMenu({ handleHome }) {
  const { User: { user },
          Globals: {
            navBar: { showAddBtn, activePage: active, menuBar, showCreateMenu }
          }
        } = useReduxSelector();
  const { pathname } = useLocation();
  const dispatch = useReduxDispatch();
  const { actionsToDispatch } = useCommonDispatch();
  const handleProfile = () => {
    dispatch(setNavbarItems('menuBar',false));
    if(pathname.match(/\/dashboard\/profile/)) return
    actionsToDispatch()
  }
  const handleLogOut = () => {
    dispatch(logout())
  }
  const handleCreate = (e, btnType) => {
    e.preventDefault();
    dispatch(setNavbarItems('showCreateMenu',false));
    if(btnType === 'post') {
      return dispatch(setShowModal({ modalType: 'post', action: 'create post', showPostForm: true }))
    }
    dispatch(setShowModal({ modalType: 'forum', action: 'create forum' }))
  }
  return (
    <MainMenuContainer>
       { 
         showAddBtn &&
           <CreateMenuContainer>
              <NavAdd onClick={() => dispatch(setNavbarItems('showCreateMenu',!showCreateMenu))} showCreateMenu={showCreateMenu}>
                <CgAddR />
              </NavAdd>
                { showCreateMenu && 
                <CreateMenu>
                  <h4>Create</h4>
                  <button onClick={(e) => handleCreate(e,'post')}>Post <MdGridView /></button>
                  <button onClick={(e) => handleCreate(e, 'forum')}>Forum <MdOutlineForum /></button>
                </CreateMenu> }
           </CreateMenuContainer>    
        }
         
        <MenuBar onClick={ () => dispatch(setNavbarItems('menuBar',!menuBar)) }>
          { menuBar ?  <MdClear /> : <BiMenuAltLeft /> }
        </MenuBar> 
         <NavMenu menuBar={ menuBar } active={active}>
          <ul className="nav-list">
            <li className="nav-item" onClick={handleHome}>
                <NavLink to={`/dashboard`} active={active}>
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
       
    </MainMenuContainer>
  )
}
