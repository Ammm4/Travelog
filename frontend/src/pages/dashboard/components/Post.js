import React, { useState, } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { useSelector } from 'react-redux';

// Components
import PostImages from './PostImages';
import PostDetails, { usePostDetails } from './PostDetails';

//Icons 
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";



export const sharedBtnCss = css`
  display: inline-block;
  outline: none;
  border: none;
  background: transparent;
`
export const PostWrapper = styled.article`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin: ${props => props.singlePost ? '0' : '0 0 1.2rem 0' };
  padding: ${props => props.singlePost ? '4rem 0 0 0' : '0' };
  background-color: #fff;
  box-shadow:${props => props.singlePost ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)' };
  cursor:pointer;
  overflow: auto;
  @media only screen and (max-width: 600px) {
     padding: ${props => props.singlePost ? '0 0 2.75rem 0' : '0' };
     box-shadow: none;
  }
`
export const AvatarImage = styled.img`
  src: ${props => props.src};
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 0.25rem;
`
export const AuthorName = styled.span`
 display: flex;
 align-items: center;
 font-weight: 600;
`
export const PostAuthor = styled.div`
  display: grid;
  grid-template-columns: 45px 1fr 40px;
  margin-bottom: 0.75rem;
  padding: 8px;
  letter-spacing: 1px;
  border-bottom: 2px solid #f1f1f1;
  span {
    font-weight: 700;
  }
`

export const PostTitle = styled.div`
 margin-bottom: 0.75rem;
 padding: 8px;
 letter-spacing: 1px;
 h4, p {
   margin-bottom: 0.5rem;
 }
 h4 {
   font-size: 0.95rem;
 }
 p {
   font-size: 0.8rem;
 }
`
export const CommentsAndLikes = styled.div`
  font-size: 0.9rem;
  padding: 8px;
  button {
    padding: 1rem 1rem 0 0 ;
  }
  span {
    display: inline-block;
    padding: 1rem 1rem 0 0 ;
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
export const Button = styled.button`
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

export const PostInteractions = styled.div`
border-top: 1px solid #f1f1f1;
border-bottom: 1px solid #f1f1f1;
padding: 10px;
cursor: pointer;

`
export const InteractionButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-size: 1rem;
  display: inline-block;
  margin-right: 5px;
`

export const CommentPost = styled.div` 
  padding: 8px;
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
        resize: none;
        border: 1px solid #888;
        font-family: inherit;
        font-size: 0.9rem;
        padding: 8px;
        border-radius: 15px;
        letter-spacing: 1px;
        &:focus {
          outline: none;
          box-shadow: 0px 0px 5px rgba(0,0,0,0.5)
        }
     }
     button {
        ${sharedBtnCss}
        display: inline-block;
        background-color: #0275d8;
        color: #fff;
        min-height: 35px;
        max-height: 35px;
        border-radius: 5px;
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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DeleteButton = styled(Button)`
  font-size: 1rem;
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
`

export default function Post({ post, setModal, singlePost }) {
  const { details } = usePostDetails(post);
  const { user } = useSelector(state => state.User);
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  let { url } = useRouteMatch();
  
  
  
  return (
        <PostWrapper singlePost={singlePost}>
          <PostAuthor>
            <Link to={ `${ url }/users/${ post.author.authorId }` }>
              <AvatarImage src={ post.author.authorAvatar } alt="avatar"/>
            </Link>
            <div>
              <AuthorName>{ post.author.authorName }</AuthorName>
              <h5>{ post.destinationInfo.destination }, { post.destinationInfo.country }</h5>
              { post.destinationInfo.ratings 
                &&
                <Rating
                  ratingValue={ post.destinationInfo.ratings }
                  iconsCount={5}
                  allowHalfIcon={true}
                  size={15}
                  readonly={true}
                />
              }
            </div>
            { 
              post.author.authorId === user._id && 
              <ActionContainer>
                  <DeleteButton onClick={ (e) => setModal({ postId: post.post_id, action: 'Edit Post' }) }><AiFillEdit /></DeleteButton>
                  <DeleteButton onClick={ (e) => setModal({ postId: post.post_id, action: 'delete' })}><MdDelete /></DeleteButton>
              </ActionContainer>
            }
          </PostAuthor>
          { 
            <PostImages images={ post.images } postId={ post.post_id } />
          } 
          <PostTitle>
            <h4>Summary</h4>    
            <p> { post.destinationInfo.summary }</p>
            <Button 
              onClick={ () => setShowInfo(!showInfo) } > 
              <BsFillInfoCircleFill/> { showInfo ? 'Less Info... ': 'More Info...' }
            </Button>
          </PostTitle>  
          { showInfo && <PostDetails data={ details }/> }
           
          <LinkToPostDetails to={`${location.pathname}/posts/${post.post_id}`}>
               <CommentsAndLikes>
                 { post.likes.length > 0 && 
                   <span >
                     { post.likes.length ===  1 ? '1 Like' : `${ post.likes.length } Likes` } 
                   </span>
                 }
                 { post.comments.length > 0 &&
                   <span > 
                    { post.comments.length ===  1 ? '1 comment' : `${ post.comments.length } comments` }
                   </span>
                 }
               </CommentsAndLikes>
               <PostInteractions>
                 <InteractionButton 
                  disabled={true}>
                   { 
                     post.likes.find(like => like.user_id === user._id) ? 
                     <AiFillHeart /> 
                     :
                     <AiOutlineHeart /> 
                   } 
                 </InteractionButton> 
                 <InteractionButton 
                   disabled={true}  >
                  <FaComments/> 
                 </InteractionButton> 
              </PostInteractions>

             { 
               post.comments.length > 0 && 
                 <PostComments>
                   <Line/>
                   <Button disabled={true}>
                     { post.comments.length } { post.comments.length === 1 ? 'Comment' : 'Comments' }
                   </Button>
                </PostComments>
             }
  
             <CommentPost singlePost={singlePost}>
                <AvatarImage src={ user.avatar.avatar_url } alt="avatar" />
                <textarea 
                  placeholder="Got a question??, Ask John!"
                  disabled={true}
                />
                <button 
                 disabled={true}
                >
                  Post
                </button>        
            </CommentPost>          
           </LinkToPostDetails>
        </PostWrapper>
  )
}

