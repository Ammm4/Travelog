import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  likeThePost, 
  getSinglePost ,
  addCommentPost, 
  replyPostComment
} from '../../../redux/posts/postActions';

import styled, { css } from 'styled-components';

import SinglePostImages from '../components/SinglePostImages';
import PostDetails from '../components/PostDetails';
import Comment from '../components/Comment';

//Icons
import { BiLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { MdClear } from "react-icons/md";
import Loading from '../components/Loading';


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
const SinglePostContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1.35fr .65fr;
  grid-template-rows: 100vh;
  overflow: hidden;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 50vh;
  }
`
const ImageGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #111111;
  padding: 0%;
`
const PostWrapper = styled.article`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 4.25rem auto 2rem auto;
  overflow: auto;
  //padding: 8px;
  //border-radius: 8px;
  //background-color: #eeeeee;
  cursor:pointer;
  @media only screen and (max-width: 600px) {
    margin:0;
  }
`
const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  letter-spacing: 1px;
  border-bottom: 2px solid #fff;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 3px;
  }
  span {
    font-weight: 700;
  }
`
const PostTitle = styled.div`
 margin-bottom: 0.75rem;
 letter-spacing: 1px;
 padding:0.5rem;
 h3, p {
   margin-bottom: 0.5rem;
 }
 p {
   font-size: 0.9rem;
 }
`
const Button = styled.button`
  display:inline-block;
  margin-left: 0.35rem;
  outline: none;
  border: none;
  background: transparent;
  color: #888;
  letter-spacing: 1px;
  &:hover{
    color:#ccc
  }
`
const PostInteractions = styled.div`
border-top: 1px solid #f1f1f1;
border-bottom: 1px solid #f1f1f1;
padding: 6px;
`
const InteractionButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-size: 1rem;
  display: inline-block;
  margin-right: 10px;
`
const CommentPost = styled.div`
  position: fixed;
  width:32.5vw;
  bottom: 0;
  right:0;
  background-color: #fff;
  padding: 8px;
  border-top: 1px solid #f1f1f1;
  div {
    width: 100%;
    display: flex;
    align-items: center;
    textarea {
        width: calc( 100% - 39px);
        height: 35px;
        resize: none;
        border: 1px solid #888;
        font-size: 0.9rem;
        padding: 6px 50px 6px 12px;
        border-radius: 15px;
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
  }
  
   
   @media only screen and (max-width: 600px) {
    width: 100vw;
    }
`
const CommentLike = styled.div`
  padding: 8px;
  display: flex;
  font-size: 0.8rem;
`
const Comments = styled.span`
  //flex: 1 1 50%;
  //text-align: right;
  
  text-decoration: none;
  `

const Likes = styled.span`
  //flex: 1 1 50%; 
  display: inline-block;
  margin-right: 1rem;
  text-decoration: none; 
`
const ReplyBanner = styled.div`
  background-color: #fafafa;
  font-size: 0.85rem;
  padding: 5px;
  margin-bottom: 0.25rem;
`
const PostComments = styled.div`
 padding: 8px;
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
  background-color: #f1f1f1;
`
const usePostDetails= (post) => {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    if(!post) return;
    setDetails({
      numOfPeople: post.travellerInfo.numOfPeople,
      cost: post.travellerInfo.cost,
      numOfDays: post.recommendations.numOfDays,
      budget: post.recommendations.budget,
      heritages: post.recommendations.heritages,
      places: post.recommendations.places,
      todos: post.recommendations.todos,
      others: post.recommendations.others, 
    })
  }, [post])
  return {details}
}

