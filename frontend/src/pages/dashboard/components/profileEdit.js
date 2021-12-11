import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UserImageContainer, UserAvatar, UserCover, UserTitle, UserInfo, sharedDivCss } from '../pages/profile';
import { useHistory } from 'react-router-dom';

//Icons FiCamera
import { BiArrowBack } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import EditForm from './EditForm';

const UserInfoComponent = ({ infos }) => {
  return  <UserInfo>
       <h3>Info </h3>
       <div>
          <span><FcAbout /></span>
          <p><b>Name:</b> { infos.username }</p>
       </div> 
       <div>
          <span><FcAbout /></span>
          <p><b>Email:</b> { infos.email }</p>
         </div>   
       <div>
           <span><FcAbout /></span>
           <p><b>About:</b> { infos.about }</p>
        </div>
        <div>
          <span><FcAbout /></span>
          <p><b>Hobbies:</b> { infos.hobbies }</p>
         </div>
         <div>
          <span><FcAbout /></span>
          <p><b>Location:</b> { infos.city }, { infos.country }</p>
         </div>  
     </UserInfo>
}
const Container = styled.div`
  width: 98%;
  border-radius: 8px;
  margin: 4.25rem auto 1.5rem auto;
  background-color: transparent;
`
const ProfileContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding-bottom: 5px;
  border-radius: 8px;
  margin: 1.5rem auto 1.5rem auto;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5); 
`

const UserProfile = styled.div`
 
 padding: 0;
 margin: 0;
 width: 100%;
 background: transparent;
 box-shadow: none;
`

const EditHeading = styled.div`
  width: 100%;
  h2 {
    margin-top: 0.75rem;
    text-align: center;
    font-family: 'Montserrat Alternates', sans-serif;
  }
  button {
    display: inline-block;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background: transparent;
    letter-spacing: 1px;
    font-size: 1.15rem;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
`
const EditButton = styled.button`
  ${sharedDivCss}
  outline: none;
  border: none;
  display: block;
  padding: 6px 12px;
  background-color: dodgerblue;
  font-size: 1.25rem;
  color: #fefefe;
`

const initialState = (user) => {
  const { username, email, about, city, country, hobbies} = user;
   return { username, email, about, city, country, hobbies }
}
export default function ProfileEdit({ user }) {
  const {avatar, cover } = user;
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarImg, setAvatarImg] = useState();
  const [coverImg, setCoverImg] = useState(null);
  const [infos, setInfos] = useState(initialState(user));
  const [showEdit, setShowEdit] = useState(false);
  
  const avatarRef = useRef();
  const coverRef = useRef();

  const history = useHistory();

  useEffect(() => {
   if(!avatarFile) return
   let avatarURL = URL.createObjectURL(avatarFile);
   setAvatarImg(avatarURL);
  },[avatarFile]);

  useEffect(() => {
   if(!coverFile) return
   let coverURL = URL.createObjectURL(coverFile);
   setCoverImg(coverURL);
  },[coverFile])

  const handleClick = (e, imgType) => {
    e.preventDefault();
    if(imgType === 'avatar') {
      return avatarRef.current.click(); 
    }
    if(imgType === 'cover') {
      return coverRef.current.click(); 
    }  

  }
  const handleFileUpload = (e, imgType) => {
    e.preventDefault();
    if(imgType === 'avatar') {
      return setAvatarFile(avatarRef.current.files[0]) 
    }
    if(imgType === 'cover') {
      return setCoverFile(coverRef.current.files[0]) 
    }
  }
  const handleToggle = (e) => {
    e.preventDefault();
    if(showEdit) {
      setInfos(initialState(user));
      return setShowEdit(!showEdit);
    }
    setShowEdit(!showEdit)
  }
  
  return (
    <Container>
     <EditHeading>
       <button onClick={(e) => history.goBack()}><BiArrowBack/> <span>Go Back</span></button>
       <h2>Edit Profile</h2>
     </EditHeading>
     <ProfileContainer>
       <UserProfile>
        <UserImageContainer>
          <UserCover>
            <img src={ coverImg || cover } alt="cover"/>
            <button onClick={(e) => handleClick(e, 'cover')}> <FaCamera/></button>
            <input 
                name="coverImg" 
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={coverRef}
                onChange={(e) => handleFileUpload(e, 'cover')}
              />
          </UserCover>
          <UserAvatar>
            <img src={ avatarImg || avatar } alt="cover"/>
            <button onClick={(e) => handleClick(e, 'avatar')}> <FaCamera/></button>
            <input 
                name="avatarImg" 
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={avatarRef}
                onChange={(e) => handleFileUpload(e, 'avatar')}
              />
          </UserAvatar>
          <UserTitle>{ infos.username }</UserTitle>
        </UserImageContainer>
       </UserProfile>
       <EditButton 
         onClick={(e) => handleToggle(e)}> 
         { showEdit ? 'Cancel Edit' : 'Edit Info..'}
       </EditButton>
      { 
        showEdit ? 
        <EditForm infos={infos} setInfos={setInfos} /> 
        : 
        <UserInfoComponent infos={infos} />
      }
      <EditButton onClick={(e) => setShowEdit(!showEdit)}>
        {showEdit ? 'Save & Exit':'Save'}
      </EditButton>
     </ProfileContainer>
    </Container>
  )
}

const posts = [
  {
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
    todo:['Paella Course', 'Barcelona Stadium Tour','Flamenco Dance', 'City Breaks'],
    transportation: 'Buses and trains are readily available.',
    others:'Amneties conveniently located, very safe place.',
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
        reply_id: 'reply4',
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
        reply_id: 'reply3',
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
        reply_id: 'reply1',
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
        reply_id: 'reply2',
        user_id: 'user1',
        username: 'John',
        userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
        answer: 'Yes, around Barcelona public transports are enough',
        likes:[]
      }]
    }
  ] 
  },



]