import React, { useState, useRef } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Comment from './Comment';

import { 
  likeThePost, 
  addCommentPost, 
  replyPostComment
} from '../../../redux/posts/postActions';

import styled,{ css } from 'styled-components';

import PostImages from './PostImages';
import PostDetails from './PostDetails';

//Icons IoTrashBinSharp 
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";



const sharedBtnCss = css`
  display: inline-block;
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
 h4, p {
   margin-bottom: 0.5rem;
 }
 h4{
   font-size: 0.95rem;
 }
 p {
   font-size: 0.8rem;
 }
`
const CommentsAndLikes = styled.div`
  font-size: 0.9rem;
  padding: 8px;
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
  display: inline-block;
  margin-left: 0.35rem;
  color: #888;
  letter-spacing: 1px;
  cursor:pointer;
  font-size: 0.8rem;
  &:hover {
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
   display: flex;
   justify-content: space-between;
   color: #888;
   div {
     display: inline-block;
     padding: 4px 6px;
     border-radius: 8px;
   }
   span {
     display: inline-block;
     margin-right: 0.65rem;
     font-size: 0.825rem;
     letter-spacing: 1px;
   }
   button {
     font-size: 0.8rem;
   }
`

const CommentPost = styled.div` 
  padding: 8px;
  div {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;

      input {
        width: calc( 100% - 39px);
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
        position: absolute;
        display: inline-block;
        font-weight: 600;
        top:50%;
        transform: translateY(-50%);
        right: 0.75rem;
        cursor: pointer;
     }
  }
  
`
const ReplyBanner = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  padding: 5px;
  margin-bottom: 0.25rem;
`
const PostComments = styled.div`
  padding: 8px;
`
/* const Comment = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-row-gap:0.08rem;
 grid-template-columns: 45px 1fr 45px;
 font-size: 0.9rem;
 padding: 6px 0 0px 6px;
 line-height: 20px;
 p {
   background-color: #f1f1f1;
   padding: 8px;
   border-radius: 10px;
 }
` */
//const Comment = styled.div``
/* const Reply = styled(Comment)`
 margin-top: 0.1rem;
 margin-bottom: 0;
` */
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
const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #333;
`
export default function Post({ post, setModal }) {
  const [showInfo, setShowInfo] = useState(false);
  const [text, setText] = useState('');
  const [postComment, setPostComment] = useState(true);
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null });
  const commentInputRef = useRef();
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();
  let { url } = useRouteMatch();

  const postDetails = {
    numOfPeople: post.travellerInfo.numOfPeople,
    cost: post.travellerInfo.cost,
    numOfDays: post.recommendations.numOfDays,
    budget: post.recommendations.budget,
    heritages: post.recommendations.heritages,
    places: post.recommendations.places,
    todos: post.recommendations.todos,
    others: post.recommendations.others,
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(postComment) {
      dispatch(addCommentPost(post.post_id, { text }))
    } else {
      dispatch(replyPostComment(post.post_id, replyInfo.commentId, { text }))
    }
    setText('');
  }
  const handleComment = (e) => {
    e.preventDefault();
    commentInputRef.current.focus();
    setPostComment(true);
    setReplyInfo({...replyInfo, replyTo: null, commentId: null })
  }

  const handleReply = (e, commentAuthor, commentId) => {
    e.preventDefault();
    commentInputRef.current.focus();
    setReplyInfo({ ...replyInfo, replyTo: commentAuthor, commentId })
    setText(`@${commentAuthor} `)
    setPostComment(false);
  }

  const handleClear = (e) => {
    e.preventDefault();
    setPostComment(true);
    setReplyInfo({ ...replyInfo, replyTo: null, commentId: null })
    setText('')
  }
  
  return (
    <PostWrapper>
      <PostAuthor>
        <Link to={ `${url}/users/${post.author.authorId}` }>
          <AvatarImage src={ post.author.authorAvatar } alt="avatar"/>
        </Link>
        <div>
          <AuthorName>{ post.author.authorName }</AuthorName>
          <h5>{ post.destinationInfo.destination }, { post.destinationInfo.country }</h5>
        </div>
        { 
          post.author.authorId === user._id && 
           <ActionContainer>
              <DeleteButton onClick={ (e) => setModal(post.post_id) }><GrEdit /></DeleteButton>
              <DeleteButton><IoTrashBinOutline /></DeleteButton>
           </ActionContainer>
        }
      </PostAuthor>
      <PostImages images={ post.images } postId={ post.post_id } />
      <PostTitle>
        <h4>Summary</h4>    
        <p> { post.destinationInfo.summary }</p>
        <Button 
          onClick={ () => setShowInfo(!showInfo) } > 
          <BsFillInfoCircleFill/> { showInfo ? 'Less Info... ': 'More Info...' }
        </Button>
      </PostTitle>  
      { showInfo && <PostDetails data={ postDetails }/> }
      <CommentsAndLikes>
        { post.likes.length > 0 && 
          <Likes to={ `${url}/posts/1` } >
            { post.likes.length ===  1 ? '1 Like' : `${ post.likes.length } Likes` } 
          </Likes>
        }
        { post.comments.length > 0 &&
          <Comments to={ `${url}/posts/1` }> 
            { post.comments.length ===  1 ? '1 comment' : `${ post.comments.length } comments` }
          </Comments>
        }
      </CommentsAndLikes>
      <PostInteractions>
        <InteractionButton 
          onClick={ (e) => dispatch(likeThePost(post.post_id)) } >
            { 
              post.likes.find(like => like.user_id === user._id) ? 
               <AiFillHeart /> 
                 :
               <AiOutlineHeart /> 
            } 
        </InteractionButton> 
        <InteractionButton 
          onClick={ (e) => handleComment(e) } >
           <FaComments/> 
        </InteractionButton> 
      </PostInteractions>
      <PostComments>
        { post.comments.map(comment => {
          return (
            <Comment 
              post_id={ post.post_id }
              url={ url }
              comment={ comment }
              handleReply={ handleReply }
            />
           )
          })}
      </PostComments>

      <CommentPost>
        { !postComment && <ReplyBanner>{`Replying to @${replyInfo.replyTo}`} <button onClick={(e) => handleClear(e)}><MdClear /></button></ReplyBanner> }
        <div>
          <AvatarImage src={ user.avatar.avatar_url } alt="avatar" />
          <input 
            ref={ commentInputRef } 
            value={ text } 
            placeholder="Got a question??, Ask John!"
            onChange={ (e) => setText(e.target.value) }
            />
          <button 
            disabled={ !text.trim() ? true : false } 
            onClick={ (e) => handleClick(e)}>
              Post
          </button>
        </div>
      </CommentPost>
    </PostWrapper>
  )
}



