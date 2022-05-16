import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetGlobals, setShowPostHome, setShowPostProfile, setShowPostUser } from '../../../redux/globals/globalActions';
import { MdOutlineForum } from "react-icons/md";
import { MdGridView } from "react-icons/md";

const Wrapper = styled.div`
  width: 99%;
  margin: 0 auto 0.89rem auto;
`
const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 615px;
  padding: 12px 0px;
  font-size: 1rem;
  margin: 0 auto;
  overflow: hidden;
  grid-template-columns: ${ props => props.barType === 'home' ? '1fr' : '1fr 1fr' };
  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    padding: ${ props => props.barType === 'home' ? '0' : '12px 0px' };
  }
`
const Button = styled.button`
  display: flex;
  flex-direction: ${props => props.barType === 'home' ? 'row' : 'column'};
  align-items: ${props => props.barType === 'home' ? 'left' : 'center'};
  outline: none;
  cursor: pointer;
  width: 100%;
  font-size: 1.15rem;
  font-weight: 600;
  //color:${ props => props.btnStyle ? '#021b41' : '#2671d3'};
  color:${ props => props.btnStyle ? '#2671d3' : '021b41'};
  border-bottom: ${ props => props.barType === 'home' ? 'none' : props.btnStyle ? '2px solid #2671d3' : 'none'};
  padding: 0.75rem 0.5rem;
   span {
    display: inline-block;
    margin-left: ${props => props.barType === 'home' ? '0.85rem' : 0};
   }
  &:hover {
     color:${ props => props.btnStyle ? '#021b41' : '#2671d3'};
     background-color:#fff;
     border: none;
   }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    font-size: 1.15rem;
    border-bottom: ${ props => props.btnStyle ? '2px solid #2671d3' : ''};
    span {
      margin: auto;
    }
  }

`
const AvatarLink = styled(Link)`
  text-decoration: none;
  font-family: 'Montserrat Alternates', sans-serif;
  color: #021b41; 
  transition: 250ms all ease-in;
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 0.65rem;
    text-transform: capitalize;
    font-size: 1.4rem;
    font-weight: 600;
  }
  &:hover {
    color: #2a78cd;
  }
   @media only screen and (max-width: 800px) {
    display: none;
  }
`
const Img = styled.img`
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 50%;  
`
export default function PostBar() {
  const { homePageData, profilePageData, userPageData } = useSelector(state => state.Globals);
  const { User: { user: { avatarURL, name } }} = useSelector(state => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const [{ barType, showPost }] = useState(() => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      return { barType: 'home', showPost: homePageData.showPost }
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return  { barType: 'profile', showPost: profilePageData.showPost }
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      return { barType: 'profile', showPost: userPageData.showPost }
    } 
  })
  const handleClickPosts = () => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      return dispatch(setShowPostHome(true))
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return dispatch(setShowPostProfile(true))
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      dispatch(setShowPostUser(true))
    } 
  }
   const handleClickForums = () => {
    if(location.pathname.match(/\/dashboard\/home/)) {
      return dispatch(setShowPostHome(false))
    }
    if( location.pathname.match(/\/dashboard\/profile/)) {
      return dispatch(setShowPostProfile(false))
    }
    if( location.pathname.match(/\/dashboard\/user_profile/)) {
      dispatch(setShowPostUser(false))
    } 
  }

  if(barType === 'home') {
    return (
    <Wrapper >
      <AvatarLink to={`/dashboard/profile`} >
        <Img src={ avatarURL } alt="avatar"/>
        <span className="username">{ name }</span>    
      </AvatarLink>  
      <Container barType={barType}>
        <Button  barType={barType} btnStyle={showPost} onClick={handleClickPosts} >
          <MdGridView /> <span>Posts</span>
        </Button>
        <Button  barType={barType} btnStyle={!showPost} onClick={handleClickForums} >
          <MdOutlineForum /> <span>Forums</span>
        </Button>
      </Container>
    </Wrapper>
   )
  }
  return (
     <Wrapper >
      <Container barType={barType}>
        <Button barType={barType} btnStyle={showPost} onClick={handleClickPosts} >
          <MdGridView /> <span>Posts</span>
        </Button>
        <Button barType={barType} btnStyle={!showPost} onClick={handleClickForums} >
          <MdOutlineForum /> <span>Forums</span>
        </Button>
      </Container>
    </Wrapper>
  )
  
}
