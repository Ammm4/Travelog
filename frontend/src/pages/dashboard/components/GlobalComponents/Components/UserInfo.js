import React from 'react';
import { IoInformationCircleSharp } from "react-icons/io5";
import { ProfileImages } from '../StyledComponents/Images';
import { InfoHeader, UserTitle } from '../StyledComponents/Headings';
import { UserAvatar, UserCover, UserImageContainer, UserInfo } from '../StyledComponents/Containers'


function UserProfileInfos({ user }) {
  return (
    <>
        <UserImageContainer>   
         <UserCover>
           <ProfileImages src={ user.coverURL || user.cover.cover_url } alt="cover"/>
         </UserCover>
         <UserAvatar>
           <ProfileImages src={ user.avatarURL || user.avatar.avatar_url } alt="avatar"/>
         </UserAvatar>
         <UserTitle>{ user.username }</UserTitle>
       </UserImageContainer>
       <UserInfo>
         <InfoHeader>Infos</InfoHeader> 
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
    </>
  )
}
export default UserProfileInfos;