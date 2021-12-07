import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';


import PostForm from './PostForm';
import PostConfirm from './PostConfirm';
import Loading from './Loading';

import { MdClear } from "react-icons/md";


const Container = styled.div`
 position: fixed;
 top:0; left:0;
 z-index: 2222;
 width: 100%;
 height: 100%;
 overflow: auto;
 background-color: rgba(0,0,0, 0.85);
 span {
   position: absolute;
   right:1rem;
   top: 1rem;
   font-size: 2.5rem;
   color: #fff;
 }
`

export default function PostModal({ setModal }) {
  const [showPostForm, setShowPostForm] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [imgFiles, setImgFiles] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [heritages, setHeritages] = useState([ { heritage : '' } ]);
  const [places, setPlaces] = useState([ { place : '' } ]);
  const [todos, setTodos] = useState([ { todo : '' } ]);
  const [basicInfo, setBasicInfo] = useState({destination: '', country: '', summary: '', people: '1', cost: '', days: '1 day', budget: '', others: ''})

  const imageInputRef = useRef();

  useEffect(() => {
   if(!imgFiles) return;
   let imgUrls = imgFiles.map(img => URL.createObjectURL(img));
   setImgPreview(imgUrls);
  }, [imgFiles]);

 //=================== Images ===============//
  const imageUploader = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  }

  const handleFileUpload = (e) => {
     let files = e.target.files;
     let extractedFiles = []
     for(let i = 0; i < files.length; i++) {
       extractedFiles.push(files[i]);
   }
     setImgFiles(extractedFiles);
  }
  const removeImg = (i) => {
    let newFiles = imgFiles.filter(( img, index) => index !== i);
    setImgFiles(newFiles);
  }
  //=================== Images =================//

  //================= Array Inputs ================ //
  
  const addMoreInput = (e, inputName) => {
    e.preventDefault();
    if(inputName === 'heritage'){
      return setHeritages([...heritages, { heritage : '' }]) 
    }
    if(inputName === 'place'){
      return setPlaces([...places, { place : '' }]) 
    }
    if(inputName === 'todo'){
      return setTodos([...todos, { todo : '' }]) 
    }
  }
  const removeInput = (e, i, inputName) => {
    e.preventDefault(); 
    if(inputName === 'heritage') {
      if(heritages.length === 1) return setHeritages([{ heritage : '' }])
      let newInputs = heritages.filter((item, index) => index !== i)
      return setHeritages(newInputs)
    }
    if(inputName === 'place') {
      if(places.length === 1) return setPlaces([{ place : '' }])
      let newInputs = places.filter((item, index) => index !== i)
      return setPlaces(newInputs)
    }
    if(inputName === 'todo') {
      if(todos.length === 1) return setTodos([{ todo : '' }])
      let newInputs = todos.filter((item, index) => index !== i)
      return setTodos(newInputs)
    }
    
  }

  const handleChange = (e, i, inputName) => {
    if(inputName === 'heritage') {
      const newValues = heritages.map((item, index) => {
        if(index === i) return {...item, [e.target.name] : e.target.value}
        return item
      })
      setHeritages(newValues);
    }
    if(inputName === 'place') {
      const newValues = places.map((item, index) => {
        if(index === i) return {...item, [e.target.name] : e.target.value}
        return item
      })
      setPlaces(newValues);
    }
    if(inputName === 'todo') {
      const newValues = todos.map((item, index) => {
        if(index === i) return {...item, [e.target.name] : e.target.value}
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
    <Container>
      <span onClick={ () => setModal(false) }><MdClear /></span>

     { showPostForm && <PostForm 
         basicInfo={basicInfo}
         setBasicInfo={setBasicInfo}
         imageInputRef={imageInputRef}
         imageUploader={imageUploader} 
         imgPreview={imgPreview}
         handleFileUpload={handleFileUpload}
         removeImg={removeImg}
         heritages={heritages}
         places={places}
         todos={todos}
         removeInput={removeInput}
         handleChange={handleChange}
         addMoreInput={addMoreInput}
         toggleForm={toggleForm}
      />}

      { showReview && <PostConfirm 
         basicInfo={basicInfo}     
         imgPreview={imgPreview}        
         heritages={heritages}
         places={places}
         todos={todos}
         toggleForm={toggleForm}
         handleSubmit={handleSubmit}
      /> }

      { upLoading && <Loading msg={msg} handlePostSubmit={ handlePostSubmit }/>}

    </Container>
  )
}
