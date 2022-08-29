import React, { useEffect, useRef} from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { PostComments } from '../GlobalComponents/StyledComponents/Containers';
import { getTheComments } from '../../../../redux/posts/postActions';
import Comment from '../GlobalComponents/Components/Comment';
import CommentSkeleton from '../Skeleton.js/CommentSkeleton';
import AddingCommentSkeleton from '../Skeleton.js/AddingCommentSkeleton';
import ViewMoreBtn from '../GlobalComponents/Components/ViewMoreBtn';

export default function SinglePostComments() {
  const { 
    User: { user: { userId } }, 
    Post: { commentLoading, addingComment, post: { _id, commentBody, numComments, comments, singlePost  }} 
  } = useReduxSelector();
  const newCommentRef = useRef();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getTheComments(_id, userId, 1))
  },[dispatch,_id, userId]);
  const handleClick = () => {
    const pageNumber = Math.floor((comments.length/3) + 1);
    dispatch(getTheComments(_id, userId, pageNumber))
  }
  return (
    <PostComments style={{ minHeight:'250px' }}>
       { addingComment && <AddingCommentSkeleton post={true} commentBody={commentBody} newCommentRef={newCommentRef}/>}
       { comments.map(comment => {
          comment.singlePost = singlePost;
          return <Comment key={comment._id} comment={comment} />
        })}
        { commentLoading && [1,2,3].map(n => <CommentSkeleton key={n} />)   }
        {!commentLoading && <ViewMoreBtn numComments={numComments} comments={comments.length} handleClick={handleClick}/>}
    </PostComments>
  )
}
