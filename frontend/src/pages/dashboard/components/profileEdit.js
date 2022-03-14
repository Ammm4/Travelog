import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { UserImageContainer, UserAvatar, UserCover, UserTitle, sharedDivCss } from '../pages/profile';
import { useHistory } from 'react-router-dom';

import { updateUser } from '../../../redux/users/userActions';
//Icons FiCamera
import { BiArrowBack } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import EditForm from './EditForm';
import Loading from './Loading';


export const Container = styled.div`
  width: 98%;
  border-radius: 8px;
  margin: 4.6rem auto 1.5rem auto;
  background-color: transparent;
`
const ProfileContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #FFF;
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

export const EditHeading = styled.div`
  width: 100%;
  h2 {
    margin-top: 0.75rem;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 40px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.8px;
    color: #021b41;
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
  display: block;
  width: 99%;
  max-width: 225px;
  outline: none;
  border: none;
  padding: 6px 12px;
  background-color: dodgerblue;
  &:disabled {
    background-color: grey;
  }
  font-size: 1.25rem;
  color: #fefefe;
`

const initialState = (user) => {
  const { name, email, about, city, country, hobbies } = user;
   return { name, email, about, city, country, hobbies }
}
export default function ProfileEdit() {
  const { userUpdating, user, success } = useSelector(state => state.User)
  const [avatarImg, setAvatarImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [infos, setInfos] = useState(initialState(user));
  const [saveButton, setSaveButton] = useState(false);
  
  const avatarRef = useRef();
  const coverRef = useRef();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if(success) {
      history.goBack()
    }
  },[success,history])

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
    var reader = new FileReader();
    if(imgType === 'avatar') {
      if(!isFileImage(avatarRef.current.files[0])) return;
      reader.addEventListener("load", function () {
          setAvatarImg(reader.result);
        }, false);
       reader.readAsDataURL(avatarRef.current.files[0]);
      }
    if(imgType === 'cover') {
      if(!isFileImage(coverRef.current.files[0])) return;
      reader.addEventListener("load", function () {
          setCoverImg(reader.result);
       }, false);
        reader.readAsDataURL(coverRef.current.files[0]);
    }
    if(!saveButton) setSaveButton(true)
  }
  const handleReset = (e) => {
    containerRef.current.scrollIntoView();
    setAvatarImg(null);
    setCoverImg(null);
    setInfos(initialState(user));
    setSaveButton(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    containerRef.current.scrollIntoView();
    dispatch(updateUser(user._id, {...infos, coverImg, avatarImg }))
  }
  
  return (
    <Container ref={containerRef}>
      {userUpdating && <Loading msg="Profile Updating"/>}
     <EditHeading>
       <button onClick={(e) => history.goBack()}><BiArrowBack/> <span>Go Back</span></button>
       <h2>Edit Profile</h2>
     </EditHeading>
     <ProfileContainer>
       <UserProfile>
        <UserImageContainer>
          <UserCover>
            <img src={ coverImg || user.coverURL } alt="cover"/>
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
            <img src={ avatarImg || user.avatarURL } alt="cover"/>
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
          <UserTitle>{ user.name }</UserTitle>
        </UserImageContainer>
       </UserProfile>
       
      <EditForm infos={ infos } setInfos={setInfos} saveButton={saveButton} setSave={setSaveButton}/> 
     
      <EditButton 
        disabled={!saveButton}
        onClick={ (e) => handleSubmit(e) }
      >
        Save & Exit
      </EditButton>
       <EditButton 
        disabled={!saveButton}
        onClick={(e) => handleReset(e) }
      >
        Reset
      </EditButton>
     </ProfileContainer>
    </Container>
  )
}

function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}

