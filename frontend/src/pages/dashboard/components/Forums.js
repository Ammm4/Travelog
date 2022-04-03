import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getForums } from '../../../redux/forums/forumActions';
import Loading1 from './Loading1';
import Forum from './Forum';
import { PostsWrapper } from './Posts';

export default function Forums() {
  const { loading, forums } = useSelector(state => state.Forums);
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getForums())
  }, [dispatch]);

  if(loading) {
    return <Loading1 msg="Forums Loading"/>
  }
  
  return (
    <PostsWrapper>
      { forums && forums.map(forum => <Forum key={forum._id}  forum={forum} />)}
    </PostsWrapper>
  )
}
