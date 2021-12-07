import React, { useState, useRef } from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import styled,{css} from 'styled-components';

import PostImages from './PostImages';
import PostDetails from './PostDetails';

//Icons BsArrowReturnRight
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

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
const AuthorName = styled.div`
 display: flex;
 align-items: center;
 font-weight: 600;
`
const PostWrapper = styled.article`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  background-color: #eeeeee;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  cursor:pointer;
`
const PostAuthor = styled.div`
  display: grid;
  grid-template-columns: 45px 1fr;
  margin-bottom: 0.75rem;
  padding: 8px;
  letter-spacing: 1px;
  border-bottom: 2px solid #fff;
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
  color: #888;
  letter-spacing: 1px;
  &:hover{
    color:#ccc
  }
`

const PostInteractions = styled.div`
border-top: 1px solid #fff;
border-bottom: 1px solid #fff;
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
 background-color: #fefefe;
 font-size: 0.9rem;
 padding: 6px 0 6px 6px;
 border-radius: 10px;
 line-height: 20px;
`
const ReplyContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`
export default function Post({ post }) {
  const [showInfo, setShowInfo] = useState(false);
  const [comment, setComment] = useState('')
  const commentInputRef = useRef();
  let match = useRouteMatch();
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
        <Link to={`${match.url}/users/${post.authorId}`}><AvatarImage src={post.authorAvatar} alt="avatar"/></Link>
        <div>
          <AuthorName>{post.authorName}</AuthorName>
          <h5>{post.destination}, {post.country}</h5>
        </div>
      </PostAuthor>
      <PostImages images={ post.images } postId={post.id}/>
      <PostTitle>    
        <p><b>###</b> {post.description}</p>
        <Button onClick={() => setShowInfo(!showInfo)}> <BsFillInfoCircleFill/> {showInfo ? 'Less Info... ': 'More Info...'}</Button>
      </PostTitle>  
      { showInfo && <PostDetails data={postDetails}/> }
      <CommentLike>
        <Likes to={`${match.url}/posts/1`}> 0 Likes</Likes>
        <Comments to={`${match.url}/posts/1`}> 1 Q&A</Comments>
      </CommentLike>
      <PostInteractions>
        <InteractionButton ><AiOutlineHeart /> </InteractionButton> 
        <InteractionButton onClick={(e) => commentInputRef.current.focus()}><BsQuestionCircle /> Ask John</InteractionButton> 
      </PostInteractions>
      <PostDiscussion>
        { post.comments.map(comment => {
          return (
        <Discussion key={comment.comment_id}>
          <Link to={`${match.url}/users/${comment.user_id}`}><AvatarImage src={comment.userAvatar} alt="avatar"/></Link>
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
            {comment.replies.map(reply => {
              return (
                <Discussion>
                  <Link to={`${match.url}/users/${reply.user_id}`}><AvatarImage src={reply.userAvatar} alt="avatar"/></Link>
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
            })}
          </ReplyContainer>
       </Discussion>
          )
        })}
      </PostDiscussion>

      <PostComment>
        <AvatarImage src={post.authorAvatar} alt="avatar" />
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


