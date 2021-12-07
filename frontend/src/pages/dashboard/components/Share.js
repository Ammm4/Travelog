import React from 'react';
import styled from 'styled-components';

//Icons 
import { ImImages } from "react-icons/im";
import { ImSpoonKnife } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { BsCashCoin } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";



const ShareContainer = styled.article`
  width: 98%;
  max-width: 600px;
  padding: 8px;
  border-radius: 8px;
  margin: 5.5rem auto 1.35rem auto;
  background-color: #f3f3f3;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  cursor:pointer;
`
const ShareTitle = styled.div`
  padding: 20px 8px;
  text-align: center;
  display:flex;
  align-items: center;
  border-bottom: 2px solid #fff;
  img {
    width: 35px;
    height:35px;
    border-radius: 50%;
    margin-right: 3px;
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
`
const IconHolders =  styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.1rem;
  display: flex;
  font-size: 1.75rem;
  * {
    flex: 1;
  }
`

export default function Share({ user, setModal }) {
  return (
    <ShareContainer onClick={() => setModal(true)}>
      <ShareTitle>
        <img src={user.avatar} alt="avatar"/>
        <input disabled placeholder="Got New Experiences to Share??"/> 
      </ShareTitle>
      <IconHolders>
        <ImImages />
        <ImSpoonKnife />
        <BsCashCoin />
        <ImLocation2 />
        <FaSkiing />
      </IconHolders>
    </ShareContainer>
  )
}
