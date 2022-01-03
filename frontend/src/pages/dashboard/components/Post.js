import ReactStars from "react-rating-stars-component";
import React, { useState, useRef, useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { useSelector } from 'react-redux';


import PostImages from './PostImages';
import Comments from './Comments';
import NewComments from './NewComments';
import PostDetails, { usePostDetails } from './PostDetails';

import Loading1 from './Loading1';

//Icons IoTrashBinSharp  MdDeleteForever AiOutlineEdit AiFillEdit
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";

import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import usePost from "./usePost";

const ContextAPI = React.createContext();

export const usePostAPI = () => {
  return useContext(ContextAPI)
}

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
const PostWrapper = styled.article`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin: ${props => props.singlePost ? '0' : '0 0 0.75rem 0' };
  padding: ${props => props.singlePost ? '4rem 0 0 0' : '0' };
  background-color: #fff;
  box-shadow:${props => props.singlePost ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)' };
  cursor:pointer;
  overflow: auto;
  @media only screen and (max-width: 600px) {
     padding: ${props => props.singlePost ? '0 0 2.75rem 0' : '0' };
  }
`
const PostAuthor = styled.div`
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

const PostTitle = styled.div`
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
const CommentsAndLikes = styled.div`
  font-size: 0.9rem;
  padding: 8px;
  button {
    padding: 1rem 1rem 0 0 ;
  }
`
const TotalComments = styled(Link)`
  text-decoration: none;
  `
const TotalLikes = styled(Link)`
  display: inline-block;
  margin-right: 1rem;
  text-decoration: none; 
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

const PostInteractions = styled.div`
border-top: 1px solid #f1f1f1;
border-bottom: 1px solid #f1f1f1;
padding: 10px;
cursor: pointer;

`
const InteractionButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-size: 1rem;
  display: inline-block;
  margin-right: 5px;
`

const CommentPost = styled.div` 
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

const PostComments = styled.div`
  padding: 8px;
`

const ActionContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function Post({ postId, setModal, singlePost }) {
  const { 
    post,
    setPost,
    commentPosting,
    postLoading,
    showComment,
    setShowComment,
    newComments,
    setNewComments,
    postLoadingError,
    handlePostLike,
    commentText,
    setCommentText,
    handlePostComment
  } = usePost(postId);

  const { details } = usePostDetails(post);
  const { user } = useSelector(state => state.User);
  //const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null });
  const commentInputRef = useRef();
  let { url } = useRouteMatch();

  const handleCommentIconClick = (e) => {
    e.preventDefault();
    commentInputRef.current.focus();
    setReplyInfo({...replyInfo, replyTo: null, commentId: null })
  }

  const handleKeyUp = (e) => {
    e.target.style.height = '35px';
    e.target.style.height = `${ e.target.scrollHeight }px`;
  }
  
  const toggleHideShow = (e) => {
    e.preventDefault();
    setShowComment(!showComment);
    setNewComments([])
  }
 
  if(postLoading) {
    return <Loading1 />
  }

  return (
     <ContextAPI.Provider value={{ setPost, postId, newComments, setNewComments, comments: post.comments }}>
        <PostWrapper singlePost={singlePost}>
          <PostAuthor>
            <Link to={ `${ url }/users/${ post.author.authorId }` }>
              <AvatarImage src={ post.author.authorAvatar } alt="avatar"/>
            </Link>
            <div>
              <AuthorName>{ post.author.authorName }</AuthorName>
              <h5>{ post.destinationInfo.destination }, { post.destinationInfo.country }</h5>
              <ReactStars 
                count={5}
                isHalf={true}
                value={4.5}
              />
            </div>
            { 
              post.author.authorId === user._id && 
              <ActionContainer>
                  <DeleteButton onClick={ (e) => setModal(post.post_id) }><AiFillEdit /></DeleteButton>
                  <DeleteButton><MdDelete /></DeleteButton>
              </ActionContainer>
            }
          </PostAuthor>
          { 
            !singlePost 
             &&
            <PostImages images={ post.images } />
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
          <CommentsAndLikes>
            { post.likes.length > 0 && 
              <TotalLikes to={ `${ url }/posts/1` } >
                { post.likes.length ===  1 ? '1 Like' : `${ post.likes.length } Likes` } 
              </TotalLikes>
            }
            { post.comments.length > 0 &&
              <TotalComments to={ `${ url }/posts/1` }> 
                { post.comments.length ===  1 ? '1 comment' : `${ post.comments.length } comments` }
              </TotalComments>
            }
          </CommentsAndLikes>
          <PostInteractions>
          <InteractionButton 
              onClick={ (e) => handlePostLike(e) } >
                { 
                  post.likes.find(like => like.user_id === user._id) ? 
                  <AiFillHeart /> 
                    :
                  <AiOutlineHeart /> 
                } 
            </InteractionButton> 
            <InteractionButton 
              onClick={ (e) => handleCommentIconClick(e) } >
              <FaComments/> 
            </InteractionButton> 
          </PostInteractions>

          { 
            post.comments.length > 0 && 
            <PostComments>
              <Line/>
              <Button onClick={ (e) => toggleHideShow(e) }>
                { showComment ? 'Hide' : 'Show' } { post.comments.length } { post.comments.length === 1 ? 'Comment' : 'Comments' }
              </Button>
            </PostComments>
          }

          { 
            newComments.length > 0
              &&
            <NewComments />
          }

          {
            showComment 
              &&
            <Comments />
          }
          
          { commentPosting && <Loading1 /> }
          
          <CommentPost singlePost={singlePost}>
              <AvatarImage src={ user.avatar.avatar_url } alt="avatar" />
              <textarea 
                ref={ commentInputRef } 
                value={ commentText } 
                placeholder="Got a question??, Ask John!"
                onChange={ (e) => setCommentText(e.target.value) }
                onKeyUp={ (e) => handleKeyUp(e) }
                />
              <button 
                disabled={ !commentText.trim() ? true : false } 
                onClick={ (e) => handlePostComment(e, post.post_id) }
                >
                  Post
              </button>        
          </CommentPost>
        </PostWrapper>
     </ContextAPI.Provider>
  )
}

