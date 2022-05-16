import React from 'react';
import { useSelector } from 'react-redux';
import { IoInformationCircleSharp } from "react-icons/io5";
import { ProfileImages } from '../StyledComponents/Images';
import { InfoHeader, UserTitle } from '../StyledComponents/Headings';
import { UserAvatar, UserCover, UserImageContainer, UserInfo } from '../StyledComponents/Containers'


function UserProfileInfos() {
  const { SingleUser: { singleUser: user }} = useSelector(state => state);
  return (
    <>
        <UserImageContainer>   
         <UserCover>
           <ProfileImages src={  user.cover.cover_url } alt="cover"/>
         </UserCover>
         <UserAvatar>
           <ProfileImages src={  user.avatar.avatar_url } alt="avatar"/>
         </UserAvatar>
         <UserTitle>{ user.username }</UserTitle>
       </UserImageContainer>
       <UserInfo>
         <InfoHeader>Infos</InfoHeader> 
         {
           user.about &&
           <div>
           <span><IoInformationCircleSharp /></span>
           <p><b>About:</b> { user.about }</p>
           </div>
         }
         { user.hobbies &&
           <div>
            <span><IoInformationCircleSharp /></span>
            <p><b>Hobbies:</b> { user.hobbies }</p>
           </div>
         }
         {
           (user.city || user.country) && 
           <div>
            <span><IoInformationCircleSharp /></span>
            <p><b>Location:</b> { user.city } { user.country && ','} { user.country }</p>
            </div>
         }
            
       </UserInfo>
    </>
  )
}
export default UserProfileInfos;