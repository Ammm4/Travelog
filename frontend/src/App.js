import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';

import { setuser } from './redux/users/userActions';

// ============ Components ================ //
import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import Pagenotfound from './pages/nopage.js';


function App() {
 const { user } = useSelector(state => state.User);
 const dispatch = useDispatch();

 useEffect(() => {
    dispatch(setuser())
  },[dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/dashboard">
            { user ? <Dashboard user={user}/> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="*">
            <Pagenotfound />
          </Route>
        </Switch>
      </Router>  
    </>
  );
}

export default App;
