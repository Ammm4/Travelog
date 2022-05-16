import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeComment, updateComment, deleteComment } from '../../../redux/forums/forumActions';
import { resetGlobals } from '../../../redux/globals/globalActions';
import { AvatarImage } from './Comment';
import { PostInteractions, InteractionButton } from './Post';
import { EditBox, CommentText } from './Comment';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdDone, MdClose } from "react-icons/md";
import { ImBin } from "react-icons/im";

const CommentContainer = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-template-columns: 35px 1fr 85px;
 grid-template-rows: 35px auto;
 row-gap: 5px;
 padding: 6px 0 0px 6px;
 line-height: 20px;
 border-bottom: 1px solid #021b41;
 p, textarea, div {
   grid-column-start: 2;
   grid-column-end: 4;
 }
 .btn-container {
   grid-column-start: 3;
   grid-column-end: 4;
 }
 div:last-child {
   grid-column-start: 1;
    grid-column-end: 4;
 }
`

export default function ForumComment({ comment }) {
  const { numLikes, _id, isLiked, body } = comment;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.User);
  const [newText, setNewText] = useState(body);
  const [ isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
 
  const handleUpdate = () => {
    dispatch(updateComment(_id, { body : newText }))
    setIsEdit(false);
  }
  const handleDelete = () => {
    dispatch(deleteComment(_id))
    setIsEdit(false);
  }

  const handleCancel = () => {
    setNewText(body);
    setIsEdit(false);
    setIsDelete(false)
  }

  return (
    <CommentContainer>
         <Link to={`/dashboard/user_profile/users/${comment.user._id}`} onClick={() => dispatch(resetGlobals())}>
           <AvatarImage src={comment.user.avatar.avatar_url}/>     
         </Link>
         <h4>{ comment.user.username }</h4>
         { comment.user._id === user.userId &&
         <div className='btn-container' style={{ display: 'inline-block' }}>
           <InteractionButton 
               style={{ display: isEdit || isDelete ? 'none' : 'inline-block', marginRight: '5px'}}
               onClick={ () => setIsEdit(true) }>
            { comment.user._id === user.userId && <GrEdit />}
           </InteractionButton>
           <InteractionButton 
               style={{ display: isEdit || isDelete ? 'none' : 'inline-block', marginRight: '0px'}}
               onClick={ () => setIsDelete(true) }>
            { comment.user._id === user.userId && <ImBin />}
           </InteractionButton>  
         </div>
         }
         <CommentText isEdit={isEdit} style={{ whiteSpace: 'pre-wrap'}}>
           { body }
         </CommentText>
         <EditBox 
           isEdit={isEdit} 
           value={ newText }
           onChange={(e) => setNewText(e.target.value)}
          />
          { 
           isEdit &&
           <PostInteractions>
              <InteractionButton onClick={ handleUpdate }>
                <MdDone />
              </InteractionButton>
              <InteractionButton onClick={ handleCancel }>
                <MdClose />
              </InteractionButton>
           </PostInteractions> 
          }
          { isDelete &&
           <PostInteractions>
             <p>Confirm Delete ?</p>
            <InteractionButton onClick={ handleDelete }>
              <MdDone />
            </InteractionButton>
            <InteractionButton onClick={ handleCancel }>
              <MdClose />
            </InteractionButton>
           </PostInteractions> 
          }
         <PostInteractions>
             { numLikes > 0 && numLikes }
           <InteractionButton onClick={ () => dispatch(likeComment(_id)) }>
             { isLiked ? <FaHeart /> : <FaRegHeart />}
           </InteractionButton>
         </PostInteractions>
    </CommentContainer>
  )
}
