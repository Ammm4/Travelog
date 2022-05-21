import React, { useState, useRef } from  'react';
import { useDispatch, useSelector } from "react-redux";
import Ratings from './Ratings';
import { setShowTheComments } from '../../../redux/posts/postActions';
import { StyledParagraph } from './GlobalComponents/StyledComponents/Containers';

// ================= Imported Styled Components ==================== //
import { PostContainer } from './GlobalComponents/StyledComponents/Containers';
import {
  PostTitle,
  Button
} from './Post';
import { CommentsLikesContainer } from './CommentsAndLikes';
// ====================== Imported Components ===================== //
import usePost from "./usePost";
import PostDetails from './PostDetails';
import AddComment from './AddComment';
import Interactions from './Interactions';
import CommonPostHeader from './CommonPostHeader';
import SinglePostComments from './SinglePostComments';
import Likes from './Likes';
import Loading1 from './Loading1';


function SinglePost() {
  const { 
    showLikes,
    handlePostLike,
  } = usePost();

  const { Post: { post }} = useSelector(state => state);
  const { showComments, destinationInfo, isLiked, numLikes, numComments } = post; 
  const [showMore, setShowMore] = useState(false);
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null }); 
  const dispatch = useDispatch();
  const commentInputRef = useRef();
  let summary = showMore ? destinationInfo.summary : destinationInfo.summary.slice(0, 100);
  
  const handleCommentIconClick = (e) => {
    e.preventDefault();
    commentInputRef.current.focus();
    setReplyInfo({...replyInfo, replyTo: null, commentId: null })
  }

  return (
       <PostContainer>
          <div className="post_top_part">
          <CommonPostHeader post={ post }/>
          <PostTitle>
              <h4>Summary</h4> 
              <Ratings ratings={ destinationInfo.ratings}/>
              <StyledParagraph style={{ whiteSpace: 'pre-wrap'}}>
                 { summary }
                 { destinationInfo.summary.length > 100 && <Button onClick= { () => setShowMore(!showMore)}> { showMore ? 'less...' :'more...'}</Button>}
              </StyledParagraph>   
          </PostTitle>
          <PostDetails data={ post }/> 
          <Interactions 
             isLiked={ isLiked}
             handleLike={handlePostLike}
             handleCommentBtn={handleCommentIconClick}
          />
          <CommentsLikesContainer>
            { 
              <button>
                { numLikes } { post.numLikes ===  1 ? 'like' :  'likes' }   
              </button>
            }
            { 
              <button onClick={ (e) => dispatch(setShowTheComments(!showComments)) }> 
                    { numComments } { numComments ===  1 ? 'comment' :  'comments' }
              </button>
            }
            </CommentsLikesContainer>  
          </div>
        { showComments && <SinglePostComments /> }
        <AddComment
            post={post}
            commentInputRef={commentInputRef} 
         />
        </PostContainer>
  )
}

export default SinglePost
