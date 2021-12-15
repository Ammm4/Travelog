import React, { useState, useRef } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled,{ css } from 'styled-components';

import PostImages from './PostImages';
import PostDetails from './PostDetails';

//Icons IoTrashBinSharp 
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";



const sharedBtnCss = css`
  outline: none;
  border: none;
  background: transparent;
`
const AvatarImage = styled.img`
  src: ${props => props.src};
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 0.25rem;
`
const AuthorName = styled.span`
 display: flex;
 align-items: center;
 font-weight: 600;
`
const PostWrapper = styled.article`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  cursor:pointer;
`
const PostAuthor = styled.div`
  display: grid;
  grid-template-columns: 45px 1fr 40px;
  margin-bottom: 0.75rem;
  padding: 8px;
  letter-spacing: 1px;
  border-bottom: 2px solid #f1f1f1;
  span {
    font-weight: 700;
  }
`

const PostTitle = styled.div`
 margin-bottom: 0.75rem;
 padding: 8px;
 letter-spacing: 1px;
 h3, p {
   margin-bottom: 0.5rem;
 }
 p {
   font-size: 0.8rem;
 }
`
const CommentLike = styled.div`
  font-size: 0.9rem;
  button {
    padding: 1rem 1rem 0 0 ;
  }
`
const Comments = styled(Link)`
  //flex: 1 1 50%;
  //text-align: right;
  text-decoration: none;
  `
const Likes = styled(Link)`
  //flex: 1 1 50%; 
  display: inline-block;
  margin-right: 1rem;
  text-decoration: none; 
`
const Button = styled.button`
  ${sharedBtnCss}
  color: #111111;
  letter-spacing: 1px;
  cursor:pointer;
  &:hover{
    color:#ccc
  }
`

const PostInteractions = styled.div`
border-top: 1px solid #f1f1f1;
border-bottom: 1px solid #f1f1f1;
padding: 10px;
cursor: pointer;

`
const InteractionButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-size: 1rem;
  display: inline-block;
  margin-right: 5px;
`
const Count = styled.div`
   grid-column-start: 2;
   grid-column-end: 3; 
   div {
     display: inline-block;
     padding: 4px 6px;
     border-radius: 8px;
   }
`

const PostComment = styled(PostAuthor)`
  position: relative;
  border-bottom: none;
  margin-bottom: 0;
  padding: 8px;
  input {
    flex: 1;
    height: 35px;
    border: 1px solid #888;
    font-size: 0.9rem;
    padding: 6px 50px 6px 12px;
    border-radius: 25px;
    letter-spacing: 1px;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 5px rgba(0,0,0,0.5)
    }
   }
   button {
     ${sharedBtnCss}
     display: inline-block;
     position: absolute;
     font-weight: 600;
     right: 1.375rem;
     cursor: pointer;
  }
`
const PostDiscussion = styled.div`
 padding: 8px;
