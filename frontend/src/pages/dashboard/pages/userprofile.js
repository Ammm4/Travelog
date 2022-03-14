import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, {css} from 'styled-components';
import Post from '../components/Post';
import { PostsWrapper } from './home';

//Icons SiAboutdotme
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";

import Zeropost from '../components/zeropost';
import Loading from '../components/Loading';
import { getSingleUser } from '../../../redux/users/userActions';

const sharedImgCss = css`
  display: inline-block;
  width: 100%;
  height:100%;
  object-fit:cover;
`
export const sharedDivCss = css`
  width: 98%;
  max-width: 600px;
  border-radius: 8px;
  margin: 1rem auto 1.5rem auto;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`
const sharedBtnCss = css `
  display: inline-block;
  outline: none;
  border: 2px solid #ccc;
  cursor: pointer;
  font-size: 1.4rem;
  padding: 8px 16px;
  width: 49%;
`
const sharedEditBtnCss = css`
    display: inline-block;
    position: absolute;
    display: flex;
    text-align: center;
    outline: none;
    padding: 6px;
    border: none;
    font-size: 1.2rem;
    letter-spacing: 1px;
    background-color: #7f7f7f;
    border-radius: 5px;
    color: #fff;
`
const ProfileContainer = styled.main`
  padding-top: 80px;
`
export const UserProfile = styled.div`
  ${sharedDivCss}
  width: 100%;
  background-color: transparent;
  cursor:pointer;
  margin: 0 auto;
  
`
export const UserImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`
export const UserCover = styled.div`
  position: relative;
  width: 100%;
  height: 55%;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  img {
    display: inline-block;
    ${sharedImgCss}
  }
  button {
    ${sharedEditBtnCss}
    top:0.35rem;
    left:0.35rem;
  }
`
export const UserAvatar = styled.div`
   position: absolute;
   top: 55%; left:50%;
   width: 120px;
   height: 120px;
   transform: translate(-50%,-50%);
   border-radius: 50%;
   background-color: #eee;
   border: 6px solid #fff;
   overflow: hidden;
   img {
    ${sharedImgCss}
    
   }
   button {
     ${sharedEditBtnCss}
     bottom:5%; left:50%;
     transform: translateX(-50%);
     
   }
`
export const UserTitle = styled.h2`
  position: absolute;
  left:50%; bottom: 10%;
  transform: translateX(-50%);
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 40px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.8px;
  color: #021b41;
`
export const UserInfo = styled.div`
  padding: 20px 14px;
  h3 {
    margin-bottom: 1rem;
  }
  div {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 1rem;
    span {
     text-align: center;
     font-size: 1.5rem;
    }
  }
  p {
    line-height: 20px;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
`
const Btngroup = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  button {
    ${sharedBtnCss}
  }
`
const EditLink = styled(Link)`
   ${sharedBtnCss}
   text-decoration: none;
   text-align: center;
`
export const PostHeading = styled.div`
  ${sharedDivCss}
  padding: 8px;
  text-align: center;
  * {
    font-size: 1.5rem;
  }
  button {
    ${sharedBtnCss}
    border: none;
    background-color: transparent;
    font-size: 1.35rem;
  }
`

export default function Userprofile({ setModal }) {
  const history = useHistory();
  const {loading, singleUser: user, error} = useSelector(state => state.SingleUser)
  const { user_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleUser(user_id))
  },[dispatch, user_id])

  useEffect(() => {
    if(error) {
      history.goBack()
    }
  },[error, history])

  if(loading || Object.keys(user).length < 1) {
    return <Loading msg="Profile Loading"/>
  }
  return (
    <ProfileContainer>
     <UserProfile>
       <UserImageContainer>   
        <UserCover>
          <img src={user.cover.cover_url} alt="cover"/>
        </UserCover>
        <UserAvatar>
          <img src={user.avatar.avatar_url} alt="cover"/>
        </UserAvatar>
        <UserTitle>{ user.username }</UserTitle>
       </UserImageContainer>
       <UserInfo>
         <h3>Info</h3> 
         <div>
           <span><FcAbout /></span>
           <p><b>About:</b> { user.about }</p>
         </div>
         <div>
          <span><FcAbout /></span>
          <p><b>Hobbies:</b> { user.hobbies }</p>
         </div>
         <div>
          <span><FcAbout /></span>
          <p><b>Location:</b> { user.city }, { user.country }</p>
         </div>   
       </UserInfo>
     </UserProfile>
     <PostHeading>
       <BsFillGrid3X3GapFill />
     </PostHeading>
     { user.posts.length > 0 ? 
        <PostsWrapper>
          { user.posts.map(post => <Post key={ post.post_id } post={ post } setModal={ setModal } singlePost={false} />) }
        </PostsWrapper>
        : <Zeropost />
     }
    
    </ProfileContainer>
  )
}


