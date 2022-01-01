import ReactStars from 'react-rating-stars-component';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import usePost from '../components/usePost';
import { 
  likeThePost, 
  getSinglePost ,
  addCommentPost, 
  replyPostComment
} from '../../../redux/posts/postActions';

import styled, { css } from 'styled-components';

import SinglePostImages from '../components/SinglePostImages';
import PostDetails, { usePostDetails } from '../components/PostDetails';
import Comments from '../components/Comments';


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

const Likes = styled.span`
  display: inline-block;
  margin-right: 1rem;
  text-decoration: none; 
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

export default function Singlepost() {
   const { user } = useSelector(state => state.User);
  const { loading, singlepost, error } = useSelector(state => state.SinglePost);
  const [post, setPost] = useState(null);
  
  const [commentText, setCommentText] = useState('');
  const { details } = usePostDetails(post);
  const [showInfo, setShowInfo] = useState(false);
  const [showComment, setShowComment] = useState(false)
  const [replyInfo, setReplyInfo] = useState({ replyTo: null, commentId: null });
  
  const commentInputRef = useRef();
  const dispatch = useDispatch();
  const { post_id } = useParams();
  let match = useRouteMatch();
  
  useEffect(() => {
    dispatch(getSinglePost(post_id))
  },[dispatch, post_id]);

  useEffect(() => {
    if(!singlepost || error) return;
    setPost(singlepost);
  }, [singlepost, error])

  const handlePostLike = async (e, postId) => {
     e.preventDefault();
     try {
        await axios.put(`/api/v1/posts/${ postId }/like_post`);
        dispatch(getSinglePost(postId))
      } catch(error) {
        //setPostLoadingError(error);
      }
  } 

  const handlePostComment = async (e, postId) => {
     e.preventDefault();
     let trimmedText = commentText.trim();
     try {
        const response = await axios.put(`/api/v1/posts/${ postId }/comment_post`, { text: trimmedText });
        setPost(response.data.post);
        //dispatch(getSinglePost(postId))
      } catch(error) {
        
      }
     setCommentText('')

  }

  /* const handleClick = (e) => {
    e.preventDefault();
    if(postComment) {
      dispatch(addCommentPost(post.post_id, { commentText }))
    } else {
      dispatch(replyPostComment(post.post_id, replyInfo.commentId, { commentText }))
    }
    setCommentText('');
  } */
  const handleComment = (e) => {
    e.preventDefault();
    commentInputRef.current.focus();
    setReplyInfo({...replyInfo, replyTo: null, commentId: null })
  }

  
  const handleKeyUp = (e) => {
    e.target.style.height = '35px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleClear = (e) => {
    e.preventDefault();
    setReplyInfo({ ...replyInfo, replyTo: null, commentId: null })
    setCommentText('')
  }
  
  if(loading || !post) {
    return <Loading />
  }
  return (
    <SinglePostContainer>
      <ImageGridWrapper>
        <SinglePostImages imgs={ post.images }/>
      </ImageGridWrapper>
      <PostWrapper>
        <PostAuthor>
          <Link to={ `${ match.url }/users/${ post.author.authorId }` }>
            <AvatarImage src={ post.author.authorAvatar } alt="avatar"/>
          </Link>
          <AuthorName>{ post.author.authorName }</AuthorName>
          { 
          post.author.authorId === user.user_id && 
          <ActionContainer>
            <EditLink><GrEdit /></EditLink>
            <DeleteButton><IoTrashBinOutline /></DeleteButton>
          </ActionContainer>
        }
        </PostAuthor>
        <PostTitle>
          <h3>{ post.destinationInfo.destination }, { post.destinationInfo.country }</h3>
          <ReactStars 
              count={5}
              isHalf={true}
              value={4.5}
            />
          <p>{  post.destinationInfo.summary }</p>
          
          <Button 
            onClick={ () => setShowInfo(!showInfo) }> 
            { showInfo ? 'Less Info... ': 'More Info...' }
          </Button>
        </PostTitle>
      
        { showInfo && <PostDetails data={ details }/> }

        <CommentLike>
          { post.likes.length > 0 && 
            <Likes to={ `/posts/1` } >
               { post.likes.length ===  1 ? '1 Like' : `${ post.likes.length } Likes` } 
            </Likes>
          }
          <span> 
             { post.comments.length ===  1 ? '1 comment' : `${ post.comments.length } comments` }
          </span>
        </CommentLike>
        
        <PostInteractions>
          <InteractionButton 
           onClick={ (e) => handlePostLike(e, post.post_id) } >
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
          <div>
            <AvatarImage src={ user.avatar.avatar_url } alt="avatar"/>
            <textarea 
              ref={commentInputRef} 
              value={commentText} 
              placeholder="Add a comment"
              onChange={ (e) => setCommentText(e.target.value) }
              onKeyUp={(e) => handleKeyUp(e)}
              />
            <button 
              disabled={ !commentText.trim() ? true: false }
              onClick={(e) => handlePostComment(e, post.post_id)}
              >
                Post
            </button>
          </div>
       </CommentPost>
       {
         showComment 
          &&
         <Comments postId={ post.post_id } setPost={setPost} comments={post.comments}/>
       }
      </PostWrapper>
    </SinglePostContainer>
  )
}



