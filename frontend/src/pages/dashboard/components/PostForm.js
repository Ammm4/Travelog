import React from 'react';
import { useReduxSelector, useReduxDispatch, checkFormErrors } from '../../../utils';
import { setPostDetails, setShowPostForm, setCreatePostErrors } from '../../../redux/globals/globalActions';
import { PostFormWrapper } from './GlobalComponents/StyledComponents/Containers';
import { PostTitle } from './GlobalComponents/StyledComponents/Headings';
import { BtnAdd } from './GlobalComponents/StyledComponents/Buttons';

//Icons CgAsterisk
import Loading from "./Loading";
import DestinationInputForm from './postForm/destinationForm';
import PostImgInput from './postForm/postImgInput';
import TravellerForm from './postForm/travellerForm';
import RecommendationsInputForm from './postForm/recommendationsForm';


export default function PostForm() {
  const { Globals : { showModal: { action }, postInfo, postInfo: { errors } } } = useReduxSelector();
  const dispatch = useReduxDispatch();
  
  const handleDone = (e, btnName) => {
    e.preventDefault();
    if(btnName === 'create') {
      dispatch(setCreatePostErrors(null))
      let err = checkFormErrors(postInfo);
      if(Object.keys(err).length !== 0) {
        return dispatch(setCreatePostErrors(err));
      }
      dispatch(setShowPostForm(false));
      return
    }
    if(btnName === 'review') return  dispatch(setShowPostForm(true));
  }
  
  return (
    <PostFormWrapper>
      <PostTitle> { action } </PostTitle>
      <DestinationInputForm />
      <PostImgInput />
      <TravellerForm />
      <RecommendationsInputForm />
      <div className="form-group" style={{marginTop:'0'}}>
        <BtnAdd onClick={(e) => handleDone(e, 'create')}>Done</BtnAdd>
      </div>
    </PostFormWrapper>
  )
}


