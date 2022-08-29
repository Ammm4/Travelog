import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import useProfile from '../hooks/useProfile';
import { useHistory } from 'react-router-dom';
// =================== Imported Components ============================//
import { ProfileContainer, UserProfile } from '../GlobalComponents/StyledComponents/Containers';
import { ProfileHeading } from '../GlobalComponents/StyledComponents/Headings';
import { DeleteButton } from '../GlobalComponents/StyledComponents/Buttons';
import GoBackBtn from '../GlobalComponents/Components/GoBackBtn';

//==================== Redux Actions ==============================//
import { updateUser } from '../../../../redux/users/userActions';
import { initialiseuserInfo } from '../../../../redux/globals/globalActions';
//===================== Icons ====================================//
import EditForm from './profileEdit/EditForm';
import ProfileImgEdit from './profileEdit/profileImgEdit';

import Loading1 from '../Loading1';

export const Container = styled.div`
  width: 99%;
  margin: 5.5rem auto 1.5rem auto;
`
const initialUserEditData = (user) => {
  const { username, email, about, city, country, hobbies, avatar: { avatar_url: avatarImg }, cover: {cover_url: coverImg} } = user;
   return { username, email, about, city, country, hobbies, avatarImg, coverImg }
}
export default function ProfileEdit() {
  const { User: { user: { userId } , userUpdating, success}, Globals: { userInfo } } = useReduxSelector();
  const { user } = useProfile(userId);
  const containerRef = useRef();
  const dispatch = useReduxDispatch();
  const history = useHistory();
  useEffect(() => {
    if(Object.keys(user).length === 0) return
    dispatch(initialiseuserInfo(initialUserEditData(user)))
  },[dispatch, user])

  useEffect(() => {
    if(success) history.push('/dashboard/profile')
  },[success,history]);

  const handleReset = (e) => {
    containerRef.current.scrollIntoView();
    dispatch(initialiseuserInfo(initialUserEditData(user)))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    containerRef.current.scrollIntoView();
    dispatch(updateUser(user.userId, userInfo))
  }
  if(userUpdating) return <Container><Loading1 color={true} msg="Profile Updating" /></Container>
  return (
    <>
    <span ref={ containerRef }></span>
    <Container>
     <GoBackBtn />
     <ProfileContainer style={{ marginTop: '0px' }}>
       <ProfileHeading>Edit Profile</ProfileHeading>
       <UserProfile>
        <ProfileImgEdit />
        <EditForm />  
        <DeleteButton onClick={ (e) => handleSubmit(e) } > Save & Exit </DeleteButton>
        <DeleteButton onClick={(e) => handleReset(e) } >Reset</DeleteButton>
      </UserProfile>
     </ProfileContainer>
    </Container>
    </>
  )
}

