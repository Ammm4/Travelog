import React from 'react';
import { Link } from 'react-router-dom';
import { useReduxDispatch } from '../../../utils';
import { CommentBody, CommentText, CommentLike, AuthorName, StyledParagraph } from './GlobalComponents/StyledComponents/Containers';
import { AvatarImage, Button, EditBox  } from './GlobalComponents/Components/Comment';
import { resetGlobals } from '../../../redux/globals/globalActions';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';

const flexStyle = {
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center'

}
export default function ReplyHeader(props) {
  const { isEdit, 
    newText, 
    setNewText,
    handleKeyUp,
    handleLike,
    reply,
    handleReply 
  } = props
  const { editingReply, body, isLiked, user: {_id, username, avatar: { avatar_url }} } = reply;
  const dispatch = useReduxDispatch()
  return ( <>
            <Link to={ `/dashboard/user_profile/users/${ _id }` } onClick={() => dispatch(resetGlobals())}>
              <AvatarImage src={ avatar_url } alt="avatar"/>
            </Link>
           <CommentBody>
              <CommentText isEdit={ isEdit }>
                 <AuthorName> { username } </AuthorName> 
                 <StyledParagraph style={{ whiteSpace: 'pre-wrap'}}> { !editingReply ? body : newText } </StyledParagraph>            
              </CommentText>
              { 
               <EditBox 
                isEdit={ isEdit } 
                value={ newText }
                onChange={ (e) => setNewText(e.target.value) }
                onKeyUp={ (e) => handleKeyUp(e) }
               />
              }
              <CommentLike style={flexStyle}>
                <Button onClick= { (e) => handleLike(e)} >
                  { isLiked ? <AiFillHeart /> : <AiOutlineHeart /> } 
                </Button>
                <Button onClick={ handleReply }>
                  <FaReply />
                </Button>
              </CommentLike>
         </CommentBody>
    </>
  )
}
