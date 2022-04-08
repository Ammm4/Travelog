import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ProfileContainer, 
  UserProfile, 
  UserImageContainer, 
  UserAvatar, 
  UserCover, 
  UserTitle } from '../pages/profile';
import { Button } from './DeleteBox';
import GoBackBtn from './GoBackBtn';
import { useHistory } from 'react-router-dom';

import { updateUser } from '../../../redux/users/userActions';
//Icons 
import { FaCamera } from "react-icons/fa";
import EditForm from './EditForm';
import Loading from './Loading';



export const Container = styled.div`
  width: 99%;
  margin: 5.5rem auto 1.5rem auto;
`

const EditButton = styled(Button)``
  

const initialState = (user) => {
  const { name: username, email, about, city, country, hobbies } = user;
   return { username, email, about, city, country, hobbies }
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
    dispatch(updateUser(user.userId, {...infos, coverImg, avatarImg }))
  }
  
  return (
    <Container ref={containerRef}>
      {userUpdating && <Loading msg="Profile Updating"/>}
     <GoBackBtn />
     <ProfileContainer style={{ marginTop: '0px' }}>
       <h2>Edit Profile</h2>
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
      </UserProfile>
     </ProfileContainer>
    </Container>
  )
}

function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}

