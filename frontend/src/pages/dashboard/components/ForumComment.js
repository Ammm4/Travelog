import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeComment, updateComment } from '../../../redux/forums/forumActions';
import { AvatarImage } from './Comment';
import { PostInteractions, InteractionButton } from './Post';
import { EditBox, CommentText } from './Comment';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdDone, MdClose } from "react-icons/md";

const CommentContainer = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-template-columns: 35px 1fr 50px;
 grid-template-rows: 35px auto;
 padding: 6px 0 0px 6px;
 line-height: 20px;
 border-bottom: 1px solid #021b41;
 p, textarea, div {
   grid-column-start: 2;
   grid-column-end: 4;
 }
 div:last-child {
   grid-column-start: 1;
    grid-column-end: 4;
 }
`

export default function ForumComment({ comment }) {
  const { likes } = comment;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.User);
  const [newText, setNewText] = useState(comment.body);
  const [ isEdit, setIsEdit] = useState(false);
  const likedComment = likes.find(like => like.user._id === user.userId);

  const handleUpdate = () => {
    dispatch(updateComment(comment._id, { body : newText }))
    setIsEdit(false);
  }
  const handleCancel = () => {
    setNewText(comment.body);
    setIsEdit(false);
  }
  return (
    <CommentContainer>
         <Link>
           <AvatarImage src={comment.user.avatar.avatar_url}/>     
         </Link>
         <h4>{ comment.user.username }</h4>
         {
           <InteractionButton 
               style={{ display: isEdit ? 'none' : 'inline-block'}}
               onClick={ () => setIsEdit(!isEdit) }>
            { comment.user._id === user.userId && <GrEdit /> }
           </InteractionButton>
         }
         <CommentText isEdit={isEdit}>
           {comment.body}
         </CommentText>
         <EditBox 
           isEdit={isEdit} 
           value={ newText }
           onChange={(e) => setNewText(e.target.value)}
           />
          { isEdit &&
           <PostInteractions>
           <InteractionButton onClick={ () => dispatch(handleUpdate) }>
             <MdDone />
           </InteractionButton>
           <InteractionButton onClick={ handleCancel }>
             <MdClose />
           </InteractionButton>
         </PostInteractions> }
         <PostInteractions>
             { likes.length > 0 && likes.length}
           <InteractionButton onClick={ () => dispatch(likeComment(comment._id)) }>
             { likedComment ? <FaHeart /> : <FaRegHeart />}
           </InteractionButton>
         </PostInteractions>
    </CommentContainer>
  )
}
