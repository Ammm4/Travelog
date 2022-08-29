import { useState, useEffect } from "react";
import { useReduxDispatch } from "../../../../utils";
import { updateComment, deleteComment, likeComment as likeForumComment } from "../../../../redux/forums/forumActions";
import { editComment, editTheComment, deleteComment as deletePostComment, deleteTheComment, likeComment, likeTheComment } from "../../../../redux/posts/postActions";

export default function useComment (comment) {
  const { _id, body, post: postId, singlePost } = comment
  const [ isEdit, setIsEdit ] = useState(false);
  const [newText, setNewText] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useReduxDispatch()
  useEffect(() => {
    setNewText(body)
  },[body])

  const handleUpdate = (e) => {
    e.preventDefault();
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
  }
  const handleDelete = (e) => {
    e.preventDefault();
    if(postId) {
      if(singlePost) {
        dispatch(deleteTheComment(_id))
      } else {
        dispatch(deletePostComment(postId,_id))
      }
    } else {
      dispatch(deleteComment(_id))
    }
    setIsEdit(false);
  }
  const handleCancel = () => {
    setNewText(body);
    setIsEdit(false);
    setIsDelete(false)
  }
 const handleLike = (e) => {
   e.preventDefault();
   if(postId){
     if(singlePost) return dispatch(likeTheComment(postId,_id))
     return dispatch(likeComment(postId,_id))
   }
   dispatch(likeForumComment(_id))
 }

 const handleKeyUp = (e) => {
    e.target.style.height = '40px';
    e.target.style.height = `${e.target.scrollHeight}px`;
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
    handleKeyUp,
  }

}