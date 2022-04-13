import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CommonForumHeader from './CommonForumHeader';
import { likeForum } from '../../../redux/forums/forumActions';
import { showCreateCommentForm } from '../../../redux/globals/globalActions';
import { FaRegHeart, FaHeart, FaReply } from "react-icons/fa";
import { 
  CommentsAndLikes,
  PostInteractions,
  InteractionButton
} from './Post';
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
  const { comments, likes } = forum;
  const { user } = useSelector(state => state.User);
  const { showCreateComment } = useSelector(state => state.Globals);
  const totalComments = Array.isArray(comments) ? comments.length : comments;
  const showCreateCommentFormParamater = Array.isArray(comments) ? !showCreateComment : true;
  const likedForum = likes.find(like => like.user._id === user.userId)
  const dispatch = useDispatch();

  return (
    <>
      <CommonForumHeader forum={ forum } singleForum={singleForum}/>
      <PostInteractions>
               <InteractionButton onClick={() => dispatch(likeForum(forum._id))}>         
                 { likedForum ? <FaHeart /> : <FaRegHeart /> }        
               </InteractionButton> 
               <InteractionButton onClick={() => dispatch(showCreateCommentForm(showCreateCommentFormParamater))} >   
                    <FaReply/>    
               </InteractionButton> 
        </PostInteractions>
        <CommentsAndLikes>
          <ForumNumbers>
            <span className='number'> { totalComments }</span>
            <span>replies</span>
          </ForumNumbers>
          <ForumNumbers>
            <span className='number'>{ likes.length }</span>
            <span>likes</span> 
          </ForumNumbers>
          <ForumNumbers>
            <span className='number'>{ forum.views }</span>
            <span>views</span> 
          </ForumNumbers>         
        </CommentsAndLikes>       
    </>
  )
}
