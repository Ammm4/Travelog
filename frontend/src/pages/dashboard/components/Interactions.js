import React from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import {FaRegComment} from "react-icons/fa";
import { PostInteractions, InteractionButton } from './GlobalStyledComponents';

export default function Interactions({ isLiked, handleLike, handleCommentBtn }) {
 return (
    <PostInteractions>
      <InteractionButton onClick={ (e) => handleLike(e) } >
        { isLiked ? <FaHeart /> : <FaRegHeart /> } 
      </InteractionButton> 
      <InteractionButton onClick={ (e) => handleCommentBtn(e) } >
        <FaRegComment /> 
      </InteractionButton> 
    </PostInteractions>
  )
}
