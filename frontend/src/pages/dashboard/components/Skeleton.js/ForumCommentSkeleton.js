import React from 'react';
import { ForumCommentsContainer } from '../GlobalComponents/StyledComponents/Containers';
import { Avatar, Author, CommentText, SkeletonForumCommentContainer, LikeComment } from './SkeletonElements';
export default function ForumCommentSkeleton() {
  return (
    <ForumCommentsContainer>
      <SkeletonForumCommentContainer>
        <Avatar className='skeleton-loading'/>
        <Author className='skeleton-loading'/>
        <div></div>
        <div>
          <CommentText className='skeleton-loading'/>
        </div>
        <div></div>
        <div>
          <LikeComment style={{ marginLeft: '96%' }} className='skeleton-loading'/>
        </div> 
      </SkeletonForumCommentContainer>
    </ForumCommentsContainer>
  )
}
