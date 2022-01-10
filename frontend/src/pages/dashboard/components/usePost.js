import { useState } from 'react';
import { likePost, addComment } from '../../../redux/posts/postActions';
import { useSelector, useDispatch } from 'react-redux';

export default function usePost( postId ) {
  const { singlepost: post } = useSelector(state => state.SinglePost);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  
  const handlePostLike = async (e) => {
     e.preventDefault();
     dispatch(likePost(postId));
  } 

  const handlePostComment = async (e, postId) => {
    e.preventDefault();
    dispatch(addComment( postId, { text: commentText }));
     if(!showComment) setShowComment(true);
     setCommentText('')
  } 

  return (
    {
      post,
      commentText,
      showComment,
      setShowComment,
      setCommentText,
      handlePostLike,
      handlePostComment
    }
  )
}




 