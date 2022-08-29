import React from 'react';
import styled from 'styled-components';
import { useReduxDispatch, handleShowLikes } from '../../../../../utils';
import { CommonButtonTheme } from '../StyledComponents/Buttons';
import { setPostsPostData, setPostData } from '../../../../../redux/posts/postActions';

export const CommentsLikesContainer = styled.div`
  margin-bottom: 0.75rem;
`
const ForumButtons = styled.button`
  ${CommonButtonTheme}
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1.2rem 1rem 0;
  .number {
    font-size: 1.85rem;
  }
`
const ForumNumbers = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1.2rem 1rem 0;
  .number {
    font-size: 1.85rem;
  }
`

export default function CommentsAndLikes({ blog, singleForum }) {
  const { travellerInfo, views, numComments, numLikes, showComments, singlePost, _id } = blog;
  const dispatch = useReduxDispatch();
  const handleComments = () => {
    if(singlePost) return dispatch(setPostData('showComments', !showComments))
    dispatch(setPostsPostData(_id,'showComments',!showComments))
  }
  
  if(travellerInfo) return (
    <CommentsLikesContainer>
      <ForumButtons onClick={ () => handleShowLikes(dispatch, 'post', _id) } disabled={ !numLikes }>
        <span className='number'>{ numLikes }</span>
        <span>likes</span> 
      </ForumButtons>
      <ForumButtons onClick={handleComments}>
        <span className='number'> { numComments }</span>
        <span>comments</span>
      </ForumButtons>
      <ForumNumbers>
        <span className='number'>{ views }</span>
        <span>views</span> 
      </ForumNumbers>      
    </CommentsLikesContainer>
  )
  return (
    <CommentsLikesContainer>
      {
        singleForum ? 
          <ForumNumbers onClick={() => handleShowLikes(dispatch, 'forum', _id)}>
            <span className='number'> { numLikes } </span>
            <span>likes</span> 
          </ForumNumbers> 
          :
          <ForumNumbers>
            <span className='number'>{ numLikes }</span>
            <span>likes</span> 
          </ForumNumbers>
      }
      
      <ForumNumbers>
        <span className='number'> { numComments }</span>
        <span>replies</span>
      </ForumNumbers>
      <ForumNumbers>
        <span className='number'>{ views }</span>
        <span>views</span> 
      </ForumNumbers>      
    </CommentsLikesContainer>
  )
}

