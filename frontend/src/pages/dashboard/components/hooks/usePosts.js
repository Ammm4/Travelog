import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReduxDispatch } from "../../../../utils";
import { setHomePage, setProfilePage, setUserPage } from "../../../../redux/globals/globalActions";
import { RESET_FORUMS } from "../../../../redux/forums/forumTypes";
import { RESET_POSTS } from "../../../../redux/posts/postTypes";
export default function usePosts( homePage, profilePage, userPage ) {
  const { pathname } = useLocation();
  const [pageData, setPageData] = useState({});
  const dispatch = useReduxDispatch();
  
  useEffect(() => {
    if(pathname.match(/\/dashboard/)) {
      const { showPost, showCreate, userType, postMarkerId, forumMarkerId } = homePage
      setPageData ({ showPost, showCreate, userType, postMarkerId, forumMarkerId })
    }
    if(pathname.match(/\/dashboard\/profile/)) {
      const { showPost, showCreate, userType, postMarkerId, forumMarkerId} = profilePage
      setPageData ({ showPost, showCreate, userType, postMarkerId, forumMarkerId })
    }
    if(pathname.match(/\/dashboard\/user_profile/)) {
      const {showPost, showCreate, userType, postMarkerId, forumMarkerId} = userPage
      setPageData ({ showPost, showCreate, userType, postMarkerId, forumMarkerId })
    }
  },[ homePage, profilePage, userPage, pathname ])

  const handleClickPosts = () => {
    dispatch({ type: RESET_FORUMS })
    if(pathname.match(/\/dashboard/)) {
      dispatch(setHomePage('forumMarkerId', null));
      dispatch(setHomePage('showPost', true));
    }
    if(pathname.match(/\/dashboard\/profile/)) {
      dispatch(setProfilePage('forumMarkerId', null));
      dispatch(setProfilePage('showPost', true))
    }
    if(pathname.match(/\/dashboard\/user_profile/)) {
      dispatch(setUserPage('forumMarkerId', null));
      dispatch(setUserPage('showPost', true))
    }
  }
  const handleClickForums = () => {
    dispatch({ type: RESET_POSTS })
    if(pathname.match(/\/dashboard/)) {
      dispatch(setHomePage('postMarkerId', null));
      dispatch(setHomePage('showPost', false))
    }
    if(pathname.match(/\/dashboard\/profile/)) {
      dispatch(setProfilePage('postMarkerId', null));
      dispatch(setProfilePage('showPost', false))
    }
    if(pathname.match(/\/dashboard\/user_profile/)) {
      dispatch(setUserPage('postMarkerId', null));
      dispatch(setUserPage('showPost', false))
    }
  }

 return { pageData, handleClickForums, handleClickPosts }

}