import React from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch, infoRequiredToDisplay} from '../../../utils';
import { addPost, editPost, editThePost } from '../../../redux/posts/postActions';
import { setShowModal ,setLoadingMessage, setShowPostForm } from '../../../redux/globals/globalActions';
import { PostConfirmWrapper } from './GlobalComponents/StyledComponents/Containers';
import { BtnAdd } from './GlobalComponents/StyledComponents/Buttons';
import { PostTitle } from './GlobalComponents/StyledComponents/Headings';
import DestinationInfo from './PostConfirm/destinationInfo';
import TravellerInfo from './PostConfirm/travellerInfo';
import Recommendations from './PostConfirm/recommendations';
import Images from './PostConfirm/images';
import { recommendationsFormArrays } from '../../../constants';


//============== Images =============== //
const BtnGroup = styled.div`
  width: 100%;
  max-width: 700px; 
  margin: 0 auto 2rem auto;
`
const Button = styled(BtnAdd)`
  margin-right:1rem;
  &:hover{
    color:#ccc
  }
`
export default function PostConfirm() {
  const { 
    Globals: { 
      showModal: { action, post, singlePost },
      postInfo: { 
        images, deletedImageIDs, travellerInfo, destinationInfo, recommendations }
      } 
  } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const submitType = action.split(' ')[0];
  const { displayRecommendations } = infoRequiredToDisplay(recommendations);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecommendations  = { ...recommendations } ;
    //filtering Out Empty Array elements
    recommendationsFormArrays.forEach(item => {
        let filteredData = newRecommendations[item].filter(item => (item !== '' && item.trim() !== ''));
          newRecommendations[item] = filteredData 
      })
    let postData = {
      travellerInfo,
      recommendations: newRecommendations,
      destinationInfo,
      images
      }
    if(submitType === 'create') {
      dispatch(setLoadingMessage('Creating Post'))
      dispatch(addPost(postData))
    }
    if(submitType === 'edit') { 
      dispatch(setLoadingMessage('Editing Post'));
      postData.deletedImageIDs = deletedImageIDs;
      if(singlePost) {
         dispatch(editThePost(post._id, postData));
      } else {
        dispatch(editPost(post._id, postData))
      }
        
    }
    dispatch(setShowModal(null))
  }
  return (
    <PostConfirmWrapper>
      <PostTitle>Review & Submit</PostTitle>
        <DestinationInfo />
        <Images />
        <TravellerInfo /> 
        { displayRecommendations && <Recommendations /> }
        <BtnGroup>
          <Button onClick={(e) => dispatch(setShowPostForm(true))}>Edit</Button>
          <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
        </BtnGroup>
    </PostConfirmWrapper>
  )
}

