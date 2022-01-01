import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { usePostAPI } from './Post';



const PostComments = styled.div`
  padding: 8px;
`

export default function Comments() {
  const { comments } = usePostAPI();
  return (
    <PostComments>
        { 
          comments.map(comment => {
            return (
                <Comment
                  key={ comment.comment_id }       
                  comment={ comment }                           
                />
              )
          })
        }
      </PostComments>
  )
}
