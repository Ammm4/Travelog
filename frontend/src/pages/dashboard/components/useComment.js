import { useState } from "react";
import { usePostAPI } from "./Post";
import axios from "axios";

const reply = (comments, comment_id) => {
  let comment = comments.find(comment => comment.comment_id === comment_id);
  return comment.replies[comment.replies.length - 1]
}

export default function useComment ( comment ) {
  const { setPost, newComments, setNewComments } = usePostAPI();
  const [ isEdit, setIsEdit ] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newReplies, setNewReplies] = useState([]);
  const [editText, setEditText] = useState('');
  const [text, setText] = useState('');
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null });
  const [showSpinner, setShowSpinner] = useState(false);
  
 const newCommentCheck = ( post, commentId ) => {
    if(newComments.length > 0) {
        let editedComment = post.comments.find(comment => comment.comment_id === commentId);
        let newEditedComments = newComments.map(item => {
          if(item.comment_id === commentId) return editedComment;
          return item;
        });
        return setNewComments(newEditedComments)
      }
 }
  const handlePost = async (e, postId, commentId) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const response = await axios.put(`/api/v1/posts/${ postId }/comments/${ commentId }/reply_comment`, { text });
      let newReply = reply(response.data.post.comments, commentId);
      setPost(response.data.post);
      newCommentCheck(response.data.post, commentId);
      setText('');
      if(!showReply) setNewReplies([...newReplies, newReply])
      setShowReplyInput(false);
      setShowSpinner(false);
    } catch(e) {
      console.log(e);
      setText('');
      setShowSpinner(false);
      setShowReplyInput(false);
  }
}
  const handleReply = (e, commentAuthor) => {
    e.preventDefault();
    setShowReplyInput(true);
    setReplyInfo({...replyInfo, replyTo: commentAuthor});
    setText(`@${commentAuthor}`)
  }
  const handleKeyUp = (e) => {
    e.target.style.height = '30px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleEdit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      setEditText(comment.text);
      return setIsEdit(true)
    }
    setText(comment.text);
    setIsEdit(false);
  }

  const toggleHideShow = (e) => {
    e.preventDefault();
    setShowReply(!showReply);
    setNewReplies([]);
  }

  const handleLike = async (e, postId, commentId) => {
    try{
      const response = await axios.put(`/api/v1/posts/${ postId }/comments/${ commentId }/like_comment`);
      setPost(response.data.post);
      newCommentCheck(response.data.post, commentId);
    } catch(error) {
      console.log(e)
    }
  }

  const handleDelete = async (e, postId, commentId) => {
    try {
      const response = await axios.delete(`/api/v1/posts/${ postId }/comments/${ commentId }/delete_comment`);
      setPost(response.data.post);
      if(newComments.length > 0) {
        setNewComments(newComments.filter(comment => comment.comment_id !== commentId))
      }
    } catch(error) {
      console.log(e)
    } 
  }
  
  const handleDone = async (e, postId, commentId) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/posts/${ postId }/comments/${ commentId }/edit_comment`, { text: editText });
      setPost(response.data.post);
      newCommentCheck(response.data.post, commentId);
      setIsEdit(false);
      setEditText('');
    } catch(error) {
      console.log(e)
      setIsEdit(false);
    } 
  }

  return {
    isEdit,
    showReplyInput, setShowReplyInput,
    newReplies, setNewReplies,
    editText,
    text, setText,
    showReply,
    showSpinner,
    setEditText,
    handleDelete,
    handleDone,
    handleEdit,
    handleKeyUp,
    handleLike,
    handleReply,
    toggleHideShow,
    handlePost
  }

}