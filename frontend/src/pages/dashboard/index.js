import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { NEW_POST_RESET } from '../../redux/posts/postTypes';
import { UPDATE_USER_RESET } from '../../redux/users/userTypes';

// ============ Pages ============= //
import Home from './pages/home';
import Profile from './pages/profile';
import ProfileEdit from './components/profileEdit';
import Singlepost from './pages/post';
import SingleForum from './components/SingleForum';
import PostModal from './components/PostModal';
import ForumModal from './components/ForumModal';
import Userprofile from './pages/userprofile';
import { clearError } from '../../redux/posts/postActions';
import { clearError as clearUserError } from '../../redux/users/userActions';
import { setActivePage } from '../../redux/globals/globalActions';
import ChangePassword from './components/ChangePassword';


export default function Dashboard() {
  const { user, success: userSuccess, error: userError } = useSelector(state => state.User);
  const { success, error } = useSelector(state => state.Posts);
  const { error: singlePostError } = useSelector(state => state.Post);
  const { error: singleUserError } = useSelector(state => state.SingleUser);
  const { showModal } = useSelector(state => state.Globals);
  const alert = useAlert();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  
  useEffect( () => {
    if( location.pathname.match(/\/dashboard\/home/) ) {
      dispatch(setActivePage('home'))
    } else if( location.pathname.match(/\/dashboard\/profile/) ) { 
      dispatch(setActivePage('profile'));  
    }
  }, [location, dispatch]);

  useEffect(() => {
    if(showModal) {
      return document.body.style.overflow = 'hidden';
    }
    document.body.style.overflow = 'unset';
  }, [showModal]);

  useEffect(() => {
    if(error) {
      alert.error(error)
      dispatch(clearError())
    }
    if(singleUserError) {
      alert.error(singleUserError);
      dispatch(clearUserError())
    }
    if(singlePostError) {
      alert.error(singlePostError);
      dispatch(clearError())
    }
    if(userError) {
      alert.error(userError);
      dispatch(clearUserError())
    }
    if(success) {
      alert.success(success);
      dispatch({ type: NEW_POST_RESET })
    }
    if(userSuccess) {
      alert.success(userSuccess);
      dispatch({ type: UPDATE_USER_RESET })
    }
  }, [alert, dispatch, success, userSuccess, error, userError, singleUserError, singlePostError])
  
  if(!user) {
    return <Redirect to ="/login" />
  }
  
  return (
    <>
      <Navbar />
      <Switch>   
        <Route exact path={`${match.path}/home`}>
          <Home /> 
        </Route>
        <Route exact path={`${match.path}/profile`}>
          <Profile /> 
        </Route>
        <Route exact path={`${match.path}/profile/edit`}>
          <ProfileEdit /> 
        </Route>
        <Route exact path={`${match.path}/profile/change_password`}>
          <ChangePassword /> 
        </Route>
        <Route exact path={ `${match.path}/posts/:post_id` }>
           <Singlepost /> 
        </Route>
        <Route exact path={`${match.path}/forums/:forumId`}>
          <SingleForum /> 
        </Route>
        <Route exact path={`${match.path}/user_profile/users/:user_id`} >
          <Userprofile />
        </Route>
        <Route exact path="/dashboard"> 
          <Redirect to={`${match.path}/home`} />
        </Route>
        <Route exact path='/dashboard/*'> 
          <div>Page Not Found</div>
        </Route>
      </Switch>
       { 
        showModal 
          &&
        ( 
          showModal.modalType === 'post' ? <PostModal /> : <ForumModal  />
        )
      }
    </>
  )
}