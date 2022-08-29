import React, { useEffect, useRef } from 'react';
import { useReduxDispatch, useReduxSelector } from '../../../../utils';
import { ForumCommentsContainer } from '../GlobalComponents/StyledComponents/Containers';
import ForumComment from './ForumComment';
import { getComments } from '../../../../redux/forums/forumActions';
import ViewMoreBtn from '../GlobalComponents/Components/ViewMoreBtn';
import ForumCommentSkeleton from '../Skeleton.js/ForumCommentSkeleton';
import AddingCommentSkeleton from '../Skeleton.js/AddingCommentSkeleton';


export default function ForumComments() {
  const { 
    Forum: { commentLoading, addingComment, forum: { _id, comments, commentBody, numComments } }, 
    User: { user: { userId }} 
  } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const newCommentRef = useRef();
 
  useEffect(() => {
    dispatch(getComments(_id, userId, 1)) 
  }, [dispatch, _id, userId])
 const handleClick = () => {
    const pageNumber = Math.floor((comments.length/3) + 1);
    dispatch(getComments(_id, userId, pageNumber))
  }
  return (
    <ForumCommentsContainer>
      { addingComment && <AddingCommentSkeleton post={false} commentBody={commentBody} newCommentRef={newCommentRef}/>}
      { comments.map(comment => <ForumComment key={comment._id} comment={comment} />) }
      {
        commentLoading && <ForumCommentsContainer>
              { [1,2,3].map(n => <ForumCommentSkeleton key={n}/>) }
         </ForumCommentsContainer>
      }
      { !commentLoading && <ViewMoreBtn numComments={numComments} comments={comments.length} handleClick={handleClick}/>}
    </ForumCommentsContainer>
  )
}
