import React from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch } from '../../../../../utils';
import { addComment, addAComment, setPostsPostData, setPostData } from '../../../../../redux/posts/postActions';
import { AvatarImage } from '../StyledComponents/Images';
export const CommentPost = styled.div` 
  width:100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: 45px 1fr 45px;
  margin: 0.75rem 0;
  img {
    align-self: end;
  }
  textarea {
        width: 99%;
        height: 40px;
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
    @media only screen and (max-width: 600px) {
      position: ${props => props.singlePost ? 'fixed' : 'relative'};
      bottom: 0; left:0;
      padding: 0 5px 0 5px;
  }
`

export default function AddComment({ commentInputRef, post }) {
  const { User: { user: { avatarURL }}} = useReduxSelector();
  const { _id: id, singlePost, commentBody } = post;
  const dispatch = useReduxDispatch();
  const handleKeyUp = (e) => {
    e.target.style.height = '35px';
    e.target.style.height = `${ e.target.scrollHeight }px`;
  }
  const handleOnChange = (e, id) => {
    if(singlePost) return dispatch(setPostData('commentBody', e.target.value))
    dispatch(setPostsPostData(id,'commentBody', e.target.value))
  }
  const handleAddComment = () => {
    if(singlePost) {
      dispatch(addAComment(id, { body: commentBody }))
    } else {
      dispatch(addComment(id, { body: commentBody }))
    }
    commentInputRef.current.style.height = '35px';
  }
  return (
    <CommentPost singlePost={ singlePost }>
            <AvatarImage src={ avatarURL} alt="avatar" />
            <textarea 
              ref={ commentInputRef } 
              value={ commentBody } 
              placeholder="Add a comment"
              onChange={ (e) => handleOnChange(e, id) }
              onKeyUp={ (e) => handleKeyUp(e) }
            />
            <button 
              disabled={ !commentBody.trim() ? true : false } 
              onClick={ (e) => handleAddComment() }
             >
               Post
            </button>        
    </CommentPost>
  )
}
