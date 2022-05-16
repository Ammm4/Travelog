import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// =================== Imported Components ============================//
import { ProfileContainer, UserProfile } from './GlobalComponents/StyledComponents/Containers';
import { ProfileHeading } from './GlobalComponents/StyledComponents/Headings';
import { Button } from './DeleteBox';
import GoBackBtn from './GoBackBtn';
//==================== Redux Actions ==============================//
import { updateUser } from '../../../redux/users/userActions';
import { initialiseuserInfo } from '../../../redux/globals/globalActions';
//===================== Icons ====================================//
import EditForm from './profileEdit/EditForm';
import ProfileImgEdit from './profileEdit/profileImgEdit';
import Loading from './Loading';

export const Container = styled.div`
  width: 99%;
  margin: 5.5rem auto 1.5rem auto;
`
const initialUserEditData = (user) => {
  const { username, email, about, city, country, hobbies, avatar: { avatar_url: avatarImg }, cover: {cover_url: coverImg} } = user;
   return { username, email, about, city, country, hobbies, avatarImg, coverImg }
}
export default function ProfileEdit() {
  const { SingleUser: { singleUser: user, userUpdating, success }, Globals: { userInfo } } = useSelector(state => state);
  const containerRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(initialiseuserInfo(initialUserEditData(user)))
  },[dispatch, user])

  useEffect(() => {
    if(success) {
      history.goBack()
    }
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
  
  return (
    <>
    <span ref={containerRef}></span>
    <Container>
      {userUpdating && <Loading msg="Profile Updating"/>}
     <GoBackBtn />
     <ProfileContainer style={{ marginTop: '0px' }}>
       <ProfileHeading>Edit Profile</ProfileHeading>
       <UserProfile>
        <ProfileImgEdit />
        <EditForm />  
        <Button onClick={ (e) => handleSubmit(e) } > Save & Exit </Button>
        <Button onClick={(e) => handleReset(e) } >Reset</Button>
      </UserProfile>
     </ProfileContainer>
    </Container>
    </>
  )
}