export default function Singlepost() {
  const { user } = useSelector(state => state.User);
  const { loading, singlepost: post, error } = useSelector(state => state.SinglePost);
  const [text, setText] = useState('');
  const { details } = usePostDetails(post);
  const [showInfo, setShowInfo] = useState(false);
  const [showComment, setShowComment] = useState(false)
  const [postComment, setPostComment] = useState(true);
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null });
  
  const commentInputRef = useRef();
  const dispatch = useDispatch();
  const { post_id } = useParams();
  let match = useRouteMatch();
  
  useEffect(() => {
    dispatch(getSinglePost(post_id))
  },[dispatch, post_id])
  
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

  const handleKeyUp = (e) => {
    e.target.style.height = '35px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  const handleClear = (e) => {
    e.preventDefault();
    setPostComment(true);
    setReplyInfo({ ...replyInfo, replyTo: null, commentId: null })
    setText('')
  }
  
  if(loading) {
    return <Loading />
  }
  return (
    <SinglePostContainer>
      <ImageGridWrapper>
        <SinglePostImages imgs={post.images}/>
      </ImageGridWrapper>
      <PostWrapper>
        <PostAuthor>
          <Link to={`${match.url}/users/${post.author.authorId}`}>
            <AvatarImage src={post.author.authorAvatar} alt="avatar"/>
          </Link>
          <AuthorName>{post.author.authorName}</AuthorName>
          { 
          post.author.authorId === user.user_id && 
          <ActionContainer>
            <EditLink><GrEdit /></EditLink>
            <DeleteButton><IoTrashBinOutline /></DeleteButton>
          </ActionContainer>
        }
        </PostAuthor>
        <PostTitle>
          <h3>{ post.destinationInfo.destination}, { post.destinationInfo.country}</h3>
          <p>{  post.destinationInfo.summary}</p>
          <Button onClick={() => setShowInfo(!showInfo)}> { showInfo ? 'Less Info... ': 'More Info...' }</Button>
        </PostTitle>
      
        { showInfo && <PostDetails data={ details }/> }

        <CommentLike>
          { post.likes.length > 0 && 
            <Likes to={ `/posts/1` } >
               { post.likes.length ===  1 ? '1 Like' : `${ post.likes.length } Likes` } 
            </Likes>
          }
          <Comments> 
             { post.comments.length ===  1 ? '1 comment' : `${ post.comments.length } comments` }
          </Comments>
        </CommentLike>
        
        <PostInteractions>
          <InteractionButton 
           onClick={() => dispatch(likeThePost(post.post_id))} >
            { 
              post.likes.find(like => like.user_id === user._id) ?
                <AiFillHeart /> 
                  :
                <AiOutlineHeart />
            }
          </InteractionButton> 
          <InteractionButton 
            onClick={ (e) => handleComment(e) } >
            <FaComments />
          </InteractionButton>
        </PostInteractions>
        { 
          post.comments.length > 0 
            && 
          <PostComments>
            <Line/>
            <Button onClick={ (e) => setShowComment(!showComment) }>
              { showComment ? 'Hide' : 'Show' } { post.comments.length } { post.comments.length === 1 ? 'Comment' : 'Comments' }
            </Button>
          </PostComments>
       } 
        <CommentPost>
          { !postComment && <ReplyBanner>{`Replying to @${replyInfo.replyTo}`} <button onClick={(e) => handleClear(e)}><MdClear /></button></ReplyBanner> }
          <div>
            <AvatarImage src={ user.avatar.avatar_url } alt="avatar"/>
            <textarea 
              ref={commentInputRef} 
              value={text} 
              placeholder="Add a comment"
              onChange={ (e) => setText(e.target.value) }
              onKeyUp={(e) => handleKeyUp(e)}
              />
            <button 
              disabled={ !text.trim() ? true: false }
              onClick={(e) => handleClick(e)}
              >
                Post
            </button>
          </div>
       </CommentPost>
       {
         showComment 
          &&
         <PostComments>
          { post.comments.map(comment => {
            return (
              <Comment 
                key={ comment.comment_id }
                post_id={ post.post_id }
                url={ match.url }
                comment={ comment }
                handleReply={ handleReply }
              />
            )
          })}
      </PostComments>}
      </PostWrapper>
    </SinglePostContainer>
  )
}



