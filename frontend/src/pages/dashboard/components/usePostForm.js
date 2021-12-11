import React, {useState, useEffect, useRef} from 'react';

export default function usePostForm( setModal, postId ) {
  const [showPostForm, setShowPostForm] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [imgFiles, setImgFiles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  const [heritages, setHeritages] = useState(['']);
  const [places, setPlaces] = useState(['']);
  const [todos, setTodos] = useState(['']);
  const [basicInfo, setBasicInfo] = useState({destination: '', country: '', summary: '', people: '1', cost: '', days: '1 day', budget: '', others: ''})

  const imageInputRef = useRef();

   useEffect(() => {
   if(!postId || postId === 'create') return;
   const post = posts.find(post => post.id === postId);
   if(!post) return;
   setUpLoading(true);
   setImgFiles([...post.images.map(image => image.imgURL)]);
   setTitles([...post.images.map(image => image.imgName)]);
   setFinalImages([...post.images.map(image => image)]);
   setImgPreview([...post.images.map(image => image.imgURL)]);
   setHeritages(post.heritages);
   setPlaces(post.places);
   setTodos(post.todos);
   setBasicInfo({
     destination:post.destination,
     country: post.country,
     cost: post.cost,
     budget: post.budget,
     summary: post.description,
     people: post.numPeople,
     days: post.numDays,
     others: post.others
   })
   setUpLoading(false);
  },[postId])
  
  useEffect(() => {
   if(!imgFiles) return;
   //let imgUrls = imgFiles.map(img => URL.createObjectURL(img));
   let imgUrls = imgFiles.map(file => {
                   if((typeof file) !== 'string') return URL.createObjectURL(file)
                   return file
               });
   setImgPreview(imgUrls);
   setImgPreview(imgUrls);
  }, [imgFiles]);




 //=================== Images ===============//
  const imageUploader = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  }
  const handleTitle = (e,i) => {
    const newTitles = titles.map((title,index) => {
       if(index === i) return e.target.value
       return title
    })
    setTitles(newTitles);
  }
  const handleFileUpload = (e) => {
     let files = e.target.files;
     let extractedFiles = []
     for(let i = 0; i < files.length; i++) {
       extractedFiles.push(files[i]);
   } 
   if(!imgFiles) return setImgFiles(extractedFiles);
   setImgFiles([...imgFiles, ...extractedFiles]);
   setTitles([...titles, ...Array(extractedFiles.length).fill('')])
  }

  const removeImg = (i) => {
    let newFiles = imgFiles.filter(( img, index) => index !== i);
     setTitles([...titles.filter((title,index) => index !== i)])
     setFinalImages(finalImages.filter((img, index) => index !== i))
     setImgFiles(newFiles);
  }
  //=================== Images =================//

  //================= Array Inputs ================ //
  
  const addMoreInput = (e, inputName) => {
    e.preventDefault();
    if(inputName === 'heritage'){
      return setHeritages([...heritages,'']) 
    }
    if(inputName === 'place'){
      return setPlaces([...places,'']) 
    }
    if(inputName === 'todo'){
      return setTodos([...todos, '']) 
    }
  }
  const removeInput = (e, i, inputName) => {
    e.preventDefault(); 
    if(inputName === 'heritage') {
      if(heritages.length === 1) return setHeritages([''])
      let newInputs = heritages.filter((item, index) => index !== i)
      return setHeritages(newInputs)
    }
    if(inputName === 'place') {
      if(places.length === 1) return setPlaces([''])
      let newInputs = places.filter((item, index) => index !== i)
      return setPlaces(newInputs)
    }
    if(inputName === 'todo') {
      if(todos.length === 1) return setTodos([['']])
      let newInputs = todos.filter((item, index) => index !== i)
      return setTodos(newInputs)
    }
    
  }

  const handleChange = (e, i, inputName) => {
    if(inputName === 'heritage') {
      const newValues = heritages.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
      setHeritages(newValues);
    }
    if(inputName === 'place') {
      const newValues = places.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
      setPlaces(newValues);
    }
    if(inputName === 'todo') {
      const newValues = todos.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
      setTodos(newValues);
    }
    
  } 

  const toggleForm = (e, btnName) => { 
    e.preventDefault();
    if(btnName === 'create') {
      setShowPostForm(false);
      setShowReview(true);
      return
    }
    if(btnName === 'review') {
      setShowPostForm(true);
      setShowReview(false);
      return
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPostForm(false);
    setShowReview(false);
    setUpLoading(true);
  }
  
  const handlePostSubmit = ( e, result ) => {
    e.preventDefault();
    if(result === 'success') {
      return setModal(false)
    }
    if(result === 'error') {
      setShowReview(true);
      setUpLoading(false);
    }
  }
  
  return (
    { 
      imageInputRef,
      showPostForm,
      showReview, 
      upLoading,
      msg, 
      imgFiles,
      titles, 
      imgPreview, 
      heritages, 
      places, 
      todos,
      basicInfo, setBasicInfo,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
      handleSubmit, handlePostSubmit
    }
      
    
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