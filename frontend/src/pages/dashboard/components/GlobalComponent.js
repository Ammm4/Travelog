import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthSpan,
AvatarImage,
AuthorName,
AuthLink } from './GlobalStyledComponents';
import { resetGlobals } from '../../../redux/globals/globalActions';

export const NoLinkAuthor = ({ blog }) => {
  return (
    <AuthSpan>
              <span>By </span><AvatarImage src={ blog.user.avatar.avatar_url } alt="avatar"/>
              <AuthorName>{ blog.user.username }</AuthorName>
    </AuthSpan>
    ) 
}

export const LinkAuthor = ({ blog }) => {
  const dispatch = useDispatch();
  return (
    <AuthLink to={ `/dashboard/user_profile/users/${ blog.user._id }`} onClick={() => dispatch(resetGlobals())}>
              <span>By </span><AvatarImage src={ blog.user.avatar.avatar_url } alt="avatar"/>
              <AuthorName>{ blog.user.username }</AuthorName>
    </AuthLink>
    ) 
}