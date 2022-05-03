import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Ratings from './Ratings';
import Comments from './Comments';
import { PostForumWrapper, StyledParagraph } from './GlobalComponents/StyledComponents/Containers';
import CommonPostHeader from './CommonPostHeader';
import { PostForumLink } from './GlobalComponents/StyledComponents/Link';
import PostSkeleton from './PostSkeleton'
import CommentsAndLikes from './CommentsAndLikes';
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { likePost, setShowComments, setShowTheComments } from '../../../redux/posts/postActions';
import { setHomePostMarkerId, setProfilePostMarkerId, setUserPostMarkerId } from '../../../redux/globals/globalActions';

// ================== Components ======================//
import PostDetails from './PostDetails';

export const sharedBtnCss = css`
  display: inline-block;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #021b41;
`
export const AvatarImage = styled.img`
  display: inline-block;
  width: 35px;
  height: 35px;
  margin: 0 0.3rem 0 0.35rem;
`
export const AuthorName = styled.span`
 font-weight: 600;
`
export const PostAuthor = styled.div`
  margin-bottom: 0.75rem;
  letter-spacing: 1px;
  border-bottom: 1px solid #efeff0; 
  div {
    display: flex;
    justify-content: space-between;
  }
`
export const AuthLink = styled(Link)`
 text-decoration: none;
 display: flex;
 align-items: center;
 color: #021b41;
`
export const PostTitle = styled.div`
 h4, p {
   margin-bottom: 0.5rem;
 }
 h4 {
   font-size: 0.96rem;
   span {
     font-weight: 400;
   }
 }
 p {
   font-size: 0.9375rem;
   line-height: 1.3333;
   margin-bottom: 0.5rem;
 }
`
export const TotalComments = styled(Link)`
  display: inline-block;
  color: inherit;
  text-decoration: none;
`
export const TotalLikes = styled(Link)`
  display: inline-block;
  color: inherit;
  margin-right: 1rem;
  text-decoration: none; 
`
export const PostInteractions = styled.div`
margin: 0.55rem 0;
text-align: right;
cursor: pointer;
`
const Box = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`
export const InteractionButton = styled.button`
  font-size: 1.3rem;
  height: 2.2rem;
  width: 2.2rem;
  line-height: 1rem;
  display: inline-block;
  margin-right: 16px;
  &:hover {
    background-color: #aaa;
    color:#fff;
  }
`

export const CommentPost = styled.div` 
  position: -webkit-sticky;
  position: sticky;
  bottom: 0.5rem;
  left:0;
  width:100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: 45px 1fr 45px;
  img {
    align-self: end;
  }
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
        background-color: #0275d8;
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
      position: fixed;
      padding: 0 5px 0 5px;
  }
`

export const PostComments = styled.div`
  padding: 8px;
`

export const ActionContainer = styled.div`
  position: relative;
`

export const DeleteButton = styled.button`
  ${sharedBtnCss}
  font-size: 1.8rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${ props => props.showSubmenu ? '#f0f0f0' : 'transparent'};
  color: ${ props => props.showSubmenu ? '#747682' : '#021b41'};
  &:hover {
    color: ${ props => props.showSubmenu ? '#ee0000' : '#747682'};
    background-color: ${ props => props.showSubmenu ? 'transparent' : '#f0f0f0'};
  }
`

export const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #f1f1f1;
`
const PostBody = styled.main`
  display: grid;
  grid-template-columns: 1fr 30px;
  @media(max-width: 450px) {
    grid-template-rows: 1fr;
  }
`
const PostImg = styled.img`
  display:inline-block;
  height: 35px;
  width: 35px;
  margin: 0.15rem;
`
export const Button = styled.button`
  ${sharedBtnCss}
  display: inline-block;
  margin-left: 0.3rem;
  color: #2a78cd;
  letter-spacing: 1px;
  cursor:pointer;
  font-size: 0.835rem;
  &:hover {
    color:#2e5c99;
  }
`
export default function Post({ post, postMarkerRef }) {
  const { _id, isLiked, travellerInfo, destinationInfo, images, showComments, singlePost } = post;
  const [showMore, setShowMore] = useState(false);
  let summary = showMore ? destinationInfo.summary : destinationInfo.summary.slice(0, 150);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if(!postMarkerRef) return;
    postMarkerRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
  },[postMarkerRef])
  
  const handleClick = (postId) => {
    if( location.pathname.match(/\/dashboard\/home/)) {
      return dispatch(setHomePostMarkerId(postId))
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return dispatch(setProfilePostMarkerId(postId))
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      return dispatch(setUserPostMarkerId(postId))
    }
  }
  const handleLikes = () => {

  }
  
  const handleCommentBtn = () => {
    if(singlePost) return dispatch(setShowTheComments(_id, true))
    dispatch(setShowComments(_id,true))
  }
  if(post.deleted) {
    return <PostSkeleton postMarkerRef={postMarkerRef}/>
  }
  return (
        <PostForumWrapper singlePost={ singlePost } ref={ postMarkerRef }>   
          <CommonPostHeader post={ post } />
          <PostBody>
            <div style={{ paddingRight: '20px' }}>
            <PostTitle>
              <h4>Type of Travel: <span>{ travellerInfo.travelType }</span></h4>  
            </PostTitle>
            <PostTitle>
              <h4>Time Spent: <span>{ travellerInfo.time }</span> </h4>   
            </PostTitle>
            <PostTitle>
              <h4>Summary </h4> 
              <Ratings ratings={ destinationInfo.ratings }/>            
              <StyledParagraph style={{ whiteSpace: 'pre-wrap'}}> { summary }
                {destinationInfo.summary.length > 150 && <Button onClick= { () => setShowMore(!showMore)}> { showMore ? 'less...' :'more...'}</Button>}
              </StyledParagraph>   
            </PostTitle>
            <PostTitle>
             <h4>Images ({ images.length })</h4>
             <PostForumLink to={`/dashboard/posts/${_id}`} onClick={() => handleClick(_id)}>
               { images.length < 1 && <PostImg src='https://res.cloudinary.com/ddocnijls/image/upload/v1649796037/postImages/no-image-available-icon-6_necjkv.png'/> }
               { 
                 images.map((img) => {
                   return <PostImg key={img.imgURL} src={img.imgURL} alt="pic" />
                })
               }
             </PostForumLink>
           </PostTitle>  
          { <PostDetails data={ post }/> }  
            </div>
             {/* disabled={true} for audiences */}
              <Box>
                <InteractionButton onClick={() => dispatch(likePost(_id))}> { isLiked ? <FaHeart/> : <FaRegHeart /> }</InteractionButton>
                <InteractionButton onClick={ handleCommentBtn } ><FaRegComment /></InteractionButton>
              </Box>
          </PostBody>
          <CommentsAndLikes blog={ post } />
          { showComments && <Comments post={post}/> }
      </PostForumWrapper>
  )
}

