import React, { useState, } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import CommonPostHeader from './CommonPostHeader';
import { ForumNumbers } from './ForumBody';
import { FaRegComment, FaRegHeart, FaHeart, FaReply } from "react-icons/fa";

// Components
import PostDetails from './PostDetails';

export const sharedBtnCss = css`
  display: inline-block;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #021b41;
`
export const PostWrapper = styled.article`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin: ${props => props.singlePost ? '0' : '0 0 2rem 0' };
  padding: ${props => props.singlePost ? '4rem 0 0 0' : '12px' };
  background-color: #fff;
  box-shadow:${props => props.singlePost ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)' };
  cursor:pointer;
  overflow: auto;
  @media only screen and (max-width: 600px) {
     padding: ${props => props.singlePost ? '0 0 2.75rem 0' : '12px' };
     box-shadow: none;
     border-radius: 0;
     border-top: 1px solid #e0e0e0;
     border-bottom: 1px solid #e0e0e0;
  }
`
export const AvatarImage = styled.img`
  src: ${props => props.src};
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
 }
`
export const CommentsAndLikes = styled.div`
  margin-bottom: 0.75rem;
  button {
    padding-right: 0.75rem;
    font-size: 0.95rem;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
      color: #2a78cd;
    }
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
  //background-color: red;
`
export const InteractionButton = styled.button`
  font-size: 1.4rem;
  height: 2.2rem;
  width: 2.2rem;
  //vertical-align: -0.125rem;
  line-height: 1rem;
  display: inline-block;
  
  margin-right: 18px;
  &:hover {
    background-color: #aaa;
    color:#fff;
  }
`

export const CommentPost = styled.div` 
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
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
      position: ${props => props.singlePost ? 'fixed': 'sticky'};
      width:100%;
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
export const LinkToPostDetails = styled(Link)`
  text-decoration: none;
  color: #021b41;
`
const PostBody = styled.main`
  display: grid;
  grid-template-columns: 1fr 38px;
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
export default function Post({ post, singlePost }) {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  let summary = showMore ? post.destinationInfo.summary : post.destinationInfo.summary.slice(0, 150);
  return (
        <PostWrapper singlePost={singlePost}>
          <LinkToPostDetails to={`${location.pathname}/posts/${post._id}`}>
          <CommonPostHeader post={ post } />
          <PostBody>
            <div style={{paddingRight: '20px'}}>
              <PostTitle>
            <h4>Type of Travel: <span>{ post.travellerInfo.travelType }</span></h4>  
          </PostTitle>
          <PostTitle>
            <h4>Time Spent: <span>{ post.travellerInfo.time }</span> </h4>   
          </PostTitle>
          <PostTitle>
            <h4>Summary </h4> 
            { post.destinationInfo.ratings 
                &&
                <Rating
                  ratingValue={ post.destinationInfo.ratings }
                  iconsCount={5}
                  allowHalfIcon={true}
                  size={15}
                  readonly={true}
                  style={{marginTop: '-0.5rem'}}
                />
              }    
            <p> { summary }
                {post.destinationInfo.summary.length > 150 && <Button onClick= { () => setShowMore(!showMore)}> { showMore ? 'less...' :'more...'}</Button>}</p>   
          </PostTitle>
           <PostTitle>
             <h4>Images ({post.images.length})</h4>
             {post.images.length < 1 && <PostImg src="../../images/image-0.jpg"/>}
             { 
              post.images.map((img) => {
               return <PostImg key={img.imgURL} src={img.imgURL} alt="pic" />
              })
             }
           </PostTitle>  
          { <PostDetails data={ post }/> }  
            </div>
              <Box>
                <InteractionButton disabled={true}><FaHeart /></InteractionButton>
                <InteractionButton disabled={true}><FaRegComment /></InteractionButton>
              </Box>
          </PostBody>
        <CommentsAndLikes>
             <ForumNumbers>
               <span className='number'> { post.comments.length }</span>
               <span>comments</span>
             </ForumNumbers>
             <ForumNumbers>
               <span className='number'>{ post.likes.length }</span>
               <span>likes</span> 
             </ForumNumbers>
             <ForumNumbers>
               <span className='number'>{ post.views }</span>
               <span>views</span> 
             </ForumNumbers>   
          </CommentsAndLikes>      
        </LinkToPostDetails>
    </PostWrapper>
  )
}

