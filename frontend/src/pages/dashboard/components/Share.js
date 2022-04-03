import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { setShowModal } from '../../../redux/globals/globalActions';
//Icons 
import { IoAddCircle } from "react-icons/io5";


const ShareContainer = styled.article`
  width: 98%;
  max-width: 600px;
  padding: 8px;
  border-radius: 3px;
  margin: ${props => props.homepage ? '7.5rem auto 3rem auto': '3rem auto 3rem auto'};
  background-color: #fff;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
  cursor:pointer;
`
const ShareTitle = styled.div`
  padding: 20px 8px;
  text-align: center;
  display:flex;
  align-items: center;
  border-bottom: 2px solid #f0f0f0;
  img {
    width: 38px;
    height:38px;
    margin-right: 5px;
  }
  input {
    flex: 1;
    outline: none;
    height: 35px;
    border: 2px solid #ccc;
    font-size: 0.95rem;
    padding: 7px 13px;
    border-radius: 18px;
    letter-spacing: 1px;
  }
  p {
    flex: 1;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 27px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.8px;
    color: #021b41;
  }
`

const BtnGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 2px 1fr;
  button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color:#fff;
  cursor: pointer;
  width: 98%;
  margin:0.25rem auto;
  text-align: center;
  font-size: 19px;
  color:#021b41;
  padding: 16px 40px;
  &:hover * {
    color: #2a78cd;
   }
  }
`
const Divider = styled.div`
  height: 80%;
  margin: auto 0;
  border-left: 2px solid #f0f0f0;
`
export default function Share({ homepage }) {
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();
  return (
    <ShareContainer homepage={ homepage } >
      <ShareTitle>
        <img src={user.avatarURL} alt="avatar"/>
         <p>Create Post, Start a Forum ...</p>
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
  )
}
//<input disabled placeholder="Got Something to Share??"/>
/* 
   <IconHolders>
        <ImImages />
        <ImSpoonKnife />
        <BsCashCoin />
        <ImLocation2 />
        <FaSkiing />
      </IconHolders>
*/