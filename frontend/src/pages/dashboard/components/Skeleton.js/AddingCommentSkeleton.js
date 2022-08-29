import React, { useEffect } from 'react';
import { ForumCommentContainer, 
  CommentContainer, 
  CommentBody, 
  AuthorName, 
  CommentText, 
  StyledParagraph,
  CommentLike,
  GridItemContainer } from '../GlobalComponents/StyledComponents/Containers';
import { AvatarImage } from '../GlobalComponents/Components/Comment';
import { useReduxSelector } from '../../../../utils';

export default function AddingCommentSkeleton({ post, commentBody, newCommentRef }) {
  useEffect(() => {
    newCommentRef.current.scrollIntoView({ block: 'center',behavior: "smooth" });
  },[newCommentRef])
  const { User: { user: { name, avatarURL }}} = useReduxSelector();
  if(post) return (
     <CommentContainer ref={ newCommentRef }>
     <AvatarImage src={ avatarURL }/>
     <CommentBody>
        <CommentText isEdit={ false }>
         <AuthorName>{ name }</AuthorName> 
         <StyledParagraph style={{ whiteSpace: 'pre-wrap'}}>{ commentBody }</StyledParagraph>            
       </CommentText>
     </CommentBody>
     <CommentLike />
     <p style={{fontSize: '0.9rem'}}>Posting...</p>
    </CommentContainer>
  )
  return (
    <ForumCommentContainer ref={ newCommentRef }>
     <AvatarImage src={ avatarURL }/>
     <h4>{name}</h4>
     <GridItemContainer>
       <CommentBody>
       <CommentText isEdit={ false }>
         <StyledParagraph style={{ whiteSpace: 'pre-wrap', fontSize: '1rem'}}>{ commentBody }</StyledParagraph>            
       </CommentText>
     </CommentBody>
     </GridItemContainer>
     <CommentLike />
     <p style={{margin: '0.85rem 0 2rem 0'}}>Posting...</p>
    </ForumCommentContainer>
  )
}
