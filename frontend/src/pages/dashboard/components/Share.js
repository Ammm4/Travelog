import React,{ useState, useEffect, useRef} from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../utils';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { setShowModal } from '../../../redux/globals/globalActions';
import { CommonButtonTheme } from './GlobalComponents/StyledComponents/Buttons';
// ===================== Icons ================================= //
import { IoAddCircle } from "react-icons/io5";
const ShareButton = styled.button`
  ${CommonButtonTheme}
  width: 98%;
  max-width: 615px;
  padding: 24px;
  margin: 0 auto 1.4rem auto;
  display:flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat Alternates', sans-serif; 
  background-color: #fff;
  cursor:pointer;
  font-size: 1.55rem;
  img {
    width: 38px;
    height:38px;
    border-radius: 50%;
    margin-right: 5px;
  }
  &:hover {
    color: #2a78cd;
  }
`

export default function Share() {
  const { User: { user } } = useReduxSelector();
  const {Globals: { homePageData: { showPost }, profilePageData: { showPost: profileShowPost} }} = useReduxSelector();
  const location = useLocation();
  const dispatch = useReduxDispatch();
  const[shareType] = useState(() => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      return showPost
    }
    if(location.pathname.match(/\/dashboard\/profile/)) {
      return profileShowPost
    }
  })
  
  const handleClick = () => {
    if(shareType) return dispatch(setShowModal({ modalType: 'post', action: 'create post', showPostForm: true }));
    return dispatch(setShowModal({ modalType: 'forum', action: 'create forum' }));
  }
  return (
     <ShareButton onClick={handleClick}>
       <img src={user.avatarURL} alt="avatar"/>
       <IoAddCircle style={{ fontSize:'2.2rem' }} /> { shareType ? 'Create Post' : 'Create Forum'} 
     </ShareButton> 
  )
}
/*
   <ShareContainer ref={btnRef}>
       <ShareTitle >
         <img src={user.avatarURL} alt="avatar"/>
         <button><IoAddCircle style={{ fontSize:'2.2rem' }} /> { shareType ? 'Create Post' : 'Create Forum'} </button>
       </ShareTitle>
     </ShareContainer> 
    <ShareContainer homepage={ homepage } ref={btnRef}>
      <ShareTitle>
        <img src={user.avatarURL} alt="avatar"/>
         <p>Create Post </p>
      </ShareTitle>
      <BtnGroup>
        <button title="Create a Post" onClick={() => dispatch(setShowModal({ modalType: 'post', action: 'create post' }))}>
          <IoAddCircle style={{ fontSize:'2.2rem', color: '#021b41' }} />
          <span>Post</span>
        </button>
        <Divider />
        <button title="Start a Forum" onClick={() => dispatch(setShowModal({ modalType: 'forum', action: 'create forum' }))}>
          <IoAddCircle style={{fontSize:'2.2rem', color: '#021b41'}}/>
          <span>Forum</span>
        </button>
      </BtnGroup>  
    </ShareContainer> 

    <ShareContainer homepage={ homepage } ref={btnRef}>
      <ShareTitle>
        <img src={user.avatarURL} alt="avatar"/>
         <p><IoAddCircle style={{ fontSize:'2.2rem', color: '#fff' }} /> Create Post</p>
      </ShareTitle>
    </ShareContainer>
    */