import React from 'react';
import styled,{ css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCog } from "react-icons/fa";
import { CommonButtonTheme } from './GlobalComponents/StyledComponents/Buttons'

export const sharedBtnCss = css `
  ${ CommonButtonTheme }
  display: block;
  background-color:#fff;
  width: 98%;
  margin: 1.2rem auto;
  border: 1px solid #2e5c99;
  color:#2671d3;
  padding: 16px 40px;
  &:hover {
     background-color: #2a78cd;
     color:#fff;
     border: none;
   }
`
const CogButton = styled.button`
  ${ CommonButtonTheme }
  display: block;
  margin: auto;
  font-size: 2.5rem;
  color: ${props => props.showSettings ? '#2a78cd' : '#021b41'};
  &:hover {
    color:${props => props.showSettings ? '#021b41' : '#2a78cd'}
  }
`
const EditLink = styled(Link)`
  text-decoration: none;
  ${sharedBtnCss}
`
const SettingBtnGroup = styled.div`
  width: 100%;
  margin: 1rem auto 1.5rem auto;
  background-color: #fff;
  max-height: ${props => props.showSettings ? '400px' : '0'};
  padding: ${props => props.showSettings? '8px' : '0'};
  opacity: ${props => props.showSettings? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  button {
    ${sharedBtnCss}
  }
`
export default function ProfileSettings({ setShowSettings, showSettings, match, handleClick}) {
  return (
    <>
       <CogButton 
         onClick={() => setShowSettings(!showSettings)}
         showSettings={showSettings}
         >
         <FaUserCog />
        </CogButton>
       <SettingBtnGroup showSettings={ showSettings }>
         <EditLink to={`${ match.url }/edit`}> Edit Profile</EditLink>
         <EditLink to={`${ match.url }/change_password`}> Reset Password</EditLink>
         <button onClick={ handleClick }> Delete Profile</button>
       </SettingBtnGroup>
    </>
  )
}
