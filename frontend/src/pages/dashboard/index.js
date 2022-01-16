import React, { useState, useEffect } from 'react';
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
import PostModal from './components/PostModal';
import Userprofile from './pages/userprofile';
import { clearError } from '../../redux/posts/postActions';
import { clearError as clearUserError } from '../../redux/users/userActions';


export default function Dashboard() {
  const { user, success: userSuccess, error: userError } = useSelector(state => state.User);
  const { success, error } = useSelector(state => state.Post);
  const { error: singlePostError } = useSelector(state => state.SinglePost);
  const { error: singleUserError } = useSelector(state => state.SingleUser);
  const [ active, setActive ] = useState();
  const [ isModal, setIsModal ] = useState(null);
  const alert = useAlert();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  
  useEffect( () => {
    if( location.pathname.match(/\/dashboard\/home/) ) {
     setActive('home')
    } else if( location.pathname.match(/\/dashboard\/profile/) ) {
      setActive('avatar')
    }
  }, [location]);

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
      <Navbar active={active}/>
      <Switch>   
        <Route exact path={`${match.path}/home`}>
          <Home setModal={setIsModal}/> 
        </Route>
        <Route exact path={`${match.path}/profile`}>
          <Profile setIsModal={setIsModal} /> 
        </Route>
        <Route exact path={`${match.path}/profile/edit`}>
          <ProfileEdit /> 
        </Route>
        <Route 
           exact 
           path={
             [
               `${match.path}/home/*/posts/:post_id`,
               `${match.path}/profile/*/posts/:post_id`,
               `${match.path}/home/posts/:post_id`,
               `${match.path}/profile/posts/:post_id` 
             ]
             }
         >
           <Singlepost setModal={ setIsModal }  /> 
        </Route>
        <Route exact 
          path= {
            [ 
              `${match.path}/home/*/users/:user_id`, 
              `${match.path}/profile/*/users/:user_id`,
              `${match.path}/home/users/:user_id`,
              `${match.path}/profile/users/:user_id`,
            ]}  
        >
          <Userprofile setModal={ setIsModal } />
        </Route>
        <Route exact path="/dashboard">
          <Redirect to={`${match.path}/home`} />
        </Route>
      </Switch>
      { isModal && <PostModal setModal={setIsModal} postModalInfo={isModal}/> }
    </>
  )
}