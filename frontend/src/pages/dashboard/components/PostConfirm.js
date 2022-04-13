import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, editPost } from '../../../redux/posts/postActions';
import { setShowModal ,setLoadingMessage } from '../../../redux/globals/globalActions';
import { Rating } from 'react-simple-star-rating';
import { 
  commonWrapper, 
  PostTitle, 
  InputsGroupHeading, 
  commonLabel, 
  ImagePreview,
  ImagePreviewImg,
  commonGroupWrapper,
  BtnAdd } from './PostForm';

const PostWrapper = styled.article`
  ${commonWrapper}
`

const InfoGroup = styled.div`
  ${commonGroupWrapper}
`
const Infos = styled.div`
 margin-bottom: 1.5rem;
`
const InfoLabel = styled.h5`
  ${commonLabel}
`

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
const Answer = styled.p`
  font-size: 1rem;
`

const List = styled.ul`
  padding-left: 1.75rem;
`
export default function PostConfirm({ toggleForm }) {
  const { 
    showModal: { action },
    postDetails: { images, 
      imgPreview, 
      travellerInfo, 
      destinationInfo, 
      recommendations, 
      deletedImageIDs }
   } = useSelector(state => state.Globals);

  const { singlepost: { _id } } = useSelector(state => state.SinglePost)
  const submitType = action.split(' ')[0];
  const dispatch = useDispatch();
  const { displayRecommendations, displayTravelDetails, requiredInfo } = infoRequiredToDisplay(travellerInfo,recommendations);
  
  const handleSubmit = (e) => {
    const newRecommendations  = { ...recommendations } ;
    let items = ['heritages','places','todos']
    //filtering Out Empty Array elements
    items.forEach(item => {
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
      e.preventDefault();
      dispatch(setLoadingMessage('Creating Post'))
      dispatch(addPost(postData))
    }
   
    if(submitType === 'edit') {  
      e.preventDefault();
      dispatch(setLoadingMessage('Editing Post'))
      postData.deletedImageIDs = deletedImageIDs
      dispatch(editPost(_id, postData));
    }
    dispatch(setShowModal(null))
  }
  return (
    <PostWrapper>
      <PostTitle>Review & Submit</PostTitle>
      <InfoGroup>
        <InputsGroupHeading>Destination</InputsGroupHeading>
        <Infos>
          <InfoLabel>Place</InfoLabel>
          <Answer>{ destinationInfo.destination }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Country</InfoLabel>
          <Answer>{ destinationInfo.country }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Summary</InfoLabel>
          <Answer>{ destinationInfo.summary }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Ratings</InfoLabel>      
            <Rating
              ratingValue={ destinationInfo.ratings }
              iconsCount={5}
              allowHalfIcon={true}
              size={15}
              readonly={true}
            />
        </Infos>
        <InfoLabel>Images({ imgPreview.length })</InfoLabel>
        <ImagePreview>
          { imgPreview.length < 1 && <ImagePreviewImg> <img src='https://res.cloudinary.com/ddocnijls/image/upload/v1649796037/postImages/no-image-available-icon-6_necjkv.png' alt="no photos"/></ImagePreviewImg> }
          { imgPreview && imgPreview.map((img, index) => {
            return  <ImagePreviewImg key={ index }>
                      <img src={ img.imgFile } alt={ img.imgTitle }/>
                      { img.imgTitle && <h5> { img.imgTitle }</h5> }
                    </ImagePreviewImg>
              })
          }
        </ImagePreview>
      </InfoGroup>
      {
         displayTravelDetails &&
         <InfoGroup>
           <InputsGroupHeading>Travel Details</InputsGroupHeading>
           {
           requiredInfo.includes('travelType') && 
             <Infos>
               <InfoLabel>Type of Travel</InfoLabel>
               <Answer>{ travellerInfo.travelType }</Answer>
             </Infos>
           }
           {
             requiredInfo.includes('time') &&
             <Infos>
             <InfoLabel>Length of Holiday</InfoLabel>
              <Answer>{ travellerInfo.time }</Answer>
             </Infos>
           }
           
        </InfoGroup>

      }
      { displayRecommendations && 
         <InfoGroup>
          <InputsGroupHeading>Recommendations</InputsGroupHeading>
          {
            requiredInfo.includes('days') &&
            <Infos>
              <InfoLabel>No. of Days</InfoLabel>
              {
                recommendations.numOfDays && <Answer>{ recommendations.numOfDays }</Answer>
              }
              {
                recommendations.daysSummary && <Answer>{ recommendations.daysSummary }</Answer>
              }
            </Infos>
          }
          {
            requiredInfo.includes('budget') &&
            <Infos>
              <InfoLabel>Budget- £/p</InfoLabel>
              {
                recommendations.budget && <Answer>{ recommendations.budget }</Answer>
              }
              {
                recommendations.budgetSummary && <Answer>{ recommendations.budgetSummary}</Answer>
              }
              
            </Infos>
          }
          {
            requiredInfo.includes('heritages') && 
            <Infos>
              <InfoLabel>Heritages to See</InfoLabel>
              <List>
              { 
                recommendations.heritages.map((item, index) => {
                return <li key={index}><Answer>{item}</Answer></li>
               })
             }
              </List>
            </Infos>
          }
          {
            requiredInfo.includes('places') && 
            <Infos>
              <InfoLabel>Places to Visit</InfoLabel>
              <List>
              { 
                recommendations.places.map((item, index) => {
                 return <li key={index}><Answer>{item}</Answer></li>
               })
              }
             </List>
            </Infos>  
          }
          {
            requiredInfo.includes('todos') &&
            <Infos>
          <InfoLabel>Things to Do</InfoLabel>
            <List>
            { 
             recommendations.todos.map((item, index) => {
              return <li key={index}><Answer>{item}</Answer></li>
            })
            }
          </List>
          </Infos>
          }      
      </InfoGroup>
      
      }
      
      { 
        recommendations.others && 
        <InfoGroup>
          <InputsGroupHeading>Others</InputsGroupHeading>
          <Infos>
            <InfoLabel>Transportations, Amneties, Safety, etc.</InfoLabel>
            <Answer>{ recommendations.others }</Answer>
          </Infos>
        </InfoGroup>
      }
      <BtnGroup>
        <Button onClick={(e) => toggleForm(e, 'review')}>Edit</Button>
        <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
      </BtnGroup>
    </PostWrapper>
  )
}

const infoRequiredToDisplay = (info1, info2) =>{
  let requiredInfo = [];
  let displayRecommendations = false;
  let displayTravelDetails = false;
  const { travelType, time } = info1;
  if(travelType) {
    displayTravelDetails = true;
    requiredInfo.push('travelType')
  }
  if(time) {
    displayTravelDetails = true;
    requiredInfo.push('time')
  }
  const { numOfDays, 
    daysSummary, 
    budget,
    budgetSummary, 
    heritages, 
    places, 
    todos, 
    others } = info2;

if(( numOfDays !== '') || ( daysSummary.trim() !== '')) {
  displayRecommendations = true
  requiredInfo.push('days')
}
if ( (!isNaN(budget) && budget > 0 ) || (budgetSummary.trim() !== '')) {
  displayRecommendations = true
  requiredInfo.push('budget')
}
if (heritages.filter(item => item !== '' && item.trim() !== '').length > 0 ) {
  displayRecommendations = true
  requiredInfo.push('heritages')
}
if (places.filter(item => item !== '' && item.trim() !== '').length > 0  ) {
  displayRecommendations = true
  requiredInfo.push('places')
}
if (todos.filter(item => item !== '' && item.trim() !== '').length > 0  ) {
  displayRecommendations = true
  requiredInfo.push('todos')
}
if (others.trim() !== '') {
  displayRecommendations = true
  requiredInfo.push('others')
}
return { requiredInfo, displayRecommendations, displayTravelDetails }
}