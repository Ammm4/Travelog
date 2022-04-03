import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../../redux/forums/forumActions';
import styled from 'styled-components';
import { AvatarImage } from './Post';
const Container = styled.div`
  position: fixed;
  background-color: #fff;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-top: 1px solid #efeff0;
`
const CenterContainer = styled.div`
  display: grid;
  grid-template-columns: 45px 1fr 45px;
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 12px 5px;
  textarea {
        width: 99%;
        height: 35px;
        padding: 8px;
        resize: none;
        border: 1px solid #888;
        font-family: inherit;
        font-size: 0.9rem;
        border-radius: 2px;
        letter-spacing: 1px;
        &:focus {
          outline: none;
          box-shadow: 0px 0px 5px rgba(0,0,0,0.5)
        }
     }
     button {
        display: inline-block;
        background-color: #2a78cd;
        color: #fff;
        min-height: 35px;
        max-height: 35px;
        border-radius: 2px;
        font-weight: 600;
        cursor: pointer;
        align-self: end;
        &:disabled {
          background-color: #f1f1f1;
          color: #aaa;
        }
     } 

`

export default function CreateComment() {
  const { user } = useSelector(state => state.User)
  const { forum } = useSelector(state => state.Forum)
  const [commentText,setCommentText] = useState('');
  const commentInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    commentInputRef.current.focus()
  },[])

  const handleKeyUp = (e) => {
    e.target.style.height = '35px';
    e.target.style.height = `${ e.target.scrollHeight }px`;
  }
  const handleCreateComment = (e, forumId) => {
    e.preventDefault();
    dispatch(createComment(forumId, { body: commentText }));
    setCommentText('');
  }

  return (
    <Container>
    <CenterContainer>
      <AvatarImage src={ user.avatarURL } alt="avatar" />
            <textarea 
              ref={ commentInputRef } 
              value={ commentText } 
              placeholder={`Reply to @${forum.user.username}`}
              onChange={ (e) => setCommentText(e.target.value) }
              onKeyUp={ (e) => handleKeyUp(e) }
            />
            <button 
              disabled={ !commentText.trim() ? true : false } 
              onClick={ (e) => handleCreateComment(e, forum._id) }
              >
               Post
            </button>   
    </CenterContainer>
    </Container>
  )
}
