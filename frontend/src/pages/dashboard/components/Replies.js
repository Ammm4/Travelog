import React, { useEffect } from 'react';
import Reply from './Reply';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import CreateReply from './GlobalComponents/Components/CreateReply';
import { GridItemContainer } from './GlobalComponents/StyledComponents/Containers';
import { getPostCommentReplies, getPostsCommentsReplies } from '../../../redux/posts/postActions';
import AddingReplySkeleton from './Skeleton.js/AddingReplySkeleton';

export default function Replies({ comment }) {
  const { _id, replies, numReplies, singlePost, post, replyBody, replyLoading, addingReply } = comment;
  const { User: { user: { userId } }} = useReduxSelector();
  const dispatch = useReduxDispatch()
  useEffect(() => {
    if(replies.length > 0 || numReplies === 0) return
    if(singlePost) return dispatch(getPostCommentReplies(_id,userId,1))
    dispatch(getPostsCommentsReplies(post, _id, userId, 1 ))
  },[post, _id, replies, numReplies, singlePost, userId, dispatch])
  return (
    <GridItemContainer>
      { replyLoading && <h4>Loading...</h4>}
      { addingReply && <AddingReplySkeleton post={true} body={replyBody}/> }
      { 
        replies.map(reply => {
          return <Reply 
                  key={ reply.reply_id }
                  reply={ reply }
                  post={post}
                  singlePost={singlePost}
                />
        })
      }
      <CreateReply comment={comment} post={post} singlePost={singlePost} body={replyBody}/>
    </GridItemContainer>
  )
}
