import React from 'react';
import { useReduxDispatch } from '../../../../utils';
import useComment from '../hooks/useComment';
import { ForumCommentContainer, PostInteractions, CommentText, CommentInteractionBar, GridItemContainer } from '../GlobalComponents/StyledComponents/Containers';
import { EditBox } from '../GlobalComponents/Components/Comment';
import { Button, ViewReplyBtn } from '../GlobalComponents/StyledComponents/Buttons';
import { setCommentData } from '../../../../redux/forums/forumActions';
import ForumReplies from './ForumReplies';
import ForumCommentHeader from './ForumCommentHeader';
import { InteractionButton } from '../Posts/Post';
import { setShowModal } from '../../../../redux/globals/globalActions';
import { FaHeart, FaRegHeart, FaReply, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdDone, MdClose } from "react-icons/md";

export default function ForumComment({ comment }) {
  const { numLikes, numReplies, isLiked, body, updatingComment, deletingComment, showReplies, user: { username } } = comment;
  const dispatch = useReduxDispatch();
  const { newText, 
    setNewText, 
    isEdit,
    setIsEdit,
    isDelete,
    setIsDelete, 
    handleLike,
    handleUpdate,
    handleDelete,
    handleCancel,
    handleKeyUp
  } = useComment(comment)
  const handleReply = () => {
    dispatch(setCommentData(comment._id,'replyBody',`@${username}`));
    dispatch(setCommentData(comment._id,'showReplies', true))
  }
  return (
    <ForumCommentContainer>
       <ForumCommentHeader 
         blog={comment}
         isEdit={isEdit}
         setIsEdit={setIsEdit}
         isDelete={isDelete}
         setIsDelete={setIsDelete}
       />
       <GridItemContainer>
         <CommentText isEdit={ isEdit } style={{ whiteSpace: 'pre-wrap', fontSize:'1rem' }}>
           { !updatingComment ? body : newText }
        </CommentText>
        <EditBox
           className='editBox'
           isEdit={ isEdit } 
           value={ newText }
           onChange={(e) => setNewText(e.target.value)}
           onKeyUp={ (e) => handleKeyUp(e) }
          />
       </GridItemContainer> 
       { updatingComment && <p>Editing...</p> }
       { deletingComment && <p>Deleting...</p> }
       { 
           isEdit && !updatingComment && !deletingComment &&
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
        { isDelete && !updatingComment && !deletingComment &&
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
            <Button onClick={() => dispatch(setShowModal({ modalType: 'likes', type: 'comment', id: comment._id }))}>
              { numLikes } Likes
            </Button>
            <ViewReplyBtn onClick={ () => dispatch(setCommentData(comment._id,'showReplies', !showReplies))}>
            { !numReplies ? 0 : numReplies } Replies
            { showReplies ? <FaAngleUp style={{ fontSize: '1.25rem' }}/> : <FaAngleDown style={{fontSize: '1.25rem'}}/>}
           </ViewReplyBtn>
          </div> 
           <PostInteractions>      
             <InteractionButton onClick={ (e) => handleLike(e) }>
               { isLiked ? <FaHeart /> : <FaRegHeart />}
             </InteractionButton>
             <InteractionButton onClick={ handleReply }>
               <FaReply />
             </InteractionButton>
           </PostInteractions>  
        </CommentInteractionBar>
        { showReplies && <ForumReplies comment={comment}/> }  
    </ForumCommentContainer>
  )
}
