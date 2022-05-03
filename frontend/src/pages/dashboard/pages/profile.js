import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Posts from '../components/Posts';
import Forums from '../components/Forums';
import Share from '../components/Share';
import PostBar from '../components/PostBar';
import ProfileSettings from '../components/ProfileSettings';
import UserProfileInfos from '../components/GlobalComponents/Components/UserInfo';
import { ProfileHeading } from '../components/GlobalComponents/StyledComponents/Headings';
import { ProfileContainer, UserProfile } from '../components/GlobalComponents/StyledComponents/Containers';
import { setShowModal, setPageInitialState, setPostsUserType, setForumsUserType, setShowPostProfile } from '../../../redux/globals/globalActions';


export default function Profile() {
  const { User: { user }, Globals: { profilePageData: { showPost } } } = useSelector(state => state);
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  useEffect(() => {
    dispatch(setPageInitialState('profile', user.userId));
  },[dispatch, user]);
  const setShowPost = () => {
    dispatch(setShowPostProfile(!showPost))
  }
  const handleClick = () => {
    dispatch(setShowModal({ modalType: 'forum', action: 'delete profile'}))
  }
  return (
    <ProfileContainer>
     <ProfileHeading>{ user.name }'s Profile</ProfileHeading>
     <UserProfile>
       <UserProfileInfos user={ user }/>
       <ProfileSettings 
         setShowSettings={setShowSettings}
         showSettings={showSettings}
         match={match}
         handleClick={handleClick}
       />
     </UserProfile>
     <Share />
     <PostBar showPost={ showPost } setShowPost={ setShowPost }/>
     { showPost ? <Posts /> : <Forums /> }
    </ProfileContainer>
  )
}

