import React, { useEffect } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { profileNavbar } from '../../../constants';
import ProfileSkeleton from '../components/Skeleton.js/ProfileSkeleton';
import useProfile from '../components/hooks/useProfile';
import Posts from '../components/Posts/Posts';
import Forums from '../components/Forums/Forums';
import PostBar from '../components/GlobalComponents/Components/PostBar';
import ProfileSettings from '../components/profile/ProfileSettings';
import UserProfileInfos from '../components/GlobalComponents/Components/UserInfo';
import { ProfileHeading } from '../components/GlobalComponents/StyledComponents/Headings';
import { ProfileContainer, UserProfile } from '../components/GlobalComponents/StyledComponents/Containers';
import { setNavbar, setProfilePage, resetProfilePage } from '../../../redux/globals/globalActions';

export default function Profile() {
  const { 
    User: { user: { userId }}, 
    Globals : { profilePage: { showPost } }  
  } = useReduxSelector();
  
  const { loading, user } = useProfile(userId);
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setNavbar(profileNavbar));
    dispatch(setProfilePage('userType', userId))
    function handlePopState() {
      dispatch(resetProfilePage())
    }
    window.addEventListener('popstate',handlePopState);
    return () => {
      window.removeEventListener('popstate',handlePopState)
    }
  },[dispatch, userId]);
  
  if(loading || Object.keys(user).length < 1) {
    return <ProfileSkeleton loading={ loading }/>
  }
  return (
    <ProfileContainer>
     <ProfileHeading>{ user.username }'s Profile</ProfileHeading>
     <UserProfile>
       <UserProfileInfos />
       <ProfileSettings  />
     </UserProfile>
     <PostBar  />
     { showPost ? <Posts /> : <Forums /> }
    </ProfileContainer>
  )
}

