import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Reply from './Reply';

import { 
  likePostComment, 
  deleteComment,
  editComment 
} from '../../../redux/posts/postActions';

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";


const sharedBtnCss = css`
  display: inline-block;
  outline: none;
  border: none;
  background: transparent;
`
const AvatarImage = styled.img`
  src: ${props => props.src};
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 0.25rem;
`
const AuthorName = styled.span`
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
const CommentContainer = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-row-gap:0.08rem;
 grid-template-columns: 45px 1fr 45px;
 font-size: 0.9rem;
 padding: 6px 0 0px 6px;
 line-height: 20px;
`

const Button = styled.button`
  ${sharedBtnCss}
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

const ReplyContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`

const EditLink = styled(Link)`
  display: inline-block;
  margin-right: 0.4rem;
  text-decoration: none;
`
const DeleteButton = styled(Button)`
  font-size: 1rem;
`
const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #f1f1f1;
`
const CommentText = styled.p`
  display: ${ props => props.isEdit? 'none' : 'block' };
  background-color: #f1f1f1;
  padding: 8px;
  border-radius: 10px;
`
const EditBox = styled.textarea`
  display: ${ props => props.isEdit? 'block' : 'none' };
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  resize: none;
`


export default function Comment({ post_id, url, comment, handleReply }) {
  const [ isEdit, setIsEdit ] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [text, setText] = useState(comment.text);
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const handleKeyUp = (e) => {
    e.target.style.height = '48px';
    e.target.style.height = `${e.target.scrollHeight}px`;
 }

  const handleEdit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      return setIsEdit(true)
    }
    setText(comment.text);
    setIsEdit(false);
  }
  return (
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
           comment.user_id === user._id 
           &&
           <EditBox 
             isEdit={ isEdit } 
             value={ text }
             onChange={ (e) => setText(e.target.value)}
             onKeyUp={ (e) => handleKeyUp(e)}
           />
         }
              <Count>
                <div>
                  { 
                    comment.likes.length > 0 
                      && 
                    <span>{ comment.likes.length } { comment.likes.length === 1 ? 'Like' : 'Likes' }
                    </span> 
                  }
                    <Button 
                      onClick={(e) => handleReply(e, comment.username, comment.comment_id)} >
                      Reply
                    </Button>
                </div>
                {
                   comment.user_id === user._id &&
                   <div>
                     { isEdit 
                       && 
                       <Button onClick={ (e) => dispatch(editComment(post_id, comment.comment_id, { text }))}>
                         Done
                       </Button> 
                     }
                     <Button onClick={ (e) => handleEdit(e) }> 
                       { isEdit ? `Cancel` : `Edit` } 
                      </Button>
                     {!isEdit && <Button onClick={ (e) => dispatch(deleteComment(post_id, comment.comment_id)) }> Delete </Button>}
                   </div>
                 }
              </Count>
              { 
                comment.replies.length > 0 
                  && 
                <>
                  <Line/>
                  <Button onClick={(e) => setShowReply(!showReply)}>
                    {`${showReply ? 'Hide' : 'Show'} 
                      ${ comment.replies.length } 
                      ${ comment.replies.length === 1 ? 'Reply' : 'Replies' }
                      `}  
                  </Button>
                 </>
              } 
            </div>
            <CommentLike>
              <Button 
                onClick= { (e) => dispatch(likePostComment(post_id, comment.comment_id)) } >
               { 
                 comment.likes.find(like => like.user_id === user._id) ? 
                 <AiFillHeart /> 
                   :
                 <AiOutlineHeart /> 
               } 
              </Button>
            </CommentLike>
            
           { 
             showReply 
               &&
             <ReplyContainer>
                { 
                  comment.replies.map(reply => {
                    return (
                      <Reply 
                      key={ reply.reply_id }
                        post_id={ post_id }
                        handleReply={ handleReply }
                        url= { url }
                        comment_id={ comment.comment_id }
                        reply={ reply }
                      />
                      )
                  })
                }
            </ReplyContainer>
          }
    </CommentContainer>
  )
}
