import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';

import { showMe } from './redux/users/userActions';
import { setShowScrollUpBtn } from './redux/globals/globalActions';

// ============ Components ================ //
import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotPass';
import Pagenotfound from './pages/nopage.js';
import ScrollUp from './pages/dashboard/components/GlobalComponents/Components/ScrollUp';

function App() {
 const { User: { user }, Globals: { showScrollUpBtn } } = useSelector(state => state);
 const dispatch = useDispatch();

 useEffect(() => {
   dispatch(showMe())
   function handleScroll() {
      let pos = document.documentElement.scrollTop;
      if(pos > 100) {
        dispatch(setShowScrollUpBtn(true))
      } else {
        dispatch(setShowScrollUpBtn(false))
      }
   }
  window.addEventListener('scroll',handleScroll);
  return () => {
  window.removeEventListener('scroll', handleScroll)
  }
  },[ dispatch ]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/dashboard">
            { user ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/forgot_password">
            <ForgotPassword />
          </Route>
          <Route path="*">
            <Pagenotfound />
          </Route>
        </Switch>
      </Router> 
      { showScrollUpBtn && <ScrollUp /> } 
    </>
  );
}

export default App;
