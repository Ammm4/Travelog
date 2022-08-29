import React from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch, handleShowLikes } from '../../../../../utils';
import { CommentContainer, GridItemContainer } from '../StyledComponents/Containers';
import { Line, ViewPostReplyBtn, ShowLikesBtn } from '../StyledComponents/Buttons';
import useComment from '../../hooks/useComment';
import Replies from '../../Replies';
import { MdDone, MdClose } from "react-icons/md";
import { setPostCommentData, setPostsCommentData } from '../../../../../redux/posts/postActions';
import CommentHeader from './CommentHeader';

export const AvatarImage = styled.img`
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 0.25rem;
`
export const Button = styled.button`
  display: ${props => props.isEdit || props.isDelete ? 'none' : 'inline-block'};
  margin-left: 0.35rem;
  color: #021b41;
  letter-spacing: 1px;
  cursor:pointer;
  font-size: 0.8rem;
  &:hover {
    color:#2a78cd
  }
`

export const Count = styled.div`
   display: flex;
   justify-content: space-between;
   color: #021b41;
   div {
     display: inline-block;
     padding: 4px 6px;
     border-radius: 8px;
   }
   span {
     display: inline-block;
     margin-right: 0.65rem;
     font-size: 0.825rem;
     letter-spacing: 1px;
   }
   button {
     font-size: 0.8rem;
   }
`

export const EditBox = styled.textarea`
  display: ${ props => props.isEdit ? 'block' : 'none' };
  font-family: inherit;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  resize: none;
`
//======== Reply =============//

export const DeleteConfirm = styled.p`
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: right;
`
export const CommentFooter = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
  display: grid;
  grid-template-columns: 1fr 30px;
`

export default function Comment({ comment }) {
  const { _id,
    numLikes, 
    editingComment, 
    deletingComment, 
    showReplies,
    numReplies,
    singlePost,
    post
  } = comment;
  const { User: { user: { userId } } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const {
   newText, 
   setNewText, 
   isEdit, 
   setIsEdit, 
   isDelete, 
   setIsDelete,
   handleLike,
   handleUpdate,
   handleDelete,
   handleCancel,
   handleKeyUp,
  } = useComment(comment);
 
  const handleReply = () => {
    if(singlePost) return dispatch(setPostCommentData(_id,'showReplies', true))
    dispatch(setPostsCommentData(post, _id, 'showReplies', true))
  }
  const handleShowReplies = () => {
    if(singlePost) return dispatch(setPostCommentData(_id,'showReplies', !showReplies))
    dispatch(setPostsCommentData(post, _id, 'showReplies', !showReplies))
  }
  return (
      <CommentContainer>
        <CommentHeader 
          comment={comment}
          isEdit={isEdit}
          newText={newText}
          handleReply={handleReply}
          handleLike={handleLike}
          setNewText={setNewText}
          handleKeyUp={handleKeyUp}
        />
        <CommentFooter>
        { isDelete && !editingComment && !deletingComment &&
          <>
            <DeleteConfirm> Confirm Delete ?
              <Button onClick={ (e) => handleDelete(e)}> <MdDone /> </Button> 
              <Button onClick={ handleCancel }> <MdClose /> </Button>
            </DeleteConfirm>
            <span></span>
          </>
        }
        <Count>
          { editingComment && <p>Editing...</p> }
          { deletingComment && <p>Deleting...</p> }
          { !editingComment && !deletingComment && <ShowLikesBtn disabled={ !numLikes} onClick={() => handleShowLikes(dispatch,'comment', _id )}> { numLikes } Likes </ShowLikesBtn> }
          {
            comment.user._id === userId && !editingComment && !deletingComment &&
            <div>
              <Button isEdit={isEdit} isDelete={isDelete} onClick={ (e) => setIsEdit(true) }> Edit </Button>
              <Button isEdit={isEdit} isDelete={isDelete} onClick={ (e) => setIsDelete(true) }> Delete </Button>
              { isEdit       
                && <>
                   <Button onClick={ (e) => handleUpdate(e)}> <MdDone /> </Button> 
                   <Button onClick={ handleCancel }> <MdClose /> </Button>  
                </>
               } 
            </div>
          }
        </Count>
        </CommentFooter>
        {
          numReplies !== 0 
            &&  
          <GridItemContainer style={{ marginTop: '0.35rem' }}>
            <Line /> <ViewPostReplyBtn onClick={ handleShowReplies }>{ showReplies ? 'Hide' : 'Show' } Replies ({ numReplies })</ViewPostReplyBtn> <Line />
          </GridItemContainer>
        }
        {
          showReplies && <Replies comment={comment}/>
        }
      </CommentContainer>
  )
}

