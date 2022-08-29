import { useState, useEffect } from "react";
import { useReduxDispatch } from "../../../../utils";
import { likeReply, deleteReply, updateReply } from "../../../../redux/forums/forumActions";
import { likePostsCommentReply, editPostsCommentReply, deletePostsCommentReply, editPostCommentReplies, likePostCommentReplies, deletePostReply } from "../../../../redux/posts/postActions";


export default function useReply ( reply, blog, singlePost, post ) {
  const { _id, body, comment } = reply
  const [ isEdit, setIsEdit ] = useState(false);
  const [newText, setNewText] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useReduxDispatch();
  useEffect(() => {
    setNewText(body)
  },[body])

 const handleUpdate = (e) => {
    e.preventDefault();
    if(blog === 'forum') {
      dispatch(updateReply(comment, _id, { body: newText }))
    } 
    if(blog === 'post') {
      if(singlePost) {
        dispatch(editPostCommentReplies(post,comment, _id, { body: newText}))
      } else {
        dispatch(editPostsCommentReply(post,comment, _id, { body: newText}))
      }    
    }
    setIsEdit(false)
  }
   const handleDelete = (e) => {
    e.preventDefault();
    if(blog === 'forum') {
      dispatch(deleteReply(comment, _id))
    }
    if(blog === 'post') {
      if(singlePost) {
        dispatch(deletePostReply(post,comment,_id))
      } else {
        dispatch(deletePostsCommentReply(post,comment,_id))
      }  
    }
    setIsDelete(false)
  } 
  /* const handleUpdate = (e) => {
    e.preventDefault();
    if(blog === 'forum) {
      dispatch(updateReply(_id, { body: newText }))
    }
  
    if(postId) {
      if(singlePost) {
       dispatch(editTheComment( _id, { body: newText }));
    } else {
      dispatch(editComment(postId, _id, { body: newText }));
    }
    } else {
      dispatch(updateComment(_id, { body : newText }))
    }
    setIsEdit(false);
  } */
 /*  const handleDelete = (e) => {
    e.preventDefault();
    if(postId) {
    if(singlePost) dispatch(deleteTheComment(_id))
    dispatch(deletePostComment(postId,_id))
    } else {
      dispatch(deleteComment(_id))
    }
    setIsEdit(false);
  } */
  const handleCancel = () => {
    setNewText(body);
    setIsEdit(false);
    setIsDelete(false)
  }
  const handleLike = (e) => {
   e.preventDefault();
   if(blog === 'forum'){
     dispatch(likeReply(comment,_id))
     return
   }
   if(blog === 'post'){
     if(singlePost) {
      dispatch(likePostCommentReplies(post,comment,_id))
     } else {
      dispatch(likePostsCommentReply(post, comment, _id))
     }
   }
  }
 /* const handleLike = (e) => {
   e.preventDefault();
   if(postId){
     if(singlePost) dispatch(likeTheComment(postId,_id))
     dispatch(likeComment(postId,_id))
     return
   }
   dispatch(likeForumComment(_id))
 } */
  /* const handlePost = async (e, postId, commentId) => {
    e.preventDefault();
    if(!showReply) setShowReply(true);
    setText('');
    setShowReplyInput(false);
} */
  const handleReply = (e, commentAuthor) => {
    e.preventDefault();
  }
  const handleKeyUp = (e) => {
    e.target.style.height = '40px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleEdit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      return setIsEdit(true)
    }
    setIsEdit(false);
  }

  return {
    isEdit,
    setIsEdit,
    isDelete,
    setIsDelete,
    newText,
    setNewText,
    handleCancel,
    handleLike,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleKeyUp,
    handleReply,
    //handlePost
  }

}