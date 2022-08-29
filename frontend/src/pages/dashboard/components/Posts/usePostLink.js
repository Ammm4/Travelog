import { useReduxDispatch, useReactLocation } from '../../../../utils';
import { setHomePage, setProfilePage, setUserPage } from '../../../../redux/globals/globalActions';
import { setPostViews } from '../../../../redux/posts/postActions';

export default function usePostLink() {
  const dispatch = useReduxDispatch();
  const { pathname } = useReactLocation();
  const handleLink = (postId) => {
   dispatch(setPostViews(postId))
   if(pathname.match(/\/dashboard/)) {
      dispatch(setHomePage('postMarkerId', postId))
    }
    if(pathname.match(/\/dashboard\/profile/)) {
      dispatch(setProfilePage('postMarkerId', postId))
    }
    if(pathname.match(/\/dashboard\/user_profile/)) {
      dispatch(setUserPage('postMarkerId', postId))
    }
  }
  return { handleLink }
}
