import React, { useRef, useEffect} from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import Comment from '../GlobalComponents/Components/Comment';
import { getComments } from '../../../../redux/posts/postActions';
import { PostComments } from '../GlobalComponents/StyledComponents/Containers';
import AddingCommentSkeleton from '../Skeleton.js/AddingCommentSkeleton';
import CommentSkeleton from '../Skeleton.js/CommentSkeleton';
import AddComment from '../GlobalComponents/Components/AddComments';
import ViewMoreBtn from '../GlobalComponents/Components/ViewMoreBtn';

export default function Comments({ post }) {
  const { User: { user: { userId } } } = useReduxSelector();
  const { _id: id, comments, numComments, commentsLoading, addingComment, commentBody } = post
  const dispatch = useReduxDispatch();
  const commentInputRef = useRef();
  const newCommentRef = useRef();
  useEffect(() => {
    if(comments.length > 0 || numComments === 0) return; 
    dispatch(getComments(id, userId, 1))
  }, [dispatch, id, userId, comments, numComments])

  const handleClick = () => {
    const pageNumber = Math.floor((comments.length/3) + 1);
    dispatch(getComments(id, userId, pageNumber))
  }
  
  return (
    <PostComments>
       <AddComment
         post={post}
         commentInputRef={commentInputRef} 
       />
       { addingComment && <AddingCommentSkeleton post={true} newCommentRef={newCommentRef} commentBody={commentBody}/>}
       { 
          comments.map(comment => {
            comment.singlePost = false;
            return (
                <Comment
                  key={ comment._id }       
                  comment={ comment }                           
                />
              )
          })
        }
       { commentsLoading && [1,2,3].map(n => <CommentSkeleton key={n}/>) }
       { !commentsLoading && <ViewMoreBtn numComments={numComments} comments={comments.length} handleClick={handleClick}/>}
    </PostComments>
  )
}
