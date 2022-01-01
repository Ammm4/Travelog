import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePost } from '../../../redux/posts/postActions';

export default function usePostForm( setModal, postId ) {
  const {singlepost: post} = useSelector(state => state.SinglePost)
  const [showPostForm, setShowPostForm] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [imgFiles, setImgFiles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  const [destinationInfo, setDestinationInfo] = useState({ destination: '', country: '', summary: ''  });
  const [travellerInfo, setTravellerInfo] = useState({ numOfPeople: '1', cost:'' });
  const [recommendations, setRecommendations] = useState({ numOfDays: '1 day', budget: '', heritages:[''], places:[''], todos:[''], others:'' });
  const imageInputRef = useRef();
  const dispatch = useDispatch();

   useEffect (() => {
    if(!postId || postId === 'create') return;
    dispatch(getSinglePost(postId));
   },[dispatch, postId])
   
   useEffect(() => {
   if(!post) return;
   setUpLoading(true);
   setImgFiles([...post.images.map(image => image.imgURL)]);
   setTitles([...post.images.map(image => image.imgName)]);
   setFinalImages([...post.images.map(image => image)]);
   setImgPreview([...post.images.map(image => image.imgURL)]);
   setDestinationInfo({ 
     destination: post.destinationInfo.destination, 
     country: post.destinationInfo.country, 
     summary: post.destinationInfo.summary})
   setTravellerInfo({ 
     numOfPeople: post.travellerInfo.numOfPeople, 
     cost: post.travellerInfo.cost})
   setRecommendations({
     numOfDays:post.recommendations.days, 
     budget: post.recommendations.budget, 
     heritages: post.recommendations.heritages, 
     places: post.recommendations.places, 
     todos: post.recommendations.todos, 
     others: post.recommendations.others});
   setUpLoading(false);
  },[post]);

 
  
  useEffect(() => {
   if(!imgFiles) return;
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
      return setRecommendations({...recommendations, heritages: [...recommendations.heritages,'']})
    }
    
    if(inputName === 'place'){
      return setRecommendations({...recommendations, places: [...recommendations.places,'']})
    }

    if(inputName === 'todo'){
      return setRecommendations({...recommendations, todos: [...recommendations.todos,'']})
    }
  }
  const removeInput = (e, i, inputName) => {
    e.preventDefault(); 
    if(inputName === 'heritage') {
      if(recommendations.heritages.length === 1) return setRecommendations({...recommendations, heritages: ['']})
      let newInputs = recommendations.heritages.filter((item, index) => index !== i)
      return setRecommendations({...recommendations, heritages: newInputs}) 
    }

    if(inputName === 'place') {
      if(recommendations.places.length === 1) return setRecommendations({...recommendations, places: ['']})
      let newInputs = recommendations.places.filter((item, index) => index !== i)
      return  setRecommendations({...recommendations, places: newInputs})  
    }

    if(inputName === 'todo') {
      if(recommendations.todos.length === 1) return setRecommendations({...recommendations, todos: ['']})
      let newInputs = recommendations.todos.filter((item, index) => index !== i)
      return  setRecommendations({...recommendations, todos: newInputs})  
    }  
  }

  const handleChange = (e, i, inputName) => {
    if(inputName === 'heritage') {
      const newValues = recommendations.heritages.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
      return setRecommendations({...recommendations, heritages: newValues});
     
    }

    if(inputName === 'place') {
      const newValues = recommendations.places.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
      return setRecommendations({...recommendations, places: newValues});
    }

    if(inputName === 'todo') {
      const newValues = recommendations.todos.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
      return setRecommendations({...recommendations, todos: newValues}); 
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
      destinationInfo, setDestinationInfo,
      travellerInfo, setTravellerInfo,
      recommendations, setRecommendations,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
      handleSubmit, handlePostSubmit
    }
  )
}

