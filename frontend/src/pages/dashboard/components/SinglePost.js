import React, { useState, useRef, useContext } from  'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

// Styled Components Import
import {
  AvatarImage,
  AuthorName,
  PostAuthor,
  PostTitle,
  CommentsAndLikes,
  TotalComments,
  TotalLikes,
  Button,
  PostInteractions,
  InteractionButton,
  CommentPost,
  PostComments,
  ActionContainer,
  DeleteButton,
  Line,
} from './Post';

import usePost from "./usePost";
import PostDetails, { usePostDetails } from './PostDetails';
import Comments from './Comments';
import Loading1 from './Loading1';

//Icons IoTrashBinSharp  MdDeleteForever AiOutlineEdit AiFillEdit
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";


const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin:0;
  padding:5rem 0 0 0;
  background-color: #fff;
  box-shadow:'none';
  cursor:pointer;
  overflow: auto;
  .post_top_part {
    flex: 0 0 auto;
  }
  @media only screen and (max-width: 600px) {
     padding:0 0 2.75rem 0;
     box-shadow: none;
  } 
  
`
const ContextAPI = React.createContext();

export const usePostAPI = () => {
  return useContext(ContextAPI)
}

function SinglePost({ post, setModal, singlePost}) {
  const { 
    showComment,
    setShowComment,
    handlePostLike,
    commentText,
    setCommentText,
    handlePostComment
  } = usePost(post.post_id);

  const { details } = usePostDetails(post);
  const { user } = useSelector(state => state.User);
  const { commentLoading } = useSelector(state => state.SinglePost);

  
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
  }
 
  return (
    <ContextAPI.Provider value={{ postId: post.post_id}}>
       <PostContainer>
          <div className="post_top_part">
          <PostAuthor>
            <Link to={ `${ url }/users/${ post.author.authorId }` }>
              <AvatarImage src={ post.author.authorAvatar } alt="avatar"/>
            </Link>
            <div>
              <AuthorName>{ post.author.authorName }</AuthorName>
              <h5>{ post.destinationInfo.destination }, { post.destinationInfo.country }</h5>
              <Rating
                  ratingValue={ post.destinationInfo.ratings }
                  iconsCount={5}
                  allowHalfIcon={true}
                  size={15}
                  readonly={true}
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
                      post.likes.find(like => like.user_id === user.userId) ? 
                      <AiFillHeart style={{color: '#021b41'}}/> 
                       :
                      <AiOutlineHeart /> 
                    } 
                  </InteractionButton> 
                  <InteractionButton 
                    onClick={ (e) => handleCommentIconClick(e) } >
                    <FaComments style={{color: '#021b41'}}/> 
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
          </div>
    
          { commentLoading && <Loading1 /> }

          {
            showComment 
            &&
            <Comments />
          }
          
          <CommentPost singlePost={singlePost}>
            <AvatarImage src={ user.avatarURL } alt="avatar" />
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
        </PostContainer>
    </ContextAPI.Provider>
  )
}

export default SinglePost
