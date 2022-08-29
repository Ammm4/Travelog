import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { forumNavbar } from '../../../../constants';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { getForum } from '../../../../redux/forums/forumActions';
import { PostContainer,ForumContainer } from '../GlobalComponents/StyledComponents/Containers';
import ForumBody from '../GlobalComponents/Components/ForumBody';
import ForumComments from './ForumComments';
import CreateComment from './CreateComment';
import GoBackBtn from '../GlobalComponents/Components/GoBackBtn';
import SingleForumSkeleton from '../Skeleton.js/SingleForumSkeleton';
import DeletedBlog from '../Skeleton.js/DeletedBlog';
import { setNavbar } from '../../../../redux/globals/globalActions';


export default function SingleForum() {
  const { forumId } = useParams();
  const { 
    Forum : { loading, forum }, 
    User : { user: { userId } }, 
    Globals: { showCreateComment }
  } = useReduxSelector();
  const dispatch = useReduxDispatch();
  
  useEffect(() => {
    dispatch(setNavbar(forumNavbar))
    dispatch(getForum(forumId, userId));
  }, [forumId, dispatch, userId])
  
  if(loading || Object.keys(forum).length < 1) {
    return <PostContainer style={{ paddingTop:'0', marginBottom: '80px' }}>
              <SingleForumSkeleton loading={ loading }/>
           </PostContainer>
  }
  if(forum.deleted) return <DeletedBlog blogType='Forum'/>
  return (
    <PostContainer style={{ paddingTop:'0', marginBottom: '80px' }}>
      <GoBackBtn />
      <ForumContainer>
        <ForumBody forum={ forum } singleForum={ true }/>
      </ForumContainer>
      <ForumComments />
      { showCreateComment && <CreateComment forum = { forum }/> }    
    </PostContainer>
  )
}
