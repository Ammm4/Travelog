import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { StyledParagraph } from './GlobalComponents/StyledComponents/Containers';
import useComment from './useComment';
//import Replies from './Replies';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Loading1 from './Loading1';
import { MdDone, MdClose } from "react-icons/md";
import { resetGlobals } from '../../../redux/globals/globalActions';
import { 
  deleteComment,
  deleteTheComment, 
  likeComment,
  likeTheComment,
  editComment,
  editTheComment
} from "../../../redux/posts/postActions";

const ContextCommentAPI = React.createContext();

export const useCommentAPI = () => {
  return useContext(ContextCommentAPI)
};

export const AvatarImage = styled.img`
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 0.25rem;
`
const AvatarImage1 = styled.img`
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 0.25rem;
`
export const AuthorName = styled.span`
 display: flex;
 align-items: center;
 font-weight: 600;
`

const CommentLike = styled.div`
  font-size: 0.95rem;
  padding: 8px;
  display: flex;
  align-items: center;
`
export const CommentContainer = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-row-gap:0.08rem;
 grid-template-columns: 45px 1fr;
 font-size: 0.9rem;
 padding: 6px 0 0px 6px;
 line-height: 20px;
`

const Button = styled.button`
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
const CommentBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
`


const Count = styled.div`
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
const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #f1f1f1;
`
export const CommentText = styled.div`
  display: ${ props => props.isEdit ? 'none' : 'block' };
  background-color: #f1f1f1;
  font-size: 0.825rem;
  padding: 8px;
  border-radius: 2px;
  letter-spacing: 1px;
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
const CommentPost = styled.div` 
  padding: 8px;
  display: grid;
  grid-template-columns: 32px 1fr 45px;
  align-items:center;
  a {
    align-self: end;
  }
  div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 38px;
    grid-column-gap: 4px;
    textarea {
        width: 100%;
        height: 28px;
        resize: none;
        font-family: inherit;
        border: 1px solid #888;
        font-size: 0.8rem;
        padding: 6px;
        border-radius: 10px;
        letter-spacing: 1px;
        &:focus {
          outline: none;
          box-shadow: 0px 0px 5px rgba(0,0,0,0.5)
        }
     }
      button {
        display: inline-block;
        background-color: #0275d8;
        color: #fff;
        height: 28px;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        align-self: end;
        &:disabled {
          background-color: #f1f1f1;
          color: #aaa;
        }
     }
  }
`
const DeleteConfirm = styled.p`
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: right;
`
const ReplyContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`
const SpinnerContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`

export default function Comment({ comment }) {
  const { isLiked, numLikes, post: postId, singlePost } = comment;
  const { user } = useSelector(state => state.User);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  

  const dispatch = useDispatch();
  const {
    editText, setEditText, handleKeyUp,
  } = useComment(comment)
  const handleEdit = () => {
    setIsEdit(true);
    setIsDelete(false)
  }
  const handleDeleteBtn = () => {
    setIsEdit(false);
    setIsDelete(true)
  }
  const handleCancel = () => {
    setIsEdit(false);
    setIsDelete(false)
  }
  const handleLike = async (e, postId, commentId) => {
    e.preventDefault();
    if(singlePost) return dispatch(likeTheComment(postId,commentId))
    dispatch(likeComment(postId,commentId))
  }

  const handleDelete = async (e, postId, commentId) => {
    e.preventDefault();
    if(singlePost) return dispatch(deleteTheComment(postId, commentId))
    dispatch(deleteComment(postId, commentId))
  }
  
  const handleDone = async (e, postId, commentId) => {
    e.preventDefault();
    if(singlePost) {
       dispatch(editTheComment(commentId, { body: editText }));
    } else {
      dispatch(editComment(commentId, { body: editText }));
    }
    setIsEdit(false);
    setEditText('');
  }
  return (
      <CommentContainer>
        <Link to={ `/dashboard/user_profile/users/${ comment.user._id }` } onClick={() => dispatch(resetGlobals())}>
          <AvatarImage src={ comment.user.avatar.avatar_url } alt="avatar"/>
        </Link>
        <CommentBody>
          <CommentText isEdit={ isEdit }>
            <AuthorName>{ comment.user.username }</AuthorName> 
              <StyledParagraph style={{ whiteSpace: 'pre-wrap'}}>{ comment.body }</StyledParagraph>            
          </CommentText>
          { 
            <EditBox 
              isEdit={ isEdit } 
              value={ editText }
              onChange={ (e) => setEditText(e.target.value) }
              onKeyUp={ (e) => handleKeyUp(e) }
            />
          }
        <CommentLike>
           <Button onClick= { (e) => handleLike(e, postId, comment._id)} >
             { isLiked ? <AiFillHeart /> : <AiOutlineHeart /> } 
           </Button>
        </CommentLike>
        { isDelete       
           && 
          <>
            <DeleteConfirm>Confirm Delete ?
              <Button onClick={ (e) => handleDelete(e, comment._id)}> <MdDone /> </Button> 
              <Button onClick={handleCancel}> <MdClose /> </Button>
            </DeleteConfirm>
            <span></span>
          </>
        }
        <Count>
          <span> { numLikes } Likes </span>
          {
            comment.user._id === user.userId &&
            <div>
              <Button isEdit={isEdit} isDelete={isDelete} onClick={ (e) => handleEdit(e) }> Edit </Button>
              <Button isEdit={isEdit} isDelete={isDelete} onClick={ (e) => handleDeleteBtn(e, postId, comment._id) }> Delete </Button>
              { isEdit       
                && <>
                   <Button onClick={ (e) => handleDone(e, postId, comment._id)}> <MdDone /> </Button> 
                   <Button onClick={ handleCancel }> <MdClose /> </Button>  
                </>
               } 
            </div>
          }
        </Count>
        </CommentBody>
      </CommentContainer>
  )
}

