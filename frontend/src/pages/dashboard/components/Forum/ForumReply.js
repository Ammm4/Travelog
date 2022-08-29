import React from 'react';
import { useReduxDispatch } from '../../../../utils';
import { ForumCommentContainer, CommentText, PostInteractions, CommentInteractionBar, GridItemContainer } from '../GlobalComponents/StyledComponents/Containers';
import { EditBox } from '../GlobalComponents/Components/Comment';
import { InteractionButton } from '../Posts/Post';
import { Button } from '../GlobalComponents/StyledComponents/Buttons';
import { setCommentData } from '../../../../redux/forums/forumActions';
import ForumCommentHeader from './ForumCommentHeader';
import useReply from '../hooks/useReply'; 
import { MdDone, MdClose } from 'react-icons/md';
import { FaHeart, FaReply, FaRegHeart } from 'react-icons/fa';



export default function ForumReply({ reply }) {
  const { user: { username }, body, isLiked, numLikes, updatingReply, deletingReply, comment } = reply;
  const {
    newText,
    setNewText,
    isEdit,
    setIsEdit,
    isDelete,
    setIsDelete,
    handleDelete,
    handleUpdate,
    handleCancel,
    handleLike,
    handleKeyUp
  } = useReply(reply,'forum');
  const dispatch = useReduxDispatch()
  return (
    <ForumCommentContainer>
      <ForumCommentHeader 
        blog={reply}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
      />
      <GridItemContainer>
        <CommentText isEdit={ isEdit } style={{ whiteSpace: 'pre-wrap', fontSize:'1rem' }}>
           { !updatingReply ? body : newText }
        </CommentText>
        <EditBox
           className='editBox'
           isEdit={ isEdit } 
           value={ newText }
           onChange={(e) => setNewText(e.target.value)}
           onKeyUp={ (e) => handleKeyUp(e) }
          />
      </GridItemContainer>
      { updatingReply && <p>Editing...</p> }
      { deletingReply && <p>Deleting...</p> }
      { 
         isEdit && !updatingReply && !deletingReply &&
          <GridItemContainer>
            <PostInteractions>
              <InteractionButton onClick={ handleUpdate }>
                <MdDone />
              </InteractionButton>
              <InteractionButton onClick={ handleCancel }>
                <MdClose />
              </InteractionButton>
            </PostInteractions> 
          </GridItemContainer>
      }
      { isDelete && !updatingReply && !deletingReply &&
        <GridItemContainer>
          <PostInteractions>
          <p>Confirm Delete ?</p>
          <InteractionButton onClick={ handleDelete }>
            <MdDone />
          </InteractionButton>
          <InteractionButton onClick={ handleCancel }>
            <MdClose />
          </InteractionButton>
        </PostInteractions> 
        </GridItemContainer>
        
      }
      <CommentInteractionBar>
        <div>
          <Button>
           { numLikes } Likes
          </Button> 
        </div>
        <PostInteractions>
          <InteractionButton onClick={ (e) => handleLike(e) }>
            { isLiked ? <FaHeart /> : <FaRegHeart />}
          </InteractionButton>
          <InteractionButton onClick = { (e) =>  dispatch(setCommentData(comment, 'replyBody', `@${username}`))}>
            <FaReply />
          </InteractionButton>
        </PostInteractions>  
    </CommentInteractionBar>  
    </ForumCommentContainer>
  )
}