import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router';

// ============ Pages ============= //
import Home from './pages/home';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import Singlepost from './pages/post';
import PostModal from './components/PostModal';
import Userprofile from './pages/userprofile';





export default function Dashboard({ user }) {
  const [active, setActive] = useState('home');
  const [isModal, setIsModal] = useState(false);
  const match = useRouteMatch();
  const location = useLocation();

  useEffect( () => {
    if( location.pathname.match(/\/dashboard\/home/) ) {
     setActive('home')
    } else if( location.pathname.match(/\/dashboard\/profile/) ) {
      setActive('avatar')
    }
  }, [location])
 
  return (
    <>
      <Navbar user={user} active={active}/>
      <Redirect to={`${match.path}/home`}/>
      <Switch>   
        <Route exact path={`${match.path}/home`}>
          <Home user={user} setModal={setIsModal}/> 
        </Route>
        <Route exact path={`${match.path}/profile`}>
          <Profile user={user} setIsModal={setIsModal} /> 
        </Route>
        <Route exact path={`${match.path}/profile/edit`}>
          <ProfileEdit user={user}  /> 
        </Route>
        <Route exact path={[`${match.path}/home/posts/:post_id`,`${match.path}/profile/posts/:post_id` ]}>
           <Singlepost user={user}  /> 
        </Route>
        <Route exact path={`${match.path}/home/users/:user_id`}>
          <Userprofile />
        </Route>
      </Switch>
      { isModal && <PostModal setModal={setIsModal}/> }
    </>
  )
}