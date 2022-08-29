import React, { useEffect } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import CreateReply from './CreateReply';
import { GridItemContainer } from '../GlobalComponents/StyledComponents/Containers';
import { getReplies } from '../../../../redux/forums/forumActions';
import ForumReply from './ForumReply';
import AddingReplySkeleton from '../Skeleton.js/AddingReplySkeleton';

export default function Replies({ comment }) {
  const { _id: commentId, replies, replyLoading, replyBody, addingReply } = comment;
  const { User: { user: { userId } } } = useReduxSelector()
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getReplies(userId, commentId, 1))
  },[dispatch, userId, commentId])
  return (
    <GridItemContainer>
      { replyLoading && <h4>Loading...</h4> }
      { addingReply && <AddingReplySkeleton post={false} body={replyBody}/> }
      { 
        replies.length > 0 && replies.map(reply => {
          return <ForumReply 
                  key={ reply._id }
                  reply={ reply } 
                />
        })
      }
      <CreateReply id={commentId} body={ addingReply ? '' : replyBody }/>
    </GridItemContainer>
  )
}
