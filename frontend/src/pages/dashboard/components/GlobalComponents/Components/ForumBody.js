import React from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch } from '../../../../../utils';
import CommonForumHeader from './CommonForumHeader';
import { likeForum } from '../../../../../redux/forums/forumActions';
import { showCreateCommentForm } from '../../../../../redux/globals/globalActions';
import { PostForumLink } from '../StyledComponents/Link';
import Description from '../../Forum/Description';
import ForumInteractions from './ForumInteractions';
import CommentsAndLikes from './CommentsAndLikes';

import useForum from '../../hooks/useForum';

export const ForumNumbers = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1.2rem 1rem 0;
  .number{
    font-size: 1.85rem;
  }
`
export default function ForumBody({ forum, singleForum }) {
  const { isLiked, body } = forum;
  const { Globals: { showCreateComment }} = useReduxSelector();
  const { handleClick } = useForum();
  const dispatch = useReduxDispatch();
  const handleLikeForum = () => {
    if(!singleForum) return
    dispatch(likeForum(forum._id))
  }
  const handleCommentBtn = () => {
    dispatch(showCreateCommentForm(!showCreateComment))
  }
  
  return (
    <>
      <CommonForumHeader forum={ forum } singleForum={ singleForum }/>
        <PostForumLink to={`/dashboard/forums/${forum._id}`} onClick={() => handleClick(forum._id)}>
        {singleForum && body && <Description body={body}/>}
        { singleForum && 
          <ForumInteractions isLiked={isLiked} handleLike={handleLikeForum} handleCommentBtn={handleCommentBtn}/>
        }
        
        <CommentsAndLikes blog={forum} singleForum={singleForum}/>  
      </PostForumLink>  
    </>
  )
}
