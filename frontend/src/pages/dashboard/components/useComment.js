import { useState } from "react";
import { useDispatch } from "react-redux";

import { 
  deleteComment, 
  likeComment, 
  editComment,
  addReply
} from "../../../redux/posts/postActions";


export default function useComment ( comment ) {
  const [ isEdit, setIsEdit ] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [editText, setEditText] = useState('');
  const [text, setText] = useState('');
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null });
  
  const dispatch = useDispatch();
 
  const handlePost = async (e, postId, commentId) => {
    e.preventDefault();
    dispatch(addReply( postId, commentId, { text } ))
    if(!showReply) setShowReply(true);
    setText('');
    setShowReplyInput(false);
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
  }

  const handleLike = async (e, postId, commentId) => {
    e.preventDefault();
    dispatch(likeComment(postId,commentId))
  }

  const handleDelete = async (e, postId, commentId) => {
    e.preventDefault();
    dispatch(deleteComment(postId, commentId))
  }
  
  const handleDone = async (e, postId, commentId) => {
    e.preventDefault();
    dispatch(editComment(postId, commentId, { text: editText }));
    setIsEdit(false);
    setEditText('');
  }

  return {
    isEdit,
    showReplyInput, setShowReplyInput,
    editText,
    text, setText,
    showReply,
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