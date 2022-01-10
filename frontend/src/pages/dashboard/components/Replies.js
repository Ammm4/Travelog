import React from 'react';
import styled from 'styled-components';
import Reply from './Reply';
import { useSelector } from 'react-redux';
import { useCommentAPI } from './Comment';
const ReplyContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`

export default function Replies() {
  const {singlepost: post} = useSelector(state => state.SinglePost);
  const { commentId } = useCommentAPI();
  const comment = post.comments.find(comment => comment.comment_id === commentId);
  const replies = [...comment.replies]
  const newReversedReplies = replies.reverse();
  return (
    <ReplyContainer>
      { 
        newReversedReplies.map(reply => {
          return <Reply 
                  key={ reply.reply_id }
                  reply={ reply } 
                />
        })
      }
    </ReplyContainer>
  )
}
