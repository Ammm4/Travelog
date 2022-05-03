import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal } from '../../../redux/globals/globalActions';
import { PostAuthor,
  ActionContainer, 
  DeleteButton, 
  Submenu 
 } from './CommonPostHeader';
import { InfoHeader } from './GlobalComponents/StyledComponents/Headings'
import { LinkAuthor, NoLinkAuthor } from './GlobalComponent';
// ====================== Icons ============================== //
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoClose} from "react-icons/io5";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function CommonForumHeader({ forum, singleForum }) {
  const { user } = useSelector(state => state.User);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const dispatch = useDispatch();
  return (
    <PostAuthor>
      <div>
        <InfoHeader>
          { forum.body }
        </InfoHeader>
         { forum.user._id === user.userId && 
                <ActionContainer>
                  <DeleteButton onClick={() => setShowSubmenu(!showSubmenu)} showSubmenu={showSubmenu}>
                    { showSubmenu ? <IoClose /> : <BiDotsHorizontalRounded /> }
                  </DeleteButton>
                  <Submenu showSubmenu={ showSubmenu }>
                    <button onClick={ (e) => dispatch(setShowModal({ modalType: 'forum', action: 'edit forum' })) }><AiFillEdit /> Edit </button>
                    <span></span>
                    <button onClick={ (e) => dispatch(setShowModal({ modalType: 'forum', action: 'delete forum' }))}><MdDelete /> Delete </button>
                  </Submenu>
                </ActionContainer>
               }
      </div>
      { singleForum ? <LinkAuthor blog={ forum }/> : <NoLinkAuthor blog={ forum }/> }
    </PostAuthor>
  )
}
