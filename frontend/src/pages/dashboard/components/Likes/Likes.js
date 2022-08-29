import React from 'react';
import Like from './Like';
import { useReduxSelector } from '../../../../utils';
import Loading1 from '../Loading1';
import { PostComments } from '../GlobalComponents/StyledComponents/Containers';

export default function Likes() {
  const { Likes: { likesLoading, likes } } = useReduxSelector();
  return (
    <PostComments>
        { 
          likes.map(like => {
            return (
                <Like
                  key={ like._id }  
                  like={ like }                  
                />
              )
          })
        }
       { likesLoading && <Loading1 />}
    </PostComments>
  )
}
/*  { likesLoading && <Loading /> } */