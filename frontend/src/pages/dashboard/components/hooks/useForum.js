import { useReactLocation, useReduxDispatch } from '../../../../utils';
import { setHomePage, setProfilePage, setUserPage } from '../../../../redux/globals/globalActions';

export default function useForum() {
  const location = useReactLocation();
  const dispatch = useReduxDispatch();
  const handleClick = (forumId) => {
    if(location.pathname.match(/\/dashboard/)) {
     return  dispatch(setHomePage('forumMarkerId', forumId))
    }
    if(location.pathname.match(/\/dashboard\/profile/)) {
      return dispatch(setProfilePage('forumMarkerId', forumId))
    }
    if(location.pathname.match(/\/dashboard\/user_profile/)) {
      dispatch(setUserPage('forumMarkerId', forumId))
    }
  }
  return{ handleClick }
}
