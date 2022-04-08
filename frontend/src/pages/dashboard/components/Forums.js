import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getForums } from '../../../redux/forums/forumActions';
import Loading1 from './Loading1';
import Forum from './Forum';
import { PostsWrapper } from './Posts';
import Zeropost from './zeropost';

export default function Forums() {
  const { loading, forums } = useSelector(state => state.Forums);
  const { forumsUserType } = useSelector(state => state.Globals)
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getForums(forumsUserType))
  }, [dispatch, forumsUserType]);

  if(loading) {
    return <Loading1 msg="Forums Loading"/>
  }
  
  return (
    <PostsWrapper>
      { forums && 
        forums.length > 0 ? forums.map(forum => <Forum key={forum._id}  forum={forum} />) : <Zeropost blogType="forum" text="no forums yet"/>
      }
    </PostsWrapper>
  )
}