/*
  {!isEdit && <Button onClick={ (e) => handleDelete(e, postId, comment._id) }> Delete </Button>}
<ContextCommentAPI.Provider value={{
      commentId: comment.comment_id,
      handleReply
    }}>
      <CommentContainer>
        <Link to={ `${url}/users/${ comment.user }` }>
          <AvatarImage src={ comment.userAvatar } alt="avatar"/>
        </Link>
        <div>
          <CommentText isEdit={ isEdit }>
            <AuthorName>{ comment.username }</AuthorName> 
              { comment.text }            
          </CommentText>
          { 
            comment.user === user.userId 
              &&
            <EditBox 
              isEdit={ isEdit } 
              value={ editText }
              onChange={ (e) => setEditText(e.target.value) }
              onKeyUp={ (e) => handleKeyUp(e) }
            />
          }
          <Count>
            <div>
            { 
              comment.likes.length > 0 
                && 
              <span>
                { comment.likes.length } { comment.likes.length === 1 ? 'Like' : 'Likes' }
               </span> 
            }
            <Button 
              onClick={(e) => handleReply(e, comment.username)} >
              Reply
            </Button>
            </div>
            {
              comment.user_id === user.userId &&
                <div>
                { isEdit 
                  && 
                  <Button onClick={ (e) => handleDone(e, postId, comment.comment_id)}>
                    Done
                  </Button> 
                }
                  <Button onClick={ (e) => handleEdit(e) }> 
                    { isEdit ? `Cancel` : `Edit` } 
                  </Button>
                   {!isEdit && <Button onClick={ (e) => handleDelete(e, postId, comment.comment_id) }> Delete </Button>}
                  </div>
                  }
                </Count>
                { 
                  comment.replies.length > 0 
                    && 
                  <>
                    <Line/>
                    <Button onClick={(e) => toggleHideShow(e)}>
                      {`${ showReply ? 'Hide' : 'Show' } 
                        ${ comment.replies.length } 
                        ${ comment.replies.length === 1 ? 'Reply' : 'Replies' }
                        `}  
                    </Button>
                  </>
                } 
              </div>
              <CommentLike>
                <Button 
                  onClick= { (e) => handleLike(e, postId, comment.comment_id)} >
                { 
                  comment.likes.find(like => like.user_id === user._id) ? 
                  <AiFillHeart /> 
                    :
                  <AiOutlineHeart /> 
                } 
                </Button>
              </CommentLike>

            {
              replyLoading 
                &&
                <SpinnerContainer>
                  <Loading1 />
                </SpinnerContainer>   
            }       
            {     
              showReply 
                &&
              <Replies />
            }
            { 
              showReplyInput 
                &&
              <ReplyContainer>
                <CommentPost>
                  <Link>
                    <AvatarImage1 src={ user.avatar.avatar_url } alt="avatar" />
                  </Link>
                  <div>
                    <textarea            
                      placeholder="Add a comment"
                      value={ text }
                      onChange={ (e) => setText(e.target.value) }
                      onKeyUp={ (e) => handleKeyUp(e) }
                      autoFocus
                    />
                    <button 
                      disabled={ !text.trim() ? true : false } 
                      onClick={ (e) => handlePost(e, postId, comment.comment_id) }
                      >
                      Post
                    </button>
                  </div>
                  <Button onClick={(e) => setShowReplyInput(false)}><MdClear /></Button>
              </CommentPost>
            </ReplyContainer>
            }
      </CommentContainer>
    </ContextCommentAPI.Provider>*/

