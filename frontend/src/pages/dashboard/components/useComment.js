import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { 
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
  
  useEffect(() => {
    setEditText(comment.body)
  },[comment])

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
    e.target.style.height = '40px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleEdit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      setEditText(comment.body);
      return setIsEdit(true)
    }
    setText(comment.body);
    setIsEdit(false);
  }

  const toggleHideShow = (e) => {
    e.preventDefault();
    setShowReply(!showReply);
  }

  

  return {
    isEdit,
    showReplyInput, setShowReplyInput,
    editText,
    text, setText,
    showReply,
    setEditText,
    handleEdit,
    handleKeyUp,
    handleReply,
    toggleHideShow,
    handlePost
  }

}