import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PostComments } from './GlobalComponents/StyledComponents/Containers';
import { getTheComments } from '../../../redux/posts/postActions';
import Comment from './Comment';

export default function SinglePostComments() {
  const { 
    User: { user: { userId } }, 
    Post: { post: { _id, comments, singlePost }} 
  } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTheComments(_id, userId))
  },[dispatch,_id, userId])
  return (
    <PostComments style={{ minHeight:'250px' }}>
       {comments.map(comment => {
          comment.singlePost = singlePost;
          return <Comment key={comment._id} comment={comment} />
        })}
    </PostComments>
  )
}
