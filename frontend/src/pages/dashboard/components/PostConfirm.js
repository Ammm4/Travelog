import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, editPost } from '../../../redux/posts/postActions';
import { setLoadingMessage } from '../../../redux/globals/globalActions';
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

  const { singlepost:{ post_id }} = useSelector(state => state.SinglePost)
  const submitType = action.split(' ')[0];
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    if(submitType === 'create') {
      e.preventDefault();
      dispatch(setLoadingMessage('Creating Post'))
      window.scrollTo(0,0);
      let postData = {
      travellerInfo,
      recommendations,
      destinationInfo,
      images
      }
      dispatch(addPost(postData))
    }
    if(submitType === 'edit') {
      e.preventDefault();
      dispatch(setLoadingMessage('Editing Post'))
      window.scrollTo(0,0);
      let newPostData = {
      travellerInfo,
      recommendations,
      destinationInfo,
      images,
      deletedImageIDs
    }
    dispatch(editPost(post_id, newPostData));
    }
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
          { imgPreview && imgPreview.map((img, index) => {
            return  <ImagePreviewImg key={ index }>
                      <img src={ img.imgFile } alt={ img.imgTitle }/>
                      { img.imgTitle && <h5> { img.imgTitle }</h5> }
                    </ImagePreviewImg>
              })
          }
        </ImagePreview>
      </InfoGroup>
      <InfoGroup>
        <InputsGroupHeading>Traveller</InputsGroupHeading>
        <Infos>
          <InfoLabel>No. of People</InfoLabel>
          <Answer>{ travellerInfo.numOfPeople }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Cost- £/p</InfoLabel>
          <Answer>{ travellerInfo.cost }</Answer>
        </Infos>
      </InfoGroup>
      <InfoGroup>
        <InputsGroupHeading>Recommendations</InputsGroupHeading>
        <Infos>
          <InfoLabel>No. of Days</InfoLabel>
          <Answer>{ recommendations.numOfDays }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Budget- £/p</InfoLabel>
          <Answer>{ recommendations.budget }</Answer>
        </Infos>
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
      </InfoGroup>
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
