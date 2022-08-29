import React from 'react';
import { Link } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { AvatarImage } from '../GlobalComponents/StyledComponents/Images';
import { InteractionButton } from '../Posts/Post';
import { resetGlobals } from '../../../../redux/globals/globalActions';
import { GrEdit } from 'react-icons/gr';
import { ImBin } from 'react-icons/im';

export default function ForumCommentHeader(props) {
  const {
    blog,
    isEdit, 
    setIsEdit, 
    isDelete, 
    setIsDelete,
  } = props
  const { User: { user : { userId }} } = useReduxSelector();
  const { user: { _id, username, avatar: { avatar_url } } } = blog;
  const dispatch = useReduxDispatch();
  
  return (
    <>
      <Link to={`/dashboard/user_profile/users/${_id}`} onClick={() => dispatch(resetGlobals())}>
           <AvatarImage src={avatar_url}/>     
      </Link>
      <h4>{ username }</h4>
      { _id === userId &&
         <div className='btn-container' style={{ display: 'inline-block' }}>
           <InteractionButton 
             style={{ display: isEdit || isDelete ? 'none' : 'inline-block', marginRight: '5px'}}
             onClick={ () => setIsEdit(true) }>
              <GrEdit />
           </InteractionButton>
           <InteractionButton 
              style={{ display: isEdit || isDelete ? 'none' : 'inline-block', marginRight: '0px'}}
              onClick={ () => setIsDelete(true) }>
                <ImBin /> 
           </InteractionButton>  
         </div>
         }
    </>
  )
}
