import React from 'react';
import { useReduxDispatch } from '../../../../utils';
import { CommentContainer, AuthorName } from '../GlobalComponents/StyledComponents/Containers';
import { StyledLink } from '../GlobalComponents/StyledComponents/Link';
import { AvatarImage } from '../GlobalComponents/Components/Comment';
import { setShowModal, resetGlobals } from '../../../../redux/globals/globalActions';
import { RESET_LIKES } from '../../../../redux/likes';
export default function Like({ like }) {
const dispatch = useReduxDispatch();
const handleClick = () => {
  dispatch(resetGlobals())
  dispatch({ type: RESET_LIKES });
  dispatch(setShowModal(null))
}
  return (
    <CommentContainer>
      <AvatarImage src={ like.user.avatar.avatar_url } alt="avatar"/>
      <StyledLink to={ `/dashboard/user_profile/users/${ like.user._id }`} onClick={handleClick}>
          <AuthorName style={{fontSize: '1.15rem'}}> {like.user.username} </AuthorName>
      </StyledLink>  
    </CommentContainer>
  )
}
