import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';



// ============ Components ================ //
import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import Pagenotfound from './pages/nopage.js';

const user = {
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
      username: 'Max',
      userAvatar: 'https://www.oneindia.com/img/1200x80/2017/05/x05-1451993146-himalayas-mount-everest-latest-600-jpg-pagespeed-ic-dkoe-ed5xd1-22-1495457231.jpg',
      question: 'Are there any good hostels around??',
      likes:[],
      replies:[{
        username: 'John',
        userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
        answer: 'Yes, there are quite a few and are located in convenient places.',
        likes:[]
      }]
    },
    {
      comment_id: 'comment2',
      username: 'Lewis',
      userAvatar: 'http://miftyisbored.com/wp-content/uploads/2013/06/iron-man-mask-thumbnail.png',
      question: 'Does public transports go everywhere?',
      likes:[],
      replies:[{
        username: 'John',
        userAvatar: 'https://assets.mycast.io/characters/jerry-mouse-1236784-normal.jpg?1610584771',
        answer: 'Yes, around Barcelona public transports are enough',
        likes:[]
      }]
    }
    ] 
   }
  ]
}

function App() {
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/dashboard">
            { user ? <Dashboard user={user}/> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="*">
            <Pagenotfound />
          </Route>
        </Switch>
      </Router>  
    </>
  );
}

export default App;
