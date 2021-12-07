import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UserImageContainer, UserAvatar, UserCover, UserTitle, UserInfo, sharedDivCss } from './profile';
import { useHistory } from 'react-router-dom';

//Icons FiCamera
import { BiArrowBack } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import EditForm from '../components/EditForm';

const UserInfoComponent = ({ infos }) => {
  return  <UserInfo>
       <h3>Info </h3>
       <div>
          <span><FcAbout /></span>
          <p><b>Name:</b> { infos.username }</p>
       </div> 
       <div>
          <span><FcAbout /></span>
          <p><b>Email:</b> { infos.email }</p>
         </div>   
       <div>
           <span><FcAbout /></span>
           <p><b>About:</b> { infos.about }</p>
        </div>
        <div>
          <span><FcAbout /></span>
          <p><b>Hobbies:</b> { infos.hobbies }</p>
         </div>
         <div>
          <span><FcAbout /></span>
          <p><b>Location:</b> { infos.city }, { infos.country }</p>
         </div>  
     </UserInfo>
}
const Container = styled.div`
  width: 98%;
  border-radius: 8px;
  margin: 4.25rem auto 1.5rem auto;
  background-color: transparent;
`
const ProfileContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding-bottom: 5px;
  border-radius: 8px;
  margin: 1.5rem auto 1.5rem auto;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5); 
`

const UserProfile = styled.div`
 
 padding: 0;
 margin: 0;
 width: 100%;
 background: transparent;
 box-shadow: none;
`

const EditHeading = styled.div`
  width: 100%;
  h2 {
    margin-top: 0.75rem;
    text-align: center;
    font-family: 'Montserrat Alternates', sans-serif;
  }
  button {
    display: inline-block;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background: transparent;
    letter-spacing: 1px;
    font-size: 1.15rem;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
`
const EditButton = styled.button`
  ${sharedDivCss}
  outline: none;
  border: none;
  display: block;
  padding: 6px 12px;
  background-color: dodgerblue;
  font-size: 1.25rem;
  color: #fefefe;
`

const initialState = (user) => {
  const { username, email, about, city, country, hobbies} = user;
   return { username, email, about, city, country, hobbies }
}
export default function ProfileEdit({ user }) {
  const {avatar, cover } = user;
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarImg, setAvatarImg] = useState();
  const [coverImg, setCoverImg] = useState(null);
  const [infos, setInfos] = useState(initialState(user));
  const [showEdit, setShowEdit] = useState(false);
  
  const avatarRef = useRef();
  const coverRef = useRef();

  const history = useHistory();

  useEffect(() => {
   if(!avatarFile) return
   let avatarURL = URL.createObjectURL(avatarFile);
   setAvatarImg(avatarURL);
  },[avatarFile]);

  useEffect(() => {
   if(!coverFile) return
   let coverURL = URL.createObjectURL(coverFile);
   setCoverImg(coverURL);
  },[coverFile])

  const handleClick = (e, imgType) => {
    e.preventDefault();
    if(imgType === 'avatar') {
      return avatarRef.current.click(); 
    }
    if(imgType === 'cover') {
      return coverRef.current.click(); 
    }  

  }
  const handleFileUpload = (e, imgType) => {
    e.preventDefault();
    if(imgType === 'avatar') {
      return setAvatarFile(avatarRef.current.files[0]) 
    }
    if(imgType === 'cover') {
      return setCoverFile(coverRef.current.files[0]) 
    }
  }
  const handleToggle = (e) => {
    e.preventDefault();
    if(showEdit) {
      setInfos(initialState(user));
      return setShowEdit(!showEdit);
    }
    setShowEdit(!showEdit)
  }
  
  return (
    <Container>
     <EditHeading>
       <button onClick={(e) => history.goBack()}><BiArrowBack/> <span>Go Back</span></button>
       <h2>Edit Profile</h2>
     </EditHeading>
     <ProfileContainer>
       <UserProfile>
        <UserImageContainer>
          <UserCover>
            <img src={ coverImg || cover } alt="cover"/>
            <button onClick={(e) => handleClick(e, 'cover')}> <FaCamera/></button>
            <input 
                name="coverImg" 
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={coverRef}
                onChange={(e) => handleFileUpload(e, 'cover')}
              />
          </UserCover>
          <UserAvatar>
            <img src={ avatarImg || avatar } alt="cover"/>
            <button onClick={(e) => handleClick(e, 'avatar')}> <FaCamera/></button>
            <input 
                name="avatarImg" 
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={avatarRef}
                onChange={(e) => handleFileUpload(e, 'avatar')}
              />
          </UserAvatar>
          <UserTitle>{ infos.username }</UserTitle>
        </UserImageContainer>
       </UserProfile>
       <EditButton 
         onClick={(e) => handleToggle(e)}> 
         { showEdit ? 'Cancel Edit' : 'Edit Info..'}
       </EditButton>
      { 
        showEdit ? 
        <EditForm infos={infos} setInfos={setInfos} /> 
        : 
        <UserInfoComponent infos={infos} />
      }
      <EditButton onClick={(e) => setShowEdit(!showEdit)}>
        {showEdit ? 'Save & Exit':'Save'}
      </EditButton>
     </ProfileContainer>
    </Container>
  )
}
