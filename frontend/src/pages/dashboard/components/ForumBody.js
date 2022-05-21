import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CommonForumHeader from './CommonForumHeader';
import { likeForum } from '../../../redux/forums/forumActions';
import { showCreateCommentForm } from '../../../redux/globals/globalActions';
import ForumInteractions from './ForumInteractions';
import CommentsAndLikes from './CommentsAndLikes';
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
  const { isLiked } = forum;
  const { showCreateComment } = useSelector(state => state.Globals);
  const dispatch = useDispatch();
  const handleLikeForum = () => {
    dispatch(likeForum(forum._id))
  }
  const handleCommentBtn = () => {
    dispatch(showCreateCommentForm(!showCreateComment))
  }
  
  return (
    <>
      <CommonForumHeader forum={ forum } singleForum={ singleForum }/>
      <ForumInteractions isLiked={isLiked} handleLike={handleLikeForum} handleCommentBtn={handleCommentBtn}/>
      <CommentsAndLikes blog={forum} />  
    </>
  )
}
