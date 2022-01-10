import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { NEW_POST_RESET } from '../../redux/posts/postTypes';
import { LOG_IN_SUCCESS_RESET } from '../../redux/users/userTypes';

// ============ Pages ============= //
import Home from './pages/home';
import Profile from './pages/profile';
import ProfileEdit from './components/profileEdit';
import Singlepost from './pages/post';
import PostModal from './components/PostModal';
import Userprofile from './pages/userprofile';
import { clearError } from '../../redux/posts/postActions';


export default function Dashboard() {
  const { user } = useSelector(state => state.User)
  const { loading, error, success } = useSelector(state => state.NewPost);
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
    if(success) {
      alert.success(success);
      dispatch({ type: NEW_POST_RESET })
    }
  }, [alert, dispatch, success, error])

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
          <Userprofile />
        </Route>
        <Route exact path="/dashboard">
          <Redirect to={`${match.path}/home`} />
        </Route>
      </Switch>
      { isModal && <PostModal setModal={setIsModal} postId={isModal}/> }
    </>
  )
}