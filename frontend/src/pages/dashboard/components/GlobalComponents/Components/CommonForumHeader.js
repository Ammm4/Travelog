import React, { useState } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../../utils';
import { setShowModal } from '../../../../../redux/globals/globalActions';
import { 
  ActionContainer, 
  DeleteButton, 
  Submenu 
 } from './CommonPostHeader';
import { PostAuthor } from '../StyledComponents/Containers';
import { InfoHeader } from '../StyledComponents/Headings';
import LinkAuthor from './LinkAuthor';
import { PostForumLink } from '../StyledComponents/Link';
// ====================== Icons ============================== //
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoClose} from "react-icons/io5";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import useForum from '../../hooks/useForum';

export default function CommonForumHeader({ forum, singleForum }) {
  const { User: { user } } = useReduxSelector();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { handleClick } = useForum();
  const dispatch = useReduxDispatch();
  const handleBtnClick = ( btnType ) => {
    setShowSubmenu(false);
    if(btnType === 'edit') return dispatch(setShowModal({ modalType: 'forum', action: 'edit forum', forum, singleForum, showForumForm: true }))
    if(btnType === 'delete') return dispatch(setShowModal({ modalType: 'forum', action: 'delete forum', forum, singleForum }))
  }
 
  return ( 
    <PostAuthor>
      <div>
        <PostForumLink to={`/dashboard/forums/${forum._id}`} onClick={() => handleClick(forum._id)}>
          <InfoHeader>
            { forum.title }
          </InfoHeader>
        </PostForumLink>
         { forum.user._id === user.userId && 
                <ActionContainer>
                  <DeleteButton onClick={() => setShowSubmenu(!showSubmenu)} showSubmenu={showSubmenu}>
                    { showSubmenu ? <IoClose /> : <BiDotsHorizontalRounded /> }
                  </DeleteButton>
                  <Submenu showSubmenu={ showSubmenu }>
                    <button onClick={ (e) => handleBtnClick('edit') }><AiFillEdit /> Edit </button>
                    <span></span>
                    <button onClick={ (e) => handleBtnClick('delete')}><MdDelete /> Delete </button>
                  </Submenu>
                </ActionContainer>
          }
      </div>
      { <LinkAuthor blog={ forum }/> }
    </PostAuthor> 
  )
}
