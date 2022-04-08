import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';


export default function usePostForm() {
  const {showModal : { action }} = useSelector(state => state.Globals); 
  const {loading: postLoading, singlepost: post, error: singlePostError} = useSelector(state => state.SinglePost);
  const { postLoading: postEditing, success } = useSelector(state => state.Post);
  const [errors, setErrors ] = useState(null)
  const [showPostForm, setShowPostForm] = useState(true);
  const [images, setImages] = useState([]);
  const [deletedImageIDs, setDeletedImageIDs] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [destinationInfo, setDestinationInfo] = useState({ destination: '', country: '', summary: '', ratings: 0 });
  const [travellerInfo, setTravellerInfo] = useState({ travelType: '', time:'' });
  const [recommendations, setRecommendations] = useState({ numOfDays: '', daysSummary:'', budget: 0, budgetSummary:'', heritages:[''], places:[''], todos:[''], others:'' });
  const imageInputRef = useRef();

  
  useEffect(() => {
   if(!Object.keys(post).length > 0 || action === 'create post') return;
   const { images, destinationInfo, travellerInfo, recommendations} = post;
   setImages([...images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName}))])
   setImgPreview([...images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName}))]);
   setDestinationInfo({
     destination: destinationInfo.destination, 
     country: destinationInfo.country, 
     summary: destinationInfo.summary,
     ratings: destinationInfo.ratings
    })
   setTravellerInfo({
     travelType: travellerInfo.travelType, 
     time: travellerInfo.time
    })
   setRecommendations({
     ...recommendations,
     numOfDays:recommendations.numOfDays,
     daysSummary: recommendations.daysSummary,
     budget:recommendations.budget, 
     budgetSummary:recommendations.budgetSummary, 
     others:recommendations.others
    });

    let items = ['heritages','places','todos'];
    items.forEach(item => {
      if( recommendations[item].length > 0) {
      setRecommendations({...recommendations, [item]: recommendations[item] })
    }
    })
    
  },[post, action]);

   
 

 //=================== Images ===============//
  const imageUploader = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  }
  const handleTitle = (e,i) => {
    const newImages = images.map((image,index) => {
      if(index === i) return { ...image, imgTitle: e.target.value }
      return image
    })
    setImages(newImages);
    setImgPreview(newImages)
  }

  const handleFileUpload = (e) => {
   let files = Array.from(e.target.files);
   files.forEach(file => {
     var reader = new FileReader();
     reader.addEventListener("load", function () {
       let newImage = {
         imgFile: reader.result,
         imgTitle: ''
       }
       setImages(prev => [...prev, newImage ])
       setImgPreview(prev => [...prev, newImage ])
      }, false);
      reader.readAsDataURL(file);
    })
   }

  
  const removeImg = (i) => {
    let newImages = images.filter(( img, index) => index !== i);
    let deletedImage = images.find((img,index) => index === i);
    if (deletedImage.hasOwnProperty('public_id')) {
      setDeletedImageIDs(prev => [...prev, deletedImage.public_id]);
    }
    setImages(newImages);
    setImgPreview(newImages)
  }
  //======================== Images ========================================//

  //======================== Array Inputs ================================== //
  
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
    window.scrollTo(0,0);
    if(btnName === 'create') {
      let postData = {
        travellerInfo,
        recommendations,
        destinationInfo,
        images
     }
      setErrors(null);
      let err = checkFormErrors(postData);
      if(Object.keys(err).length !== 0) {
      return setErrors(err);
      }
      setShowPostForm(false);
      return
    }

    if(btnName === 'review') {
      setShowPostForm(true);
      return
    }   
  };

  
  const handleTravellerInfo = (e) => {
    setTravellerInfo({...travellerInfo, [e.target.name] : e.target.value})
  }
  
  const handleDestinationInfo = (e) => {
    setDestinationInfo({...destinationInfo, [e.target.name] : e.target.value})
  }

  const handleRecommendations = (e) => {
    setRecommendations({...recommendations, [e.target.name] : e.target.value})
  }
  
  return (
    { 
      postLoading,
      singlePostError,
      postEditing,
      success,
      imageInputRef,
      showPostForm,
      images,
      imgPreview,
      deletedImageIDs,
      errors,
      destinationInfo, handleDestinationInfo,
      setDestinationInfo,
      travellerInfo, handleTravellerInfo,
      recommendations, handleRecommendations,setRecommendations,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
    }
  )
}

const checkFormErrors = (data) => {
const error = {};
 const { destinationInfo, travellerInfo } = data;
 if(destinationInfo.destination.trim() === "") {
   error.destination = "Please enter the destination"
 } else if(destinationInfo.destination.trim().length > 20) {
   error.destination = "Destination must be lesser than 20 characters"
 }
 
 if(destinationInfo.country.trim() === "") {
   error.country = "Please enter the country"
 } else if(destinationInfo.country.trim().length > 20) {
   error.country = "Country must be lesser than 20 characters"
 } 

 if(destinationInfo.summary.trim() === "") {
   error.summary = "Please add a summary"
 } else if(destinationInfo.country.trim().length > 300) {
   error.summary = "Summary must be lesser than 300 characters"
 } 
 if(destinationInfo.ratings <= 0) {
   error.ratings = "Please rate your travel"
 } 
 if(!travellerInfo.travelType) {
   error.travelType ="Please add type of travel"
 }
 if(!travellerInfo.time) {
   error.time ="Please add length of travel time"
 }
 return error;
}


/* if(images.length < 1) {
   error.images="Please add an image"
 }
 if(!travellerInfo.cost) {
   error.costs ="Please add costs"
 }

 if(!recommendations.budget) {
   error.budget="Please add a budget"
 }
 if(recommendations.places.some(place => place.trim() === "")) {
   error.places="Please add a place"
 }

 if(recommendations.heritages.some(heritage => heritage.trim() === "")) {
   error.heritages="Please add a heritage"
 }

 if(recommendations.todos.some(todo => todo.trim() === "")) {
   error.todos="Please add a todo"
 } */