import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, {css} from 'styled-components';
import Post from '../components/Post';
import { PostsWrapper } from './home';
import Share from '../components/Share';
//Import


//Icons SiAboutdotme FaUserCog 
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import Zeropost from '../components/zeropost';
import ProfileModal from '../components/ProfileModal';

const sharedImgCss = css`
  display: inline-block;
  width: 100%;
  height:100%;
  object-fit:cover;
`
export const sharedDivCss = css`
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  margin: 1rem auto 1.5rem auto;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`
const sharedBtnCss = css `
  display: block;
  outline: none;
  background-color:#fff;
  cursor: pointer;
  width: 98%;
  margin: 1.2rem auto;
  text-align: center;
  border: 1px solid #2e5c99;
  font-size: 15px;
  color:#2671d3;
  padding: 16px 40px;
  &:hover {
    background-color: #2a78cd;
     color:#fff;
     border: none;
   }
`
const sharedEditBtnCss = css`
    display: inline-block;
    position: absolute;
    display: flex;
    text-align: center;
    outline: none;
    padding: 6px;
    border: none;
    font-size: 1.2rem;
    letter-spacing: 1px;
    background-color: #7f7f7f;
    border-radius: 5px;
    color: #fff;
`
export const ProfileContainer = styled.main`
  padding-top: 80px;
  h2 {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 40px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.8px;
    color: #021b41;
  }
`
export const UserProfile = styled.div`
  ${sharedDivCss}
  width: 100%;
  background-color: #fff;
  cursor:pointer;
  margin: 40px auto 0 auto;
  overflow: hidden;
  
`
export const UserImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`
export const UserCover = styled.div`
  position: relative;
  width: 100%;
  height: 55%;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  img {
    display: inline-block;
    ${sharedImgCss}
  }
  button {
    ${sharedEditBtnCss}
    top:0.35rem;
    left:0.35rem;
  }
`
export const UserAvatar = styled.div`
   position: absolute;
   top: 55%; left:50%;
   width: 120px;
   height: 120px;
   transform: translate(-50%,-50%);
   border-radius: 50%;
   background-color: #eee;
   border: 6px solid #fff;
   overflow: hidden;
   img {
    ${sharedImgCss}
    
   }
   button {
     ${sharedEditBtnCss}
     bottom:5%; left:50%;
     transform: translateX(-50%);
     
   }
`
export const UserTitle = styled.h2`
  position: absolute;
  left:50%; bottom: 10%;
  transform: translateX(-50%);
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 40px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.8px;
  color: #021b41;
`
export const UserInfo = styled.div`
  padding: 20px 14px;
  h3 {
    margin-bottom: 1rem;
  }
  div {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 1rem;
    color: #021b41;
    span {
     text-align: center;
     font-size: 1.25rem;
    }
  }
  p {
    line-height: 20px;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
`
const Btngroup = styled.div`
  ${sharedDivCss};
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 8px;
  button {
    ${sharedBtnCss}
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

const CogButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  display: block;
  cursor: pointer;
  margin: auto;
  text-align: center;
  font-size: 2.5rem;
  color: #021b41;
`
export const PostHeading = styled.div`
  ${sharedDivCss}
  padding: 8px;
  text-align: center;
  * {
    font-size: 1.5rem;
  }
  button {
    ${sharedBtnCss}
    border: none;
    background-color: transparent;
    font-size: 1.35rem;
  }
`

export default function Profile({ setIsModal }) {
  const { user } = useSelector(state => state.User);
  const { posts } = useSelector(state => state.Post);
  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const match = useRouteMatch();
  return (
    <ProfileContainer>
     <h2 style={{marginTop: '15px'}}>{user.name}'s Profile</h2>
     <UserProfile>
       <UserImageContainer>   
        <UserCover>
          <img src={ user.coverURL } alt="cover"/>
        </UserCover>
        <UserAvatar>
          <img src={ user.avatarURL } alt="cover"/>
        </UserAvatar>
        <UserTitle>{ user.name }</UserTitle>
       </UserImageContainer>
       <UserInfo>
         <h3>Info</h3> 
         <div>
           <span><IoInformationCircleSharp /></span>
           <p><b>About:</b> { user.about }</p>
         </div>
         <div>
          <span><IoInformationCircleSharp /></span>
          <p><b>Hobbies:</b> { user.hobbies }</p>
         </div>
         <div>
          <span><IoInformationCircleSharp /></span>
          <p><b>Location:</b> { user.city }, { user.country }</p>
         </div>   
       </UserInfo>
       <CogButton onClick={() => setShowSettings(!showSettings)}><FaUserCog /></CogButton>
       <SettingBtnGroup showSettings={showSettings}>
         <EditLink to={`${ match.url }/edit`}> Edit Profile</EditLink>
         <EditLink to={`${ match.url }/change_password`}> Reset Password</EditLink>
         <button onClick={ (e) => setShowModal(true) }> Delete Profile</button>
       </SettingBtnGroup>
     </UserProfile>
     <Share setModal={setIsModal}/>
     <PostHeading>
       <BsFillGrid3X3GapFill />
     </PostHeading>
     { 
      posts.filter(post => post.author.authorId === user.userId).length > 0 ? 
        <PostsWrapper>
          { 
           posts.map(post => {
            if( post.author.authorId === user.userId ) {
             return <Post key={ post.post_id } post={ post } setModal={ setIsModal } singlePost={false} />
          }
             return null
          }) 
          }
        </PostsWrapper>
        : 
        <Zeropost />
     }
     { showModal && <ProfileModal setShowModal={ setShowModal }/>}
    </ProfileContainer>
  )
}
