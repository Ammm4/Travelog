import React from 'react';
import styled from 'styled-components';

const PostWrapper = styled.article`
  margin: auto;
  margin-top: 6rem;
  border-radius: 10px;
  padding: 10px;
  width: 98%;
  max-width: 800px;
  background-color: #fff;
`
const PostTitle =  styled.h1`
  width: 100%;
  margin: 1rem auto;
  letter-spacing: 1px;
  border-bottom: 2px solid #ccc;
  max-width:300px;
  font-family: 'Montserrat Alternates', sans-serif;
  text-align: center;
`
const InfoGroup = styled.div`
  margin: 1.5rem auto 2rem auto;
  padding: 10px;
  width: 100%;
  max-width: 400px;
`
const Infos = styled.div`
 margin-bottom: 0.75rem;
`
const InfoLabel = styled.h5`
  display: block;
  margin-bottom: 0.5rem;
`
const InputsGroupHeading = styled.h4`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.35rem;
  margin-bottom: 1.5rem;
`

//============== Images =============== //
const ImagePreview = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns:1fr 1fr;
  grid-column-gap: 2px;
`
const ImagePreviewImg = styled.div`
  position: relative; 
  width: 100%;
  height: auto;
    img {
      width: 100%;
      height: 200px;
      object-fit:cover;
    }
     h5 {
      position: absolute;
      width:auto;
      max-width: 98%;
      top: 45%;
      word-break: break-all;
      text-align: center;
      border-radius: 5px;
      left: 1%;
      padding: 8px 5px;
      background-color: rgba(0,0,0,0.5);
      color:#fff;
      letter-spacing: 1px;  
    }
`
const BtnGroup = styled.div`
    width: 100%;
    max-width: 400px; 
    margin: auto;
`
const Button = styled.button`
  outline: none;
  border: none;
  background: #000;
  padding: 6px 10px;
  border-radius: 5px;
  margin-right:3px;
  color: #FFF;
  letter-spacing: 1px;
  &:hover{
    color:#ccc
  }
`
const Answer = styled.p`
  font-size: 0.9rem;
`

const List = styled.ul`
  padding-left: 1.75rem;
  li {
    font-size: 0.85rem;
  }
`
export default function PostConfirm(props) {
  const {
    imgPreview,
    travellerInfo,
    destinationInfo,
    recommendations,
    toggleForm,
    handleSubmit
  } = props;
  
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
               return <li key={index}>{item}</li>
            })
            }
          </List>
        </Infos>
        <Infos>
          <InfoLabel>Places to Visit</InfoLabel>
          <List>
            { 
              recommendations.places.map((item, index) => {
               return <li key={index}>{item}</li>
            })
            }
          </List>
        </Infos>
        <Infos>
          <InfoLabel>Things to Do</InfoLabel>
          <List>
            { 
             recommendations.todos.map((item, index) => {
              return <li key={index}>{item}</li>
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
