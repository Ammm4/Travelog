import React from 'react';
import { useReduxDispatch } from '../../../../../utils';
import { RESET_POSTS } from '../../../../../redux/posts/postTypes';
import { RESET_FORUMS } from '../../../../../redux/forums/forumTypes';
import { resetGlobals } from '../../../../../redux/globals/globalActions';
import { AvatarImage } from '../StyledComponents/Images';
import { AuthLink } from '../StyledComponents/Link';
import { AuthorName } from '../StyledComponents/Containers';
export default function LinkAuthor({ blog }){
  const dispatch = useReduxDispatch()
  const handleClick = () => {
    dispatch({ type: RESET_POSTS });
    dispatch({ type: RESET_FORUMS});
    dispatch(resetGlobals());
  }
  
  return (
    <AuthLink to={ `/dashboard/user_profile/users/${ blog.user._id }`} onClick={handleClick}>
      <span>By </span><AvatarImage src={ blog.user.avatar.avatar_url } alt="avatar"/>
      <AuthorName>{ blog.user.username }</AuthorName>
    </AuthLink>
    ) 
}
