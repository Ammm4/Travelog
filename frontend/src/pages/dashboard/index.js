import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

// ============ Pages ============= //
import Home from './pages/home';
import Profile from './pages/profile';
import ProfileEdit from './components/profileEdit';
import Singlepost from './pages/post';
import PostModal from './components/PostModal';
import Userprofile from './pages/userprofile';




export default function Dashboard() {
  const { user } = useSelector(state => state.User)
  const [ active, setActive ] = useState();
  const [ isModal, setIsModal ] = useState(null);
  const match = useRouteMatch();
  const location = useLocation();
  
  useEffect( () => {
    if( location.pathname.match(/\/dashboard\/home/) ) {
     setActive('home')
    } else if( location.pathname.match(/\/dashboard\/profile/) ) {
      setActive('avatar')
    }
  }, [location]);

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