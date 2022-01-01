import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePost(postId) {
  const [commentPosting, setCommentPosting] = useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [post, setPost] = useState(null);
  const [newComments, setNewComments] = useState('');
  const [postLoadingError, setPostLoadingError] = useState(null);

  useEffect(() => {
     setPostLoading(true);
     async function getPost(){
       try {
        const response = await axios(`/api/v1/posts/${ postId }`);
        setPost(response.data.post);
        setPostLoading(false);
       } catch(error) {
         setPostLoadingError(error);
         setPostLoading(false)
       }
     }
     getPost();
  }, [ postId ])

  const handlePostLike = async (e) => {
     e.preventDefault();
     try {
        const response = await axios.put(`/api/v1/posts/${ postId }/like_post`);
        setPost(response.data.post);
      } catch(error) {
        setPostLoadingError(error);
      }
  } 

  const handlePostComment = async (e, postId) => {
     setCommentPosting(true);
     e.preventDefault();
     try {
        const response = await axios.put(`/api/v1/posts/${ postId }/comment_post`, {text: commentText});
        setPost(response.data.post);
        if(!showComment) {
          setNewComments([...newComments, response.data.post.comments[response.data.post.comments.length - 1]])
        }
        setCommentPosting(false);
      } catch(error) {
        setPostLoadingError(error);
      }
     setCommentText('')
  } 

  return (
    {
      post,
      setPost,
      commentText,
      showComment,
      setShowComment,
      setCommentText,
      commentPosting,
      postLoading,
      newComments,
      setNewComments,
      postLoadingError,
      handlePostLike,
      handlePostComment
    }
  )
}
