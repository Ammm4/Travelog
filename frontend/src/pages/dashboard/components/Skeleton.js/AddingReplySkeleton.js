import React from 'react';
import { useReduxSelector } from '../../../../utils';
import { CommentBody,CommentText, ReplyContainer, AuthorName, StyledParagraph, GridItemContainer, ForumCommentContainer } from '../GlobalComponents/StyledComponents/Containers';
import { AvatarImage  } from '../GlobalComponents/Components/Comment';
import { AvatarImage as Avatar } from '../GlobalComponents/StyledComponents/Images';

export default function AddingReplySkeleton({ post, body }) {
  const { User: { user: { name, avatarURL } } } = useReduxSelector()
  if(post) {
    return (
    <ReplyContainer>
       <AvatarImage src={ avatarURL }/>
       <CommentBody>
         <CommentText>
           <AuthorName> { name } </AuthorName> 
           <StyledParagraph style={{ whiteSpace: 'pre-wrap' }}> { body } </StyledParagraph>            
        </CommentText>
       </CommentBody>
       <GridItemContainer>
         <h5>Posting...</h5>
       </GridItemContainer>
    </ReplyContainer>
   )
  }
  return (
    <ForumCommentContainer>
      <Avatar src={avatarURL} />
      <h4>{ name }</h4>
      <GridItemContainer>
        <CommentText>
          <StyledParagraph style={{ whiteSpace: 'pre-wrap', fontSize: '1rem' }}> { body } </StyledParagraph> 
        </CommentText>
      </GridItemContainer>
      <GridItemContainer style={{ marginBottom: '1rem'}}>
        <h4>Posting...</h4>
      </GridItemContainer>
  </ForumCommentContainer>
  )
}

