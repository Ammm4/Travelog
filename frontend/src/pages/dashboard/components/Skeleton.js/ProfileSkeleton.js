import React from 'react';
import styled from 'styled-components';
import { 
  ProfileContainer, 
  UserAvatar, 
  UserCover, 
  UserImageContainer, 
  UserProfile,
  UserInfo,
} from '../GlobalComponents/StyledComponents/Containers';
import PageNotFound from '../../../../GlobalComponents/Components/PageNotFound';
import { ProfileHeading, InfoHeader, UserTitle} from '../GlobalComponents/StyledComponents/Headings';
const Heading = styled(ProfileHeading)`
  width: 30%;
  height: 50px;
  border-radius: 8px;
  background: #ccc;
  margin: auto;
`
const Cover = styled(UserCover)`
  background: #ddd;
`
const Avatar = styled(UserAvatar)`
  background: #ccc;
`
const Title = styled(UserTitle)`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  background: #ccc
`
const Infos = styled(InfoHeader)`
  width: 65px;
  height: 25px;
  border-radius: 5px;
  background: #ddd;
`
const MoreInfo = styled.div`
  display: grid;
  template-grid-columns: 30px 1fr;
`
const InfoSign = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 5px;
  background: #ddd;
`
const InfoText = styled.div`
  height: 25px;
  background: #ddd;
  border-radius: 5px;
`
const Settings = styled.div`
  height: 50px;
  width: 50px;
  margin: auto;
  background: #ddd;
  border-radius: 8px;
`
export default function ProfileSkeleton({ loading }) {
   if(!loading) return <PageNotFound msg='Something Went wrong' home='/dashboard'/>
  return (
    <ProfileContainer>
      <Heading className='skeleton-loading'/>
      <UserProfile>
        <UserImageContainer>
          <Cover className='skeleton-loading'/>
          <Avatar className='skeleton-loading'/>
          <Title className='skeleton-loading'/>
        </UserImageContainer>
        <UserInfo>
          <Infos/>
          {[1,2,3].map(n => {
            return (<MoreInfo key={n}>
                      <InfoSign className='skeleton-loading'/>
                      <InfoText className='skeleton-loading'/>
                    </MoreInfo>)
          })}
        </UserInfo>
        <Settings className='skeleton-loading'/>
      </UserProfile>
    </ProfileContainer>
  )
}
