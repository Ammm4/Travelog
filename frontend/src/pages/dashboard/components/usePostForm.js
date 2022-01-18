import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePost, addPost, editPost, deletePost } from '../../../redux/posts/postActions';

export default function usePostForm(postId, action) {
  const {loading: postLoading, singlepost: post, error: singlePostError} = useSelector(state => state.SinglePost);
  const { postLoading: postEditing, success } = useSelector(state => state.Post);
  const [msg, setMsg] = useState(null);
  const [errors, setErrors ] = useState(null)
  const [showPostForm, setShowPostForm] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [images, setImages] = useState([]);
  const [deletedImageIDs, setDeletedImageIDs] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [destinationInfo, setDestinationInfo] = useState({ destination: '', country: '', summary: '', ratings: 2.5 });
  const [travellerInfo, setTravellerInfo] = useState({ numOfPeople: '1', cost:'' });
  const [recommendations, setRecommendations] = useState({ numOfDays: '1 day', budget: '', heritages:[''], places:[''], todos:[''], others:'' });
  const imageInputRef = useRef();
  const reviewRef = useRef();
  const dispatch = useDispatch();

  useEffect (() => {
    if(!postId) return;
    dispatch(getSinglePost(postId));
   },[dispatch, postId])
   
  useEffect(() => {
   if(!Object.keys(post).length || action === 'Create Post') return;
   setImages([...post.images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName}))])
   setImgPreview([...post.images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName}))]);
   setDestinationInfo({
     destination: post.destinationInfo.destination, 
     country: post.destinationInfo.country, 
     summary: post.destinationInfo.summary,
     ratings: post.destinationInfo.ratings
    })
   setTravellerInfo({
     numOfPeople: post.travellerInfo.numOfPeople, 
     cost: post.travellerInfo.cost
    })
   setRecommendations({
     numOfDays:post.recommendations.numOfDays, 
     budget: post.recommendations.budget, 
     heritages: post.recommendations.heritages, 
     places: post.recommendations.places, 
     todos: post.recommendations.todos, 
     others: post.recommendations.others});
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

  const handleEditPost = (e) => {
    e.preventDefault();
    setMsg("Editing Post");
    reviewRef.current.scrollIntoView();
    let newPostData = {
      travellerInfo,
      recommendations,
      destinationInfo,
      images,
      deletedImageIDs
    }
    dispatch(editPost(postId, newPostData));
  }

  const handleDeletePost = (e) =>{
    e.preventDefault();
    setMsg('Deleting Post');
    const imagesToDelete = images.map(img => img.public_id);
    dispatch(deletePost(postId, { payload: imagesToDelete }))
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
    reviewRef.current.scrollIntoView();
    let postData = {
      travellerInfo,
      recommendations,
      destinationInfo,
      images
    }
    
    if(btnName === 'create') {
      let err = checkFormErrors(postData);
      if(Object.keys(err).length !== 0) {
      return setErrors(err);
      }
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
    setMsg("Creating Post");
    reviewRef.current.scrollIntoView();
    let postData = {
      travellerInfo,
      recommendations,
      destinationInfo,
      images
    }
    let err = checkFormErrors(postData);
    if(Object.keys(err).length !== 0) {
      setErrors(err);
    } else {
      dispatch(addPost(postData));
    }
  }
  

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
      msg,
      imageInputRef,
      reviewRef,
      showPostForm,
      showReview, 
      images,
      imgPreview,
      errors,
      destinationInfo, handleDestinationInfo,
      setDestinationInfo,
      travellerInfo, handleTravellerInfo,
      recommendations, handleRecommendations,
      imageUploader, handleFileUpload,
      handleTitle, removeImg,
      addMoreInput, removeInput,
      handleChange, toggleForm,
      handleSubmit, 
      handleEditPost,
      handleDeletePost
    }
  )
}

const checkFormErrors = (data) => {
const error = {};
 const { destinationInfo, travellerInfo, recommendations, images } = data;

 if(destinationInfo.destination.trim() === "") {
   error.destination = "Please enter the Destination"
 } else if(destinationInfo.destination.trim().length > 20) {
   error.destination = "Destination must be lesser than 20 characters"
 }
 
 if(destinationInfo.country.trim() === "") {
   error.country = "Please enter the Destination"
 } else if(destinationInfo.country.trim().length > 20) {
   error.country = "Country must be lesser than 20 characters"
 } 

 if(destinationInfo.summary.trim() === "") {
   error.summary = "Please Add a Summary"
 } else if(destinationInfo.country.trim().length > 300) {
   error.summary = "Summary must be lesser than 300 characters"
 } 

 if(images.length < 1) {
   error.images="Please Add an Image"
 }
 if(!travellerInfo.cost) {
   error.costs ="Please Add Costs"
 }

 if(!recommendations.budget) {
   error.budget="Please Add Budget"
 }
 if(recommendations.places.some(place => place.trim() === "")) {
   error.places="Please Add Place/s"
 }

 if(recommendations.heritages.some(heritage => heritage.trim() === "")) {
   error.heritages="Please Add Heritage/s"
 }

 if(recommendations.todos.some(todo => todo.trim() === "")) {
   error.todos="Please Add Heritage/s"
 }

 return error;
}