import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { useSelector } from 'react-redux';
import { usePostAPI } from './SinglePost';
import useComment from './useComment';
import Replies from './Replies';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import Loading1 from './Loading1';


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
  font-size: 0.9rem;
  padding: 8px;
  button {
    padding: 1rem 1rem 0 0 ;
  }
`
export const CommentContainer = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-row-gap:0.08rem;
 grid-template-columns: 45px 1fr 45px;
 font-size: 0.9rem;
 padding: 6px 0 0px 6px;
 line-height: 20px;
`

const Button = styled.button`
  display: inline-block;
  margin-left: 0.35rem;
  color: #888;
  letter-spacing: 1px;
  cursor:pointer;
  font-size: 0.8rem;
  &:hover {
    color:#ccc
  }
`

const Count = styled.div`
   grid-column-start: 2;
   grid-column-end: 3; 
   display: flex;
   justify-content: space-between;
   color: #888;
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
export const CommentText = styled.p`
  display: ${ props => props.isEdit ? 'none' : 'block' };
  background-color: #f1f1f1;
  font-size: 0.825rem;
  padding: 8px;
  border-radius: 2px;
  letter-spacing: 1px;
`
export const EditBox = styled.textarea`
  display: ${ props => props.isEdit? 'block' : 'none' };
  font-family: inherit;
  width: 100%;
  padding: 8px;
  border-radius: 10px;
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
const ReplyContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`
const SpinnerContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`

export default function Comment({ comment }) {
  const { postId } = usePostAPI();
  const { user } = useSelector(state => state.User);
  const { replyLoading } = useSelector(state => state.SinglePost)
  let { url } = useRouteMatch();
  const {
    isEdit,
    showReplyInput, setShowReplyInput,
    editText, setEditText,
    text, setText,
    showReply,
    handleDelete,
    handleDone,
    handleEdit,
    handleKeyUp,
    handleLike,
    handleReply,
    toggleHideShow,
    handlePost
  } = useComment(comment)
  
  return (
    <ContextCommentAPI.Provider value={{
      commentId: comment.comment_id,
      handleReply
    }}>
      <CommentContainer>
        <Link to={ `${url}/users/${ comment.user_id }` }>
          <AvatarImage src={ comment.userAvatar } alt="avatar"/>
        </Link>
        <div>
          <CommentText isEdit={ isEdit }>
            <AuthorName>{ comment.username }</AuthorName> 
              { comment.text }            
          </CommentText>
          { 
            comment.user_id === user.userId 
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
    </ContextCommentAPI.Provider>
  )
}


