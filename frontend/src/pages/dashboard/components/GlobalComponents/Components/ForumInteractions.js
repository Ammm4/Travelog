import React from 'react';
import styled from "styled-components";
import { FaRegHeart, FaHeart, FaReply } from "react-icons/fa";
import { PostInteractions } from '../../GlobalComponents/StyledComponents/Containers';

const InteractionButton = styled.button`
  font-size: 1.4rem;
  height: 2.2rem;
  width: 2.2rem;
  line-height: 1rem;
  display: inline-block;
  
  margin-right: 18px;
  &:hover {
    background-color: #aaa;
    color:#fff;
  }
`

export default function ForumInteractions({ isLiked, handleLike, handleCommentBtn}) {
  return (
    <>
      <PostInteractions>
        <InteractionButton onClick={ handleLike }>         
          { isLiked ? <FaHeart /> : <FaRegHeart /> }        
        </InteractionButton> 
        <InteractionButton onClick={handleCommentBtn} >   
          <FaReply/>    
        </InteractionButton> 
      </PostInteractions>
    </>
  )
}

