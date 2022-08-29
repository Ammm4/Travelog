import React from 'react';
import { 
  CommentBody,
  CommentContainer 
} from '../GlobalComponents/StyledComponents/Containers';
import { Avatar, CommentText, FooterName2, LikeComment } from './SkeletonElements';

export default function CommentSkeleton() {
  
  return (
      <CommentContainer>
        <Avatar className='skeleton-loading'/>
        <CommentBody>
          <CommentText className='skeleton-loading'/>
          <LikeComment />
          <FooterName2 style={{ marginTop: '0.45rem' }} className='skeleton-loading'/>
        </CommentBody>
      </CommentContainer>
  )
}
