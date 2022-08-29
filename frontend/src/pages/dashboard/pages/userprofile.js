import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { userNavbar } from '../../../constants';
import useProfile from '../components/hooks/useProfile';
import Posts from '../components/Posts/Posts';
import Forums from '../components/Forums/Forums';
import PostBar from '../components/GlobalComponents/Components/PostBar';
import { ProfileHeading } from '../components/GlobalComponents/StyledComponents/Headings';
import { ProfileContainer, UserProfile } from '../components/GlobalComponents/StyledComponents/Containers';
import UserProfileInfos from '../components/GlobalComponents/Components/UserInfo';
import GoBackBtn from '../components/GlobalComponents/Components/GoBackBtn';
import ProfileSkeleton from '../components/Skeleton.js/ProfileSkeleton';

//================== Redux Actions =======================//
import { resetUserPage, setNavbar, setUserPage } from '../../../redux/globals/globalActions';

export default function Userprofile() {
  const { Globals : { userPage: { showPost } } } = useReduxSelector();
  const { user_id } = useParams();
  const dispatch = useReduxDispatch();
  const { loading, user } = useProfile(user_id);
 
  useEffect(() => {
    dispatch(setNavbar(userNavbar))
    dispatch(setUserPage('userType', user_id));
    function handlePopState() {
      dispatch(resetUserPage());
    }
    window.addEventListener('popstate',handlePopState);
    return () => {
      window.removeEventListener('popstate',handlePopState)
    }
  },[dispatch, user_id])

  if(loading || Object.keys(user).length < 1) {
    return <ProfileSkeleton loading={ loading }/>
  }
  return (
    <ProfileContainer>
     <GoBackBtn />
     <ProfileHeading>{user.username}'s Profile</ProfileHeading>
     <UserProfile>
       <UserProfileInfos />
     </UserProfile>
     <PostBar />
     { showPost ? <Posts /> : <Forums /> }
    </ProfileContainer>
  )
}
