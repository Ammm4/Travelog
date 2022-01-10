import React from 'react'
import styled from 'styled-components';
import Comment from './Comment';
import { usePostAPI } from './SinglePost';

const PostComments = styled.div`
  padding: 8px;
`
export default function NewComments() {
  const { newComments } = usePostAPI();
  return (
   <PostComments>
     {
       newComments.map(comment => {
         return  <Comment 
                   key={ comment.comment_id }
                   comment={ comment }
                  />
       })
     } 
   </PostComments>
  )
}
