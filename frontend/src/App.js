import React, { useEffect } from 'react';
import { useReduxSelector, useReduxDispatch } from './utils';
import Navbar from './Navbar';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
} from 'react-router-dom';
import { useAlert } from 'react-alert';
import { showMe } from './redux/users/userActions';
import { setShowScrollUpBtn } from './redux/globals/globalActions';
import { CLEAR_USER_ERRORS, USER_SUCCESS_RESET } from './redux/users/userTypes';

// ============ Components ================ //
import Homepage from './pages/homepage';
import ProtectedRoute from './pages/protectedRoute';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotPass';
import ResetPassword from './pages/resetPassword';
import PageNotFound from './GlobalComponents/Components/PageNotFound';
import ScrollUp from './pages/dashboard/components/GlobalComponents/Components/ScrollUp';
import ScrollToTop from './ScrollToTop';
import Loading from './GlobalComponents/Components/Loading';


function App() {
 const { User: { user, loading, success: userSuccess, error: userError }, Globals: { showScrollUpBtn } } = useReduxSelector();
 const dispatch = useReduxDispatch();
 const alert = useAlert();

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
 useEffect(() => {
   if(userError) {
      alert.error(userError);
      dispatch({ type: CLEAR_USER_ERRORS })
    }
   if(userSuccess) {
      alert.success(userSuccess);
      dispatch({ type: USER_SUCCESS_RESET })
    }  
 },[alert, dispatch, userError, userSuccess])
  if(loading) return <Loading msg={ loading }/>
  return (
    <>
      <Router>
        <ScrollToTop />
        { !user && <Navbar /> }
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <ProtectedRoute user={user} path="/dashboard">
              <Dashboard />
          </ProtectedRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/forgot_password">
            <ForgotPassword />
          </Route>
          <Route path="/reset_password/:reset_token">
            <ResetPassword />
          </Route>
          <Route path="*">
            <PageNotFound home='/' msg='Page Not Found'/>
          </Route>
        </Switch>
      </Router> 
      { showScrollUpBtn && <ScrollUp /> } 
    </>
  );
}

export default App;
