import React, {useState} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InfoHeader } from '../pages/profile';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoClose} from "react-icons/io5";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { setShowModal } from '../../../redux/globals/globalActions';

export const PostAuthor = styled.div`
  margin-bottom: 0.75rem;
  letter-spacing: 1px; 
  div {
    display: flex;
    justify-content: space-between;
  }
`
export const AuthLink = styled(Link)`
 text-decoration: none;
 display: flex;
 align-items: center;
 color: #021b41;
`
export const AvatarImage = styled.img`
  display: inline-block;
  width: 35px;
  height: 35px;
 
  margin: 0 0.3rem 0 0.35rem;
`
export const AuthorName = styled.span`
 font-weight: 600;
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
  const { user } = useSelector(state => state.User);
  let { url } = useRouteMatch();
  const dispatch = useDispatch();
  const handleEdit = () => {
    setShowSubmenu(false);
    return dispatch(setShowModal({ modalType: 'post', action: 'edit post' }))
  }
  const handleDelete = () => {
    setShowSubmenu(false);
    return dispatch(setShowModal({ modalType: 'post', action: 'delete post' }))
  }
  return (
    <PostAuthor>
        <div>
              <InfoHeader>
                { post.destinationInfo.destination }, { post.destinationInfo.country }
              </InfoHeader>
               { post.user._id === user.userId && 
                <ActionContainer>
                  <DeleteButton onClick={() => setShowSubmenu(!showSubmenu)} showSubmenu={showSubmenu}>
                    { showSubmenu ? <IoClose /> : <BiDotsHorizontalRounded /> }
                  </DeleteButton>
                  <Submenu showSubmenu={ showSubmenu }>
                    <button onClick={ handleEdit }><AiFillEdit /> Edit </button>
                    <span></span>
                    <button onClick={ handleDelete }><MdDelete /> Delete </button>
                  </Submenu>
                </ActionContainer>
               }
            </div>
            <AuthLink to={ `${ url }/users/${ post.user._id }` }>
              <span>By </span><AvatarImage src={ post.user.avatar.avatar_url } alt="avatar"/>
              <AuthorName>{ post.user.username }</AuthorName>
            </AuthLink>     
          </PostAuthor>
  )
}
