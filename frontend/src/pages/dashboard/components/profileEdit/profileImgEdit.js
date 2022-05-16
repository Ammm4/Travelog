import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserAvatar, UserCover, UserImageContainer } from '../GlobalComponents/StyledComponents/Containers';
import { UserTitle } from '../GlobalComponents/StyledComponents/Headings';
import { ProfileImages } from '../GlobalComponents/StyledComponents/Images';
import { editUserInfo } from '../../../../redux/globals/globalActions';
import { FaCamera } from "react-icons/fa";

export default function ProfileImgEdit() {
  const { SingleUser: { singleUser: { username }}, Globals: { userInfo: { coverImg, avatarImg }} } = useSelector(state => state);
  const avatarRef = useRef();
  const coverRef = useRef();
  const dispatch = useDispatch();

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
          dispatch(editUserInfo('avatarImg', reader.result))
        }, false);
       reader.readAsDataURL(avatarRef.current.files[0]);
      }
    if(imgType === 'cover') {
      if(!isFileImage(coverRef.current.files[0])) return;
      reader.addEventListener("load", function () {
        dispatch(editUserInfo('coverImg', reader.result))  
      
       }, false);
      reader.readAsDataURL(coverRef.current.files[0]);
    }
  }
  return (
    <UserImageContainer>
          <UserCover>
            <ProfileImages src={ coverImg } alt="cover"/>
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
            <ProfileImages src={ avatarImg } alt="user_avatar"/>
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
          <UserTitle>{ username }</UserTitle>
        </UserImageContainer>
  )
}

function isFileImage(file) {
 return file && file['type'].split('/')[0] === 'image';
}
