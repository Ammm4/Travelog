import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeThePost } from '../../../redux/posts/postActions';
import { getSinglePost } from '../../../redux/posts/postActions';
import styled, { css } from 'styled-components';

import SinglePostImages from '../components/SinglePostImages';
import PostDetails from '../components/PostDetails';

//Icons
import { BiLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
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
border-top: 1px solid #888;
border-bottom: 1px solid #888;
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
const Count = styled.div`
   grid-column-start: 2;
   grid-column-end: 3; 
   display: flex;
   justify-content: space-between;
   div {
     display: inline-block;
     padding: 4px 6px;
     border-radius: 8px;
   }
   `
  const PostComment = styled(PostAuthor)`
  position: fixed;
  width:32.5vw;
  background-color: red;
  bottom: 0;
  right:0;
  background-color: #fff;
  padding: 8px;
  border-top: 1px solid #888;
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

const PostComments = styled.div`
 padding: 8px;
`
const Comment = styled.div`
  margin-bottom: 0.5rem;
  display: grid;
  grid-row-gap:0.085rem;
  grid-template-columns: 45px 1fr 45px;
  font-size: 0.9rem;
  padding: 6px 0 0px 6px;
  line-height: 20px;
  p {
   background-color: #f1f1f1;
   padding: 8px;
   border-radius: 10px;
  }
  div {
    span {
      display: inline-block;
      letter-spacing: 1px;
      color: #888;
      font-size: 0.8rem;
    }
  }

`
const Reply = styled(Comment)`
 margin-top: 0.1rem;
 margin-bottom: 0;
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
const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #333;
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
//handleReply(e, comment.username, comment.comment_id)
// Single Post Extra Components 
//dispatch(likePostComment(post.post_id, comment.comment_id))
export default function Singlepost() {
  const { user } = useSelector(state => state.User);
  const { loading, singlepost, error } = useSelector(state => state.SinglePost);
  const { details } = usePostDetails(singlepost);
  const [showInfo, setShowInfo] = useState(false);
  const [comment, setComment] = useState('');
  const commentInputRef = useRef();
  const dispatch = useDispatch();
  const { post_id } = useParams();
  let match = useRouteMatch();
  
  useEffect(() => {
    dispatch(getSinglePost(post_id))
  },[dispatch, post_id])
  
  if(loading) {
    return <Loading />
  }
  return (
    <SinglePostContainer>
      <ImageGridWrapper>
        <SinglePostImages imgs={singlepost.images}/>
      </ImageGridWrapper>
      <PostWrapper>
        <PostAuthor>
          <Link to={`${match.url}/users/${singlepost.author.authorId}`}>
            <AvatarImage src={singlepost.author.authorAvatar} alt="avatar"/>
          </Link>
          <AuthorName>{singlepost.author.authorName}</AuthorName>
          { 
          singlepost.author.authorId === user.user_id && 
          <ActionContainer>
            <EditLink><GrEdit /></EditLink>
            <DeleteButton><IoTrashBinOutline /></DeleteButton>
          </ActionContainer>
        }
        </PostAuthor>
        <PostTitle>
          <h3>{ singlepost.destinationInfo.destination}, { singlepost.destinationInfo.country}</h3>
          <p>{  singlepost.destinationInfo.summary}</p>
          <Button onClick={() => setShowInfo(!showInfo)}> {showInfo ? 'Less Info... ': 'More Info...'}</Button>
        </PostTitle>
      
        { showInfo && <PostDetails data={ details }/> }

        <CommentLike>
          { singlepost.likes.length > 0 && 
            <Likes to={ `/posts/1` } >
               { singlepost.likes.length ===  1 ? '1 Like' : `${ singlepost.likes.length } Likes` } 
            </Likes>
          }
          <Comments> 
             { singlepost.comments.length ===  1 ? '1 comment' : `${ singlepost.comments.length } comments` }
          </Comments>
        </CommentLike>
        
        <PostInteractions>
          <InteractionButton 
           onClick={() => dispatch(likeThePost(singlepost.post_id))} >
            { 
              singlepost.likes.find(like => like.user_id === user._id) ?
                <AiFillHeart /> 
                  :
                <AiOutlineHeart />
            }
          </InteractionButton> 
          <InteractionButton 
            onClick={(e) => commentInputRef.current.focus()} >
            <FaComments />
          </InteractionButton>
        </PostInteractions>
        <PostComment>
          <AvatarImage src={ user.avatar.avatar_url } alt="avatar"/>
          <input 
            ref={commentInputRef} 
            value={comment} 
            placeholder="Add a comment"
            onChange={ (e) => setComment(e.target.value) }
            />
          <button 
            disabled={!comment ? true: false}
            onClick={(e) => console.log('hi')}
            >
              Post
          </button>
       </PostComment>
       <PostComments>
        { singlepost.comments.map(comment => {
          return (
            <Comment key={comment.comment_id}>
              <Link to={`${match.url}/users/${comment.user_id}`}>
                <AvatarImage src={comment.userAvatar} alt="avatar"/>
              </Link>
              <div>
                 <p>
                   <AuthorName>{ comment.username }</AuthorName> 
                   { comment.text }
                 </p>
                <Count>
                  <div>
                    { 
                      comment.likes.length > 0 
                        && 
                      <span>
                        { comment.likes.length } { comment.likes.length === 1 ? 'Like' : 'Likes' }
                      </span> 
                    }
                    <Button onClick={ (e) => console.log(e) }> Reply </Button>
                   </div>
                  {
                   comment.user_id === user._id &&
                   <div>
                     <Button onClick={ (e) => console.log(e) }> Edit </Button>
                     <Button onClick={ (e) => console.log(e) }> Delete </Button>
                   </div>
                 }
               </Count>
               { 
                comment.replies.length > 0 
                  && 
                <>
                  <Line/>
                  <Button>
                    Show { comment.replies.length } { comment.replies.length === 1 ? 'Reply' : 'Replies' }
                  </Button>
                </>
               } 
              </div>
              <CommentLike>
                 <Button 
                   onClick= { (e) => console.log(e)  } >
                  { 
                    comment.likes.find(like => like.user_id === user._id) ? 
                    <AiFillHeart /> 
                      :
                    <AiOutlineHeart /> 
                  } 
                </Button>
              </CommentLike>
              <ReplyContainer>
                { 
                  comment.replies.map(reply => {
                  return (
                   <Reply key={reply.reply_id}>
                     <Link to={ `${match.url}/users/${reply.user_id}` }>
                       <AvatarImage src={ reply.userAvatar } alt="avatar"/>
                     </Link>
                     <p>
                       <AuthorName>{ reply.username }</AuthorName>
                        { reply.text }
                    </p>
                     <CommentLike>
                        { 
                          reply.likes.find(like => like.user_id === user._id) ? 
                          <AiFillHeart /> 
                          :
                          <AiOutlineHeart /> 
                        } 
                     </CommentLike>
                     <Count>
                      <div>
                        { 
                          reply.likes.length > 0 
                           && 
                          <span>
                            { reply.likes.length } { reply.likes.length === 1 ? 'Like' : 'Likes' }
                          </span> 
                        }
                           <Button onClick={ (e) => console.log(e) }> Reply </Button> 
                      </div>
                      {
                        reply.user_id === user._id &&
                        <div>
                          <Button onClick={ (e) => console.log(e) }> Edit </Button>
                          <Button onClick={ (e) => console.log(e) }> Delete </Button>
                         </div>
                 }
                     </Count> 
                 </Reply>
                )
               })}
            </ReplyContainer>
          </Comment>
          )
        })}
      </PostComments>
      </PostWrapper>
    </SinglePostContainer>
  )
}



