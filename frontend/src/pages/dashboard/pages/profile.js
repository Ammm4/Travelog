import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import Posts from '../components/Posts';
import Forums from '../components/Forums';
import PostBar from '../components/PostBar';
import ProfileSettings from '../components/ProfileSettings';
import UserProfileInfos from '../components/GlobalComponents/Components/UserInfo';
import { ProfileHeading } from '../components/GlobalComponents/StyledComponents/Headings';
import { ProfileContainer, UserProfile } from '../components/GlobalComponents/StyledComponents/Containers';
import { setPageInitialState } from '../../../redux/globals/globalActions';
import { getSingleUser } from '../../../redux/users/userActions';
import Loading from '../components/Loading';

export default function Profile() {
  const { User: { user: { userId }}, SingleUser: { loading, singleUser: user, error }, Globals: { profilePageData: { showPost, showUpBtn } } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(setPageInitialState('profile', userId, true));
    dispatch(getSingleUser(userId)); 
  },[dispatch, userId]);
  useEffect(() => {
    if(error) {
      history.goBack()
    }
  },[error, history])

  if(loading || Object.keys(user).length < 1) {
    return <Loading msg="Profile Loading"/>
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

