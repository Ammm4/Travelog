import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import Posts from '../components/Posts';
import Forums from '../components/Forums';
import PostBar from '../components/PostBar';
import { ProfileHeading } from '../components/GlobalComponents/StyledComponents/Headings';
import { ProfileContainer, UserProfile } from '../components/GlobalComponents/StyledComponents/Containers';
import UserProfileInfos from '../components/GlobalComponents/Components/UserInfo';
import GoBackBtn from '../components/GoBackBtn';
import Loading from '../components/Loading';
//================== Redux Actions =======================//
import { getSingleUser } from '../../../redux/users/userActions';
import { resetGlobals, setPageInitialState } from '../../../redux/globals/globalActions';

export default function Userprofile() {
  const history = useHistory();
  const { 
    Globals : { pageData: { showPost } }, SingleUser: { loading, singleUser: user, error } 
  } = useReduxSelector();
  const { user_id } = useParams();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if(error) {
      history.goBack()
    }
  },[error, history])

  useEffect(() => {
    function handlePopState() {
      return dispatch(resetGlobals())
    }
    dispatch(setPageInitialState(null,user_id, false, false));
    dispatch(getSingleUser(user_id));
    window.addEventListener('popstate',handlePopState);
    return () => {
      window.removeEventListener('popstate',handlePopState)
    }
  },[dispatch, user_id])

  if(loading || Object.keys(user).length < 1) {
    return <Loading msg="Profile Loading"/>
  }
  return (
    <ProfileContainer>
     <GoBackBtn reset={true}/>
     <ProfileHeading>{user.username}'s Profile</ProfileHeading>
     <UserProfile>
       <UserProfileInfos />
     </UserProfile>
     <PostBar />
     { showPost ? <Posts /> : <Forums /> }
    </ProfileContainer>
  )
}
