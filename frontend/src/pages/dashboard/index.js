import React, { useEffect } from 'react';
import Navbar from './components/NavBar/Navbar';
import { Switch, Route, useRouteMatch } from 'react-router';
import { useReduxSelector, useReduxDispatch } from '../../utils';
import { useAlert } from 'react-alert';
import { RESET_POSTS_SUCCESS, CLEAR_POST_ERRORS, CLEAR_POSTS_ERRORS } from '../../redux/posts/postTypes';
import { CLEAR_USER_ERRORS } from '../../redux/users/userTypes';
import { CLEAR_FORUMS_ERRORS, RESET_FORUMS_SUCCESS, CLEAR_FORUM_ERRORS } from '../../redux/forums/forumTypes';
import PageNotFound from '../../GlobalComponents/Components/PageNotFound';
// ============ Pages ============= //
import Home from './pages/home';
import Profile from './pages/profile';
import ProfileEdit from './components/profile/profileEdit';
import Singlepost from './pages/post';
import Forum from './pages/forum';
import PostModal from './components/Modals/PostModal';
import ForumModal from './components/Modals/ForumModal';
import Userprofile from './pages/userprofile';
import { setShowModal, resetPostInfo, initialiseForumForm } from '../../redux/globals/globalActions';
import ChangePassword from './components/profile/ChangePassword';
import LikeModal from './components/Modals/LikeModal';

export default function Dashboard() {
  const { 
          Posts: { success: postsSuccess, postsError },
          Post: { error: postError },
          Forums: { success: forumsSuccess, error: forumsError },
          Forum: { error: forumError },
          SingleUser: { error: singleUserError },
          Globals: { showModal }
   } = useReduxSelector()
  const alert = useAlert();
  const dispatch = useReduxDispatch();
  const match = useRouteMatch();
  
  useEffect(() => {
    if(showModal) {
      return document.body.style.overflow = 'hidden';
    }
    document.body.style.overflow = 'unset';
  }, [showModal]);

  useEffect(() => {
    if(postsError) {
      alert.error(postsError)
      dispatch({ type: CLEAR_POSTS_ERRORS })
    }
    if(singleUserError) {
      alert.error(singleUserError);
      dispatch({ type: CLEAR_USER_ERRORS })
    }
    if(postError) {
      alert.error(postError);
      dispatch({ type: CLEAR_POST_ERRORS })
    }
    if(forumsError) {
      alert.error(forumsError)
      dispatch({ type: CLEAR_FORUMS_ERRORS })
    }
    if(forumError) {
      alert.error(forumError)
      dispatch({ type: CLEAR_FORUM_ERRORS })
    }
    
  }, [alert, dispatch, singleUserError, postsError, postError, forumsError, forumError])
  
  useEffect(() => {
    if(postsSuccess) {
      alert.success(postsSuccess);
      dispatch(resetPostInfo());
      dispatch(setShowModal(null))
      dispatch({ type: RESET_POSTS_SUCCESS  })
    }
    if(forumsSuccess) {
      alert.success(forumsSuccess);
      dispatch(initialiseForumForm({ title: '', body: '' }))
      dispatch(setShowModal(null));
      dispatch({ type: RESET_FORUMS_SUCCESS })
    }
  },[ alert, dispatch, forumsSuccess, postsSuccess])
  return (
    <>
      <Navbar />
      <Switch>  
        <Route exact path="/dashboard"> 
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
          <Forum /> 
        </Route>
        <Route exact path={`${match.path}/user_profile/users/:user_id`} >
          <Userprofile />
        </Route>  
        <Route path='/dashboard/*'> 
          <PageNotFound home='/dashboard' msg='Page Not Found'/>
        </Route>
      </Switch>
       { 
        showModal 
          &&
        ( 
          showModal.modalType === 'post' ? <PostModal /> : showModal.modalType === 'forum' ? <ForumModal  /> : <LikeModal />
        )
      }
    </>
  )
}