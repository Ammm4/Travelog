import React from 'react';
import useReply from './hooks/useReply';
import { useReduxSelector, useReduxDispatch , handleShowLikes  } from '../../../utils';
import ReplyHeader from './ReplyHeader';
import { ReplyContainer } from './GlobalComponents/StyledComponents/Containers';
import { CommentFooter, DeleteConfirm, Button, Count } from './GlobalComponents/Components/Comment';
import { ShowLikesBtn } from './GlobalComponents/StyledComponents/Buttons';
import { MdDone, MdClose } from 'react-icons/md';
import {  } from '../../../utils';

export default function Reply({ reply, post, singlePost }) {
  const { _id: id, user: { _id }, numLikes, deletingReply, editingReply } = reply;
  const { User: { user: { userId } } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const {
   isEdit,
   setIsEdit,
   isDelete,
   setIsDelete,
   newText,
   handleKeyUp,
   handleReply,
   handleLike,
   handleDelete,
   handleCancel,
   handleUpdate,
   setNewText
   } = useReply(reply,'post', singlePost, post)
  
  return (
    <ReplyContainer>
       <ReplyHeader 
         reply={reply}
         isEdit={isEdit}
          newText={newText}
          handleReply={handleReply}
          handleLike={handleLike}
          setNewText={setNewText}
          handleKeyUp={handleKeyUp}
       />
       <CommentFooter>
        { isDelete && !editingReply && !deletingReply &&
          <>
            <DeleteConfirm> Confirm Delete ?
              <Button onClick={ (e) => handleDelete(e)}> <MdDone /> </Button> 
              <Button onClick={ handleCancel }> <MdClose /> </Button>
            </DeleteConfirm>
            <span></span>
          </>
        }
        <Count>
          { editingReply && <p>Editing...</p> }
          { deletingReply && <p>Deleting...</p> }
          { !editingReply && !deletingReply && <ShowLikesBtn disabled={ !numLikes } onClick={() => handleShowLikes(dispatch, 'reply', id) }> { numLikes } Likes </ShowLikesBtn> }
          {
            _id === userId && !editingReply && !deletingReply &&
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
    </ReplyContainer>
  )
}
