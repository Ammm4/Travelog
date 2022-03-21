import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { useSelector } from 'react-redux';
import { usePostAPI } from './SinglePost';
import useComment from './useComment';
import Replies from './Replies';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import Loading1 from './Loading1';

import { CommentContainer, AuthorName, AvatarImage} from './Comment';

export default function Like({ like }) {
  const { postId } = usePostAPI();
  const { user } = useSelector(state => state.User);
  const { replyLoading } = useSelector(state => state.SinglePost)
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
