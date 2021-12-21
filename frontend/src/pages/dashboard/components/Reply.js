import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { 
  likeReply,
  deleteReply,
  editReply
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
const Container = styled.div`
 margin-top: 0.1rem;
 display: grid;
 grid-row-gap:0.08rem;
 grid-template-columns: 45px 1fr 45px;
 font-size: 0.9rem;
 padding: 6px 0 0px 6px;
 line-height: 20px;
 p {
   background-color: #f1f1f1;
   padding: 8px;
   border-radius: 10px;
 }
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
const CommentsAndLikes = styled.div`
  font-size: 0.9rem;
  padding: 8px;
  button {
    padding: 1rem 1rem 0 0 ;
  }
`
const ReplyText = styled.p`
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


export default function Reply({ post_id, url, comment_id, reply, handleReply }) {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(reply.text);
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
    setText(reply.text);
    setIsEdit(false);
  }
  return (
      <Container key={ reply.reply_id }>
        <Link to={`${url}/users/${ reply.user_id }`}>
          <AvatarImage src={ reply.userAvatar } alt="avatar"/>
        </Link>
        <ReplyText isEdit={isEdit}>
          <AuthorName>{ reply.username }</AuthorName>
          { reply.text }
        </ReplyText>
        { 
           reply.user_id === user._id 
           &&
           <EditBox 
             isEdit={ isEdit } 
             value={text}
             onChange={ (e) => setText(e.target.value) }
             onKeyUp={ (e) => handleKeyUp(e)}
             />
         }
        <CommentsAndLikes>
          <Button 
            onClick={ (e) => dispatch(likeReply(post_id, comment_id, reply.reply_id)) } >
            { 
              reply.likes.find(like => like.user_id === user._id) ? 
              <AiFillHeart /> 
                :
              <AiOutlineHeart /> 
            } 
          </Button>
        </CommentsAndLikes>
          <Count>
            <div>
              { 
                reply.likes.length > 0 
                  && 
                <span>
                  { reply.likes.length } { reply.likes.length === 1 ? 'Like' : 'Likes' }
                </span> 
              }  
              <Button 
                onClick={ (e) => handleReply(e, reply.username, comment_id) } >
                Reply
              </Button>  
            </div>
               {
                reply.user_id === user._id &&
                  <div>
                     { isEdit && 
                      <Button onClick={(e) => dispatch(editReply(post_id, comment_id, reply.reply_id, { text }))} >
                        Done
                      </Button> 
                     }
                     <Button onClick={ (e) => handleEdit(e) }> { isEdit ? 'Cancel' : 'Edit' } </Button>
                      { !isEdit && 
                       <Button 
                        onClick={ (e) => dispatch(deleteReply(post_id, comment_id, reply.reply_id)) } > 
                        Delete 
                       </Button>
                      }
                  </div>
               }
      </Count>    
    </Container>
  )
}
