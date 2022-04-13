import React from 'react';
import { AuthSpan,
AvatarImage,
AuthorName,
AuthLink } from './GlobalStyledComponents';

export const NoLinkAuthor = ({ blog }) => {
  return (
    <AuthSpan>
              <span>By </span><AvatarImage src={ blog.user.avatar.avatar_url } alt="avatar"/>
              <AuthorName>{ blog.user.username }</AuthorName>
    </AuthSpan>
    ) 
}

export const LinkAuthor = ({ blog }) => {
  return (
    <AuthLink to={ `/dashboard/user_profile/users/${ blog.user._id }` }>
              <span>By </span><AvatarImage src={ blog.user.avatar.avatar_url } alt="avatar"/>
              <AuthorName>{ blog.user.username }</AuthorName>
    </AuthLink>
    ) 
}