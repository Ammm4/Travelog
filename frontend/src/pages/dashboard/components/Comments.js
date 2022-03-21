import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useSelector } from 'react-redux';


export const PostComments = styled.div`
  padding: 8px;
  margin-right: 5px;
  min-height: 250px;
  flex: 1 1 auto;
  overflow: auto;
`

export default function Comments() {
  const { singlepost: post } = useSelector(state => state.SinglePost);
  let comments = [...post.comments]
  const reversedComments = comments.reverse();
  return (
    <PostComments>
        { 
          reversedComments.map(comment => {
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
