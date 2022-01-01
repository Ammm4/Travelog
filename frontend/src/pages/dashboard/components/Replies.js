import React from 'react';
import styled from 'styled-components';
import Reply from './Reply';
import { useCommentAPI } from './Comment';
const ReplyContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`

export default function Replies() {
  const { replies } = useCommentAPI();
  return (
    <ReplyContainer>
      { 
        replies.map(reply => {
          return <Reply 
                  key={ reply.reply_id }
                  reply={ reply } 
                />
        })
      }
    </ReplyContainer>
  )
}
