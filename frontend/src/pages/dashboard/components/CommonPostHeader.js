import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { InfoHeader} from './GlobalComponents/StyledComponents/Headings';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoClose} from "react-icons/io5";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { setShowModal } from '../../../redux/globals/globalActions';
import { PostForumLink } from './GlobalComponents/StyledComponents/Link';
import { LinkAuthor } from './GlobalComponent';
import { setHomePostMarkerId, setProfilePostMarkerId, setUserPostMarkerId } from '../../../redux/globals/globalActions';

export const PostAuthor = styled.div`
  margin-bottom: 0.75rem;
  letter-spacing: 1px; 
  div {
    display: flex;
    justify-content: space-between;
  }
`
export const Submenu = styled.aside`
  position: absolute;
  display: ${ props => props.showSubmenu ? 'block' : 'none' };
  top: 2.5rem;
  z-index: 2;
  right:5px;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 4px;
  button {
    padding: 12px 36px;
    margin-top: .5rem;
    font-size: 1.1rem;
    &:hover {
      color: #2a78cd;
    }
  }
  span {
    display: block;
    width: 95%;
    margin: auto;
    height: 1px;
    background-color: #ccc;
  }
`
export const ActionContainer = styled.div`
  position: relative;
  margin-left: 1rem;
`
export const DeleteButton = styled.button`
  font-size: 1.8rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${ props => props.showSubmenu ? '#f0f0f0' : 'transparent'};
  color: ${ props => props.showSubmenu ? '#747682' : '#021b41'};
  &:hover {
    color: ${ props => props.showSubmenu ? '#ee0000' : '#747682'};
    background-color: ${ props => props.showSubmenu ? 'transparent' : '#f0f0f0'};
  }
`
export default function CommonPostHeader({ post }) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { singlePost } = post;
  const { user } = useSelector(state => state.User);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = ( btnType) => {
    setShowSubmenu(false);
    if(btnType === 'edit') return dispatch(setShowModal({ modalType: 'post', action: 'edit post', post, singlePost, showPostForm: true }))
    if(btnType === 'delete') return dispatch(setShowModal({ modalType: 'post', action: 'delete post', post, singlePost }))
  }
  const handleLink = (postId) => {
    if( location.pathname.match(/\/dashboard\/home/)) {
      return dispatch(setHomePostMarkerId(postId))
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return dispatch(setProfilePostMarkerId(postId))
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      return dispatch(setUserPostMarkerId(postId))
    }
  }
  return (
    <PostAuthor>
        <div> 
          <PostForumLink to={`/dashboard/posts/${post._id}`} onClick={() => handleLink(post._id)}>
            <InfoHeader>
              { post.destinationInfo.destination }, { post.destinationInfo.country }
            </InfoHeader>
          </PostForumLink>
          { post.user._id === user.userId && 
             <ActionContainer>
                  <DeleteButton onClick={() => setShowSubmenu(!showSubmenu)} showSubmenu={showSubmenu}>
                    { showSubmenu ? <IoClose /> : <BiDotsHorizontalRounded /> }
                  </DeleteButton>
                  <Submenu showSubmenu={ showSubmenu }>
                    <button onClick={ () => handleClick('edit') }><AiFillEdit /> Edit </button>
                    <span></span>
                    <button onClick={ () => handleClick('delete') }><MdDelete /> Delete </button>
                  </Submenu>
                </ActionContainer>
               }
            </div>
            <LinkAuthor blog={ post }/>   
          </PostAuthor>
      )
}


