import React, { useState, useRef, useContext } from  'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';

// Styled Components Import
import {
  AvatarImage,
  PostTitle,
  CommentsAndLikes,
  PostInteractions,
  InteractionButton,
  CommentPost,
  Button
} from './Post';

import usePost from "./usePost";
import PostDetails from './PostDetails';
import CommonPostHeader from './CommonPostHeader';
import Comments from './Comments';
import Likes from './Likes';
import Loading1 from './Loading1';

//Icons 
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import {FaRegComment} from "react-icons/fa";



export const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin:0;
  padding: 5.2rem 12px 12px 12px;
  background-color: #fff;
  box-shadow:'none';
  cursor:pointer;
  overflow: auto;
  .post_top_part {
    flex: 0 0 auto;
  }
  @media only screen and (max-width: 600px) {
     padding:12px 12px 2.75rem 12px;
     box-shadow: none;
  } 
  
`

const ContextAPI = React.createContext();

export const usePostAPI = () => {
  return useContext(ContextAPI)
}

function SinglePost({ singlePost }) {
  const { 
    showComment,
    setShowComment,
    showLikes,
    setShowLikes,
    handlePostLike,
    commentText,
    setCommentText,
    handlePostComment
  } = usePost();

  const { user } = useSelector(state => state.User);
  const { commentLoading, singlepost: post } = useSelector(state => state.SinglePost);
  const [showMore, setShowMore] = useState(false);
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null }); 
  const commentInputRef = useRef();
  let summary = showMore ? post.destinationInfo.summary : post.destinationInfo.summary.slice(0, 100);
  
  const handleCommentIconClick = (e) => {
    e.preventDefault();
    commentInputRef.current.focus();
    setReplyInfo({...replyInfo, replyTo: null, commentId: null })
  }

  const handleKeyUp = (e) => {
    e.target.style.height = '35px';
    e.target.style.height = `${ e.target.scrollHeight }px`;
  }
  
  const toggleHideShow = (e,btnType) => {
    e.preventDefault();
    if(btnType === 'like') {
      setShowComment(false);
      setShowLikes(!showLikes)
      return
    }
    if(btnType === 'comment') {
      setShowLikes(false);
      setShowComment(!showComment); 
      return
    }
    
  }
 
  return (
    <ContextAPI.Provider value={{ postId: post.post_id}}>
       <PostContainer>
          <div className="post_top_part">
          <CommonPostHeader post={ post 
          } />
            <PostTitle>
              <h4>Summary</h4>
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
              <p>
                 { summary }
                 {post.destinationInfo.summary.length > 100 && <Button onClick= { () => setShowMore(!showMore)}> { showMore ? 'less...' :'more...'}</Button>}
              </p>   
            </PostTitle>
            <PostTitle>
              <h4>Recommendations</h4>    
            </PostTitle>    
            { <PostDetails data={ post }/> }
           <PostInteractions>
               <InteractionButton 
                 onClick={ (e) => handlePostLike(e) } >
                  { 
                    post.likes.find(like => like.user_id === user.userId) ? 
                     <FaHeart /> 
                       :
                      <FaRegHeart />
                  } 
               </InteractionButton> 
               <InteractionButton 
                    onClick={ (e) => handleCommentIconClick(e) } >
                    <FaRegComment /> 
               </InteractionButton> 
           </PostInteractions>
            <CommentsAndLikes>
                  { post.likes.length > 0 && 
                    <button onClick={ (e) => toggleHideShow( e, 'like') }>
                      { post.likes.length } { post.likes.length ===  1 ? 'like' :  'likes' }   
                    </button>
                  }
                  { post.comments.length > 0 &&
                    <button onClick={ (e) => toggleHideShow(e, 'comment') }> 
                    { post.comments.length } { post.comments.length ===  1 ? 'comment' :  'comments' }
                    </button>
                  }
            </CommentsAndLikes>  
          </div>
    
          { commentLoading && <Loading1 /> }

          {
            showComment 
            &&
            <Comments />
          }
          {
            showLikes 
            &&
            <Likes />
          }
          <CommentPost singlePost={singlePost}>
            <AvatarImage src={ user.avatarURL } alt="avatar" />
            <textarea 
              ref={ commentInputRef } 
              value={ commentText } 
              placeholder="Add a comment"
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
