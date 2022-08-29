import { useState } from 'react';
import { likeThePost, addComment } from '../../../../redux/posts/postActions';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';

export default function usePost() {
  const { Post : { post: { _id: postId } } } = useReduxSelector();
  const [showComment, setShowComment] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const dispatch = useReduxDispatch();
  
  const handlePostLike = async (e) => {
     e.preventDefault();
     dispatch(likeThePost(postId));
  } 

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    dispatch(addComment( postId, { text: commentBody }));
     if(!showComment) setShowComment(true);
     setCommentBody('')
  } 

  return (
    {
      commentBody,
      showLikes,
      setShowLikes,
      showComment,
      setShowComment,
      setCommentBody,
      handlePostLike,
      handleAddComment
    }
  )
}




 