`
const Discussion = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-row-gap:0.1rem;
 grid-template-columns: 45px 1fr 45px;
 background-color: #f1f1f1;
 font-size: 0.9rem;
 padding: 6px 0 6px 6px;
 border-radius: 10px;
 line-height: 20px;
`
const ReplyContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`
const ActionContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`
const EditLink = styled(Link)`
  display: inline-block;
  margin-right: 0.4rem;
  text-decoration: none;
`
const DeleteButton = styled(Button)`
  font-size: 1rem;
`
export default function Post({ post, setModal }) {
  const [showInfo, setShowInfo] = useState(false);
  const [comment, setComment] = useState('');
  const commentInputRef = useRef();
  const { user } = useSelector(state => state.User);
  let showEditPostButton = post.authorId === user._id ? true : false;
  let { url } = useRouteMatch();
  const postDetails = {
    numPeople: post.numPeople,
    numDays: post.numDays,
    description: post.description,
    cost: post.cost,
    budget: post.budget,
    heritages: post.heritages,
    places: post.places,
    todos: post.todos,
    others: post.others,
  }
 
  return (
    <PostWrapper>
      <PostAuthor>
        <Link to={`${url}/users/${post.authorId}`}>
          <AvatarImage src={post.authorAvatar} alt="avatar"/>
        </Link>
        <div>
          <AuthorName>{post.authorName}</AuthorName>
          <h5>{post.destination}, {post.country}</h5>
        </div>
        { 
          showEditPostButton && 
           <ActionContainer>
              <DeleteButton onClick={(e) => setModal(post.id)}><GrEdit /></DeleteButton>
              <DeleteButton><IoTrashBinOutline /></DeleteButton>
           </ActionContainer>
        }
        
      </PostAuthor>
      <PostImages images={ post.images } postId={post.id}/>
      <PostTitle>    
        <p><b>###</b> {post.description}</p>
        <Button onClick={() => setShowInfo(!showInfo)}> <BsFillInfoCircleFill/> {showInfo ? 'Less Info... ': 'More Info...'}</Button>
      </PostTitle>  
      { showInfo && <PostDetails data={postDetails}/> }
      <CommentLike>
        <Likes to={`${url}/posts/1`}> 0 Likes</Likes>
        <Comments to={`${url}/posts/1`}> 1 Q&A</Comments>
      </CommentLike>
      <PostInteractions>
        <InteractionButton ><AiOutlineHeart /> </InteractionButton> 
        <InteractionButton onClick={(e) => commentInputRef.current.focus()}><BsQuestionCircle /> Ask John</InteractionButton> 
      </PostInteractions>
      <PostDiscussion>
        { post.comments.map(comment => {
          return (
        <Discussion key={comment.comment_id}>
          <Link to={`${url}/users/${comment.user_id}`}>
            <AvatarImage src={comment.userAvatar} alt="avatar"/>
          </Link>
          <p><AuthorName>{comment.username}</AuthorName> {comment.question}</p> 
          <CommentLike>
            <Button><AiOutlineHeart /></Button>
          </CommentLike>
          <Count>
              <div>
                {comment.likes.length > 0 ? <span>0 Likes</span>:''}
                <Button>Reply</Button>  
              </div>
           </Count>
         
          <ReplyContainer>
            { comment.replies.map(reply => {
              return (
                <Discussion key={reply.reply_id}>
                  <Link to={`${url}/users/${reply.user_id}`}>
                    <AvatarImage src={reply.userAvatar} alt="avatar"/>
                  </Link>
                  <p><AuthorName>{reply.username}</AuthorName>{reply.answer}</p>
                  <CommentLike>
                    <Button><AiOutlineHeart /></Button>
                  </CommentLike>
                  <Count>
                    <div>
                      {reply.likes.length > 0 ? <span>0 Likes</span>:''}
                      <Button>Reply</Button>  
                    </div>
                  </Count>    
                </Discussion>
              )
             })
            }
          </ReplyContainer>
       </Discussion>
          )
        })}
      </PostDiscussion>

      <PostComment>
        <AvatarImage src={user.avatar.avatar_url} alt="avatar" />
        <input 
          ref={commentInputRef} 
          value={comment} 
          placeholder="Got a question??, Ask John!"
          onChange={(e) => setComment(e.target.value)}
          />
        <button disabled={!comment ? true: false} >Post</button>
      </PostComment>
    </PostWrapper>
  )
}


/* { 
      "comment_id": "comment1",
      "user_id": "user3",
      "username": "Max",
      "userAvatar": "https://www.oneindia.com/img/1200x80/2017/05/x05-1451993146-himalayas-mount-everest-latest-600-jpg-pagespeed-ic-dkoe-ed5xd1-22-1495457231.jpg'",
      "comment": "Are there any good hostels around??",
      "likes":[],
      "replies":[{
        "reply_id": "reply4",
        "user_id": "user1",
        "username": "John",
        "userAvatar": "https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771",
        "answer": "Yes, there are quite a few and are located in convenient places.",
        "likes":[]
      }
      {
      "comment_id": "comment2",
      "user_id": "user2",
      "username": "Lewis",
      "userAvatar": "http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png",
      "comment": "Does public transports go everywhere?",
      "likes":[],
      "replies":[{
        "reply_id": "reply3",
        "user_id": "user1",
        "username": "John",
        "userAvatar": "https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771",
        "reply": "Yes, around Barcelona public transports are good enough",
        "likes":[]
      }
      
    */