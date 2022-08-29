import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { addReply, setCommentData } from '../../../../redux/forums/forumActions';
import { AvatarImage } from '../GlobalComponents/StyledComponents/Images';
import { ReplyCommentContainer } from '../GlobalComponents/StyledComponents/Containers';
import ReplyInputArea from '../GlobalComponents/Components/ReplyInputArea';
import { CreateReplyBtn } from '../GlobalComponents/StyledComponents/Buttons';

export default function CreateReply({ id, body }) {
  const { User: { user: { avatarURL } } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const handleOnChange = (e) => {
    dispatch(setCommentData(id, 'replyBody', e.target.value))
  }
  const handlePost = () => {
    if(body.trim().length === 0) return
    dispatch(addReply(id, { body }))
  }
  return (
    <ReplyCommentContainer>
      <AvatarImage src={ avatarURL }/>
      <ReplyInputArea 
        handleChange={ handleOnChange }
        body={body}
      />
      <CreateReplyBtn onClick={ handlePost } disabled={body.trim().length === 0}>
        Post
      </CreateReplyBtn>
    </ReplyCommentContainer>
  )
}
