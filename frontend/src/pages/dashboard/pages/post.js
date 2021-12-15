import React, { useState, useRef } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, {css} from 'styled-components';

import SinglePostImages from '../components/SinglePostImages';
import PostDetails from '../components/PostDetails';

//Icons
import { BiLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
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

// Single Post Extra Components 
export default function Singlepost() {
  const { user } = useSelector(state => state.User);
  const [showInfo, setShowInfo] = useState(false);
  const [comment, setComment] = useState('');
  let match = useRouteMatch();
  const commentInputRef = useRef();
  const { post_id } = useParams();
  const post = posts.find(post => post.id === post_id);
  let showEditPostButton = post.authorId === user.user_id ? true : false;
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
  
  // <Link to={`${match.url}/users/${post.authorId}`}>
  return (
    <SinglePostContainer>
      <ImageGridWrapper>
        <SinglePostImages imgs={post.images}/>
      </ImageGridWrapper>
      <PostWrapper>
        <PostAuthor>
          <Link to={`${match.url}/users/${post.authorId}`}><AvatarImage src={post.authorAvatar} alt="avatar"/></Link>
          <AuthorName>{post.authorName}</AuthorName>
          { 
          showEditPostButton && 
           <ActionContainer>
              <EditLink><GrEdit /></EditLink>
              <DeleteButton><IoTrashBinOutline /></DeleteButton>
           </ActionContainer>
        }
        </PostAuthor>
        <PostTitle>
          <h3>{post.destination}, {post.country}</h3>
          <p>{post.description}</p>
          <Button onClick={() => setShowInfo(!showInfo)}> {showInfo ? 'Less Info... ': 'More Info...'}</Button>
        </PostTitle>
      
        { showInfo && <PostDetails data={ postDetails }/> }

        <CommentLike>
          <Likes> 0 Likes</Likes>
          <Comments> 1 Q&A</Comments>
        </CommentLike>
        
        <PostInteractions>
          <InteractionButton><BiLike /></InteractionButton> 
          <InteractionButton onClick={(e) => commentInputRef.current.focus()}><FaComments /></InteractionButton>
        </PostInteractions>
        <PostComment>
          <AvatarImage src={user.avatar.avatar_url} alt="avatar"/>
          <input 
            ref={commentInputRef} 
            value={comment} 
            placeholder="Add a comment"
            onChange={(e) => setComment(e.target.value)}
            />
          <button disabled={!comment ? true: false} >Post</button>
       </PostComment>
       <PostDiscussion>
        { post.comments.map(comment => {
          return (
            <Discussion key={comment.comment_id}>
              <Link to={`${match.url}/users/${comment.user_id}`}>
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
                     <Link to={`${match.url}/users/${reply.user_id}`}>
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
               })}
            </ReplyContainer>
          </Discussion>
          )
        })}
      </PostDiscussion>
      </PostWrapper>
    </SinglePostContainer>
  )
}
const posts = [
  {
    id:'post_1',
    authorId: 'user1',
    authorName: 'John',
    authorAvatar:'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
    numPeople: 1,
    destination:'Barcelona',
    country: 'Spain',
    description: 'A bright and lovely place. Excellent place for foodies. Lovely aroma of the surroundings',
    cost: 1500,
    numDays:'3 days',
    budget: 1500,
    heritages: ['Palau de la Música Catalana', 'Park Güell', 'Casa Batlló'],
    places: ['Montserratt', 'Basílica de la Sagrada Família'],
    todos:['Paella Course', 'Barcelona Stadium Tour','Flamenco Dance', 'City Breaks'],
    others:'Amneties conveniently located, very safe place. Buses and trains are readily available.',
    images: [
      {
        img_id: 'img1',
        imgURL: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/72/92/56.jpg',
        imgName:'Montseratt'
      },
      {
        img_id: 'img2',
        imgURL: 'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3NhZ3JhZGEtZmFtaWxpYS0yLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19',
        imgName:'Basílica de la Sagrada Família'
      },
      {
        img_id: 'img3',
        imgURL: 'https://images.prismic.io/mystique/f3ab0e874bae63cf2ab8394f9dc97c7e356ef891_barcelona-park-guell-evening-01.jpg?w=870&h=562.5&q=75&crop=faces&fm=pjpg&auto=compress',
        imgName:'Park Güell'
      },
        {
        img_id: 'img4',
        imgURL: 'https://images.pexels.com/photos/3290070/pexels-photo-3290070.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        imgName:'Casa Batlló'
      }  
    ],
    comments:[
      { 
      comment_id: 'comment1',
      user_id: 'user3',
      username: 'Max',
      userAvatar: 'https://www.oneindia.com/img/1200x80/2017/05/x05-1451993146-himalayas-mount-everest-latest-600-jpg-pagespeed-ic-dkoe-ed5xd1-22-1495457231.jpg',
      question: 'Are there any good hostels around??',
      likes:[],
      replies:[{
        username: 'John',
        user_id: 'user1',
        userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
        answer: 'Yes, there are quite a few and are located in convenient places.',
        likes:[]
      }]
    },
    {
      comment_id: 'comment2',
      user_id: 'user2',
      username: 'Lewis',
      userAvatar: 'http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png',
      question: 'Does public transports go everywhere?',
      likes:[],
      replies:[{
        user_id: 'user1',
        username: 'John',
        userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
        answer: 'Yes, around Barcelona public transports are enough',
        likes:[]
      }]
    }
  ] 
  },
  {
    id:'post_2',
    authorId: 'user2',
    authorName: 'Lewis',
    authorAvatar:'http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png',
    destination:'Rome',
    country: 'Italy',
    description: 'A culturally and historically rich place. Plenty to do in this beautiful city.',
    numPeople: 2,
    cost: 4000,
    numDays:'1 week',
    budget: 2000,
    heritages: ['The Colosseum', 'The Pantheon', 'The Vatican Museums'],
    places: ['Vatican City', 'Roman Forum', 'Trevi Fountain', 'Santa Maria Maggoire'],
    todos:['Museums tour', "Climb the dome at St Peter's Basilica","Gaze at the heavens through the Pantheon's Oculus", 'Eat grattachecca on the banks of the Tiber River'],
    others:'Metros, Buses, trams reach to most of the popular destinations. Vispa are available cheaply. Generally safe but pickpockets are active around.',
    images: [
      {
        img_id: 'img1',
        imgURL: 'https://www.mypremiumeurope.com/img/image_db/historical_sites_rome_vatican-942.webp',
        imgName:'Vatican'
      },
      {
        img_id: 'img2',
        imgURL: 'https://www.mypremiumeurope.com/img/image_db/historical_sites_rome_romanforum-942.webp',
        imgName:'The Rome Forum'
      },
      {
        img_id: 'img3',
        imgURL:  'https://www.mypremiumeurope.com/img/image_db/historical_sites_rome_spanish_steps-942.webp',
        imgName:'The Spanish Steps'
      },
      {
        img_id: 'img4',
        imgURL: 'https://www.mypremiumeurope.com/img/image_db/historical_sites_rome_colosseum-942.webp',
        imgName:'The Coleseum'
      },
      {
        img_id: 'img5',
        imgURL: 'https://www.mypremiumeurope.com/img/image_db/historical_sites_rome_pantheon-942.webp',
        imgName:'The Pantheon'
      }   
    ],
    comments:[
      { 
      comment_id: 'comment1',
      user_id: 'user1',
      username: 'John',
      userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
      
      question: 'Is it safe to travel now??',
      likes:[],
      replies:[{
        username: 'Lewis',
        user_id: 'user2',
        userAvatar: 'http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png',
        answer: 'Yes, but still need to follow some rules.',
        likes:[]
      }]
    },
    {
      comment_id: 'comment2',
      user_id: 'user3',
      username: 'Max',
      userAvatar: 'https://www.oneindia.com/img/1200x80/2017/05/x05-1451993146-himalayas-mount-everest-latest-600-jpg-pagespeed-ic-dkoe-ed5xd1-22-1495457231.jpg',
      question: 'Is public transports safe to use?',
      likes:[],
      replies:[{
        user_id: 'user2',
        username: 'Lewis',
        userAvatar: 'http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png',
        answer: 'Yes, minimum number of passengers are allowed per ride.',
        likes:[]
      }]
    }
  ] 
  },

]


