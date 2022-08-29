import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../../utils';
import { setPostsCommentData, addPostsCommentReply, addPostReply, setPostCommentData } from '../../../../../redux/posts/postActions';
import { AvatarImage } from '../StyledComponents/Images';
import { ReplyCommentContainer } from '../StyledComponents/Containers';
import ReplyInputArea from '../Components/ReplyInputArea';
import { CreateReplyBtn } from '../StyledComponents/Buttons';

export default function CreateReply({ post, comment, body, singlePost }) {
  const { User: { user: { avatarURL } } } = useReduxSelector();
  const dispatch = useReduxDispatch();

  const handleOnChange = (e) => {
    if(singlePost) return dispatch(setPostCommentData(comment._id,'replyBody', e.target.value))
    dispatch(setPostsCommentData(post, comment._id, 'replyBody', e.target.value))
  }
  const handlePost = () => {
    if(body.trim().length === 0) return
    if(singlePost) return dispatch(addPostReply(post,comment._id,{ body }))
    dispatch(addPostsCommentReply(post,comment._id,{ body }))
  }
  return (
    <ReplyCommentContainer>
      <AvatarImage src={ avatarURL }/>
      <ReplyInputArea 
        handleChange={ handleOnChange }
        body={comment.addingReply ? '' : body}
      />
      <CreateReplyBtn 
        onClick={ handlePost }
        disabled={body.trim().length > 0 ? false : true}
         >
        Post
      </CreateReplyBtn>
    </ReplyCommentContainer>
  )
}
