import React, { useState, useRef } from  'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import Ratings from '../GlobalComponents/Components/Ratings';
import { setPostData  } from '../../../../redux/posts/postActions';
import { setShowModal } from '../../../../redux/globals/globalActions';
// ================= Imported Styled Components ==================== //
import { PostContainer, PostTitle,StyledParagraph } from '../GlobalComponents/StyledComponents/Containers';
import { Button } from '../GlobalComponents/StyledComponents/Buttons';
import { CommentsLikesContainer } from '../GlobalComponents/Components/CommentsAndLikes';
// ====================== Imported Components ===================== //
import usePost from '../hooks/usePost';
import PostDetails from '../GlobalComponents/Components/PostDetails';
import AddComment from '../GlobalComponents/Components/AddComments';

import Interactions from './Interactions';
import CommonPostHeader from '../GlobalComponents/Components/CommonPostHeader';
import SinglePostComments from './SinglePostComments';

function SinglePost() {
  const { handlePostLike } = usePost();
  const { Post: { post } } = useReduxSelector();
  const { showComments, destinationInfo, isLiked, numLikes, numComments } = post; 
  const [showMore, setShowMore] = useState(false);
  
  const dispatch = useReduxDispatch();
  const commentInputRef = useRef();
  let summary = showMore ? destinationInfo.summary : destinationInfo.summary.slice(0, 100);
  
  const handleCommentIconClick = (e) => {
    e.preventDefault();
    dispatch(setPostData('showComments', true))
    commentInputRef.current.focus();
  }

  return (
       <PostContainer>
        <div className="post_top_part">
          <CommonPostHeader post={ post }/>
          <PostTitle>
              <h4>Summary</h4> 
              <Ratings ratings={ destinationInfo.ratings }/>
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
              <Button style={{ marginRight: '0.45rem' }} onClick={() => dispatch(setShowModal({ modalType: 'likes', type: 'post', id: post._id }))}>
                { numLikes } { post.numLikes ===  1 ? 'like' :  'likes' }   
              </Button>
            }
            { 
              <Button onClick={ (e) => dispatch(setPostData('showComments', !showComments)) }> 
                    { numComments } { numComments ===  1 ? 'comment' :  'comments' }
              </Button>
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

export default SinglePost;
