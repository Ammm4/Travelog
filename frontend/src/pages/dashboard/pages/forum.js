import React, { useEffect } from 'react';
import SingleForum from '../components/Forum/SingleForum';
import { useReduxDispatch } from '../../../utils';
import { FORUM_RESET } from '../../../redux/forums/forumTypes';

export default function Forum() {
  const dispatch = useReduxDispatch();
  useEffect(() => {
    function handlePopState() {
      dispatch({ type: FORUM_RESET });
    }
    window.addEventListener('popstate',handlePopState);
    return () => {
      window.removeEventListener('popstate',handlePopState)
    }
  },[dispatch])
  return <SingleForum />
}
