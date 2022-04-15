import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { CommentContainer, AuthorName, AvatarImage} from './Comment';
export default function Like({ like }) {
  let { url } = useRouteMatch();
  return (
    <CommentContainer>
        <Link to={ `${url}/users/${ like.user_id }` }>
          <AvatarImage src={ like.userAvatar } alt="avatar"/>
        </Link>
        <div>
          <AuthorName> {like.username} </AuthorName>
        </div>
      </CommentContainer>
  )
}
