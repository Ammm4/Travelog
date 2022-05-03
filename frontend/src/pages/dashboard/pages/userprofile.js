import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { setPageInitialState, setShowPostUser } from '../../../redux/globals/globalActions';

export default function Userprofile() {
  const history = useHistory();
  const { Globals : { userPageData: { showPost } }, SingleUser: { loading, singleUser: user, error } } = useSelector(state => state)
  const { user_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if(error) {
      history.goBack()
    }
  },[error, history])

  useEffect(() => {
    dispatch(setPageInitialState(null,user_id))
    dispatch(getSingleUser(user_id))
  },[dispatch, user_id])

  const setShowPost = () => {
    dispatch(setShowPostUser(!showPost))
  }

  if(loading || Object.keys(user).length < 1) {
    return <Loading msg="Profile Loading"/>
  }
  return (
    <ProfileContainer>
     <GoBackBtn reset={true}/>
     <ProfileHeading>{user.username}'s Profile</ProfileHeading>
     <UserProfile>
       <UserProfileInfos user={ user }/>
     </UserProfile>
     <PostBar showPost={showPost} setShowPost={setShowPost}/>
     { showPost ? <Posts /> : <Forums /> }
    </ProfileContainer>
  )
}
