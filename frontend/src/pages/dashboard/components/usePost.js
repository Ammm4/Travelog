import { useState } from 'react';
import { likePost, addComment } from '../../../redux/posts/postActions';
import { useSelector, useDispatch } from 'react-redux';

export default function usePost() {
  const { singlepost: { post_id } } = useSelector(state => state.SinglePost);
  const [showComment, setShowComment] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  
  const handlePostLike = async (e) => {
     e.preventDefault();
     dispatch(likePost(post_id));
  } 

  const handlePostComment = async (e, post_id) => {
    e.preventDefault();
    dispatch(addComment( post_id, { text: commentText }));
     if(!showComment) setShowComment(true);
     setCommentText('')
  } 

  return (
    {
      commentText,
      showLikes,
      setShowLikes,
      showComment,
      setShowComment,
      setCommentText,
      handlePostLike,
      handlePostComment
    }
  )
}




 