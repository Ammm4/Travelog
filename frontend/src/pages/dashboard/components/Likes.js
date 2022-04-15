import React from 'react';
import Like from './Like';
import { useSelector } from 'react-redux';

import { PostComments } from './Comments';

export default function Comments() {
  const { singlepost: post } = useSelector(state => state.SinglePost);
  let likes = [...post.likes]
  const reversedLikes = likes.reverse();
  return (
    <PostComments>
        { 
          reversedLikes.map(like => {
            return (
                <Like
                  key={ like.like_id }  
                  like={ like }                  
                />
              )
          })
        }
    </PostComments>
  )
}