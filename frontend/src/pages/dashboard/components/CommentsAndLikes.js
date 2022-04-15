import React, { useEffect } from 'react';
import  { useSelector, useDispatch } from 'react-redux';


export default function CommentsAndLikes() {
  const { singlepost: post } = useSelector(state => state.SinglePost);
  const dispatch = useDispatch();
  useEffect(() => {
    /* 
      dispatch(getPostLikes(post._id))
    */
  },[dispatch])
  return (
    <div>CommentsAndLikes</div>
  )
}
