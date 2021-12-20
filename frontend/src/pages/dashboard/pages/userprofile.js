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
  padding-top: 65px;
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
export const UserTitle = styled.h1`
  text-align: center;
  position: absolute;
  left:50%; bottom: 10%;
  transform: translateX(-50%);
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

export default function Userprofile() {
  const history = useHistory();
  const {loading, singleuser: user, error} = useSelector(state => state.SingleUser)
  const { user_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleUser(user_id))
  },[dispatch, user_id])

  if(loading) {
    return <Loading />
  }
  return (
    <ProfileContainer>
     <UserProfile>
       <UserImageContainer>   
        <UserCover>
          <img src={user.cover} alt="cover"/>
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
          { user.posts.map(post => <Post post={post} key={post.post_id} />) }
        </PostsWrapper>
        : <Zeropost />
     }
    
    </ProfileContainer>
  )
}


const users = [
  {
  user_id:'user1',
  username:'John',
  avatar:'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
  cover:'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4d/45/49/province-of-barcelona.jpg?w=1200&h=-1&s=1',
  about:'Loves to travel, experience new cultures and food, keen f1 follower. Have travelled to most part of Europe.',
  hobbies:'Travelling, Music, Cooking',
  city:'Texas',
  country: 'United States',
  email: 'hero@yahoo.com',
  posts: [ {
    id:'post_1',
    authorId:'user1',
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
      user_id:'user3',
      username: 'Max',
      userAvatar: 'https://www.oneindia.com/img/1200x80/2017/05/x05-1451993146-himalayas-mount-everest-latest-600-jpg-pagespeed-ic-dkoe-ed5xd1-22-1495457231.jpg',
      question: 'Are there any good hostels around??',
      likes:[],
      replies:[{
        user_id:'user1',
        username: 'John',
        userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
        answer: 'Yes, there are quite a few and are located in convenient places.',
        likes:[]
      }]
    },
    {
      comment_id: 'comment2',
      user_id:'user2',
      username: 'Lewis',
      userAvatar: 'http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png',
      question: 'Does public transports go everywhere?',
      likes:[],
      replies:[{
        user_id:'user1',
        username: 'John',
        userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
        answer: 'Yes, around Barcelona public transports are enough',
        likes:[]
      }]
    }
    ] 
   }
  ]
},
  {
  user_id:'user2',
  username:'Lewis',
  avatar:'http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png',
  cover:'https://www.planetware.com/wpimages/2020/02/finland-in-pictures-beautiful-places-to-photograph-helsinki.jpg',
  about:'Travelfreak, mostly do bike tour, spicy food challenger',
  hobbies:'Experience new culture, eating world Foods and Coding',
  city:'Helsinki',
  country: 'Finland',
  email: 'zero@yahoo.com',

  posts:[{
    id:'post_2',
    authorId:'user2',
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
    todo:['Museums tour', "Climb the dome at St Peter's Basilica","Gaze at the heavens through the Pantheon's Oculus", 'Eat grattachecca on the banks of the Tiber River'],
    transportation: 'Metros, Buses, trams reach to most of the popular destinations. Vispa are available cheaply',
    others:'Generally safe but pickpockets are active around.',
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
      user_id: 'user3',
      username: 'Max',
      userAvatar: 'https://www.oneindia.com/img/1200x80/2017/05/x05-1451993146-himalayas-mount-everest-latest-600-jpg-pagespeed-ic-dkoe-ed5xd1-22-1495457231.jpg',
      question: 'Are there any good hostels around??',
      likes:[],
      replies:[{
        user_id: 'user1',
        username: 'John',
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
  }]
},
{
  user_id:'user3',
  username:'Max',
  avatar:'https://www.oneindia.com/img/1200x80/2017/05/x05-1451993146-himalayas-mount-everest-latest-600-jpg-pagespeed-ic-dkoe-ed5xd1-22-1495457231.jpg',
  cover:'https://london.ac.uk/sites/default/files/styles/max_1300x1300/public/2018-10/london-aerial-cityscape-river-thames_1.jpg?itok=6LenFxuz',
  about:'Explorer and Adventurer',
  hobbies:'Food, Wine and Travel',
  city:'London',
  country: 'Finland',
  email: 'maxandmax@gmail.com',
  posts:[]
}

]