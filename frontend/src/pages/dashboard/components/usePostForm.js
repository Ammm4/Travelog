import {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePost } from '../../../redux/posts/postActions';
import { addPost } from '../../../redux/posts/postActions';

export default function usePostForm( setModal, postId ) {
  const {singlepost: post} = useSelector(state => state.SinglePost);
  const [showPostForm, setShowPostForm] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [deletedImageIDs, setDeletedImageIDs] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
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
   if(!Object.keys(post).length || postId === 'create') return;
   setUpLoading(true);
   setImages([...post.images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName}))])
   setImgPreview([...post.images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName}))]);
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
  },[post, postId]);

 
 

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
  const saveEdit = (e) => {
    e.preventDefault();
    setShowPostForm(false);
    setShowReview(false);
    //setUpLoading(true);
    let newPostData = {
      travellerInfo,
      recommendations,
      destinationInfo,
      images,
      deletedImageIDs
    }
    
    //dispatch(editPost(postData));
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
    //setUpLoading(true);
    let postData = {
      travellerInfo,
      recommendations,
      destinationInfo,
      images
    }
    dispatch(addPost(postData));
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
      images,
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

