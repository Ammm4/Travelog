import React, { useRef } from 'react';
import { useReduxSelector, useReduxDispatch, checkFormErrors } from '../../../../utils';
import { editPostInfo, setShowForm } from '../../../../redux/globals/globalActions';
import { PostFormWrapper } from '../GlobalComponents/StyledComponents/Containers';
import { PostTitle } from '../GlobalComponents/StyledComponents/Headings';
import { BtnAdd } from '../GlobalComponents/StyledComponents/Buttons';
//Icons 

import DestinationInputForm from './destinationForm';
import PostImgInput from './postImgInput';
import TravellerForm from './travellerForm';
import RecommendationsInputForm from './recommendationsForm';

export default function PostForm() {
  const { Globals : { showModal: { action }, postInfo } }= useReduxSelector();
  const errorRef = useRef();
  const dispatch = useReduxDispatch();
  const handleDone = (e) => {
    e.preventDefault();
    let err = checkFormErrors(postInfo);
    new Promise((resolve) => resolve(dispatch(editPostInfo('errors', null)))).then(() => {
      if(Object.keys(err).length !== 0) {
      return dispatch(editPostInfo('errors', err));
      }
      return dispatch(setShowForm('showPostForm',false)); 
    })
  }
  
  return (
    <PostFormWrapper>
      <PostTitle> { action } </PostTitle>
      <DestinationInputForm errorRef={errorRef}/>
      <PostImgInput />
      <TravellerForm errorRef={errorRef}/>
      <RecommendationsInputForm />
      <div className="form-group" style={{marginTop:'0'}}>
        <BtnAdd onClick={(e) => handleDone(e)}>Done</BtnAdd>
      </div>
    </PostFormWrapper>
  )
}


