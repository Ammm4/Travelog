import React from 'react';
import styled, { css } from 'styled-components';

import { ErrorDisplay } from '../../signup/components/form';
//Icons
import { IoIosImages } from "react-icons/io";
import { MdClear } from "react-icons/md";

const commonBtnStyle = css`
  border: none;
  outline: none;
  background-color: transparent;
`
const Container = styled.form`
  margin: auto;
  margin-top: 6rem;
  border-radius: 10px;
  padding: 10px;
  width: 98%;
  max-width: 800px;
  background-color: #fff;

  .form-group {
    margin: 1.5rem auto 2rem auto;
    padding: 10px;
    width: 100%;
    max-width: 435px;
    label {
      font-size: 0.9rem;
      margin-bottom: 0.6rem;
    }
  }
  .done-btn {
    margin: -2rem auto 2rem auto;
    padding: 10px;
    width: 100%;
    max-width: 400px;
  }
  .form-group-input {
    margin-bottom: 0.75rem;
    label {
      display: block;
    }
    
    input {
      width: 100%;
      outline: none;
      border: 1px solid #eee;
      padding: 10px 16px;
      border-radius: 10px;
      letter-spacing: 1px;
    }

    #summary, #others, #transportations {
      resize: none;
      width: 100%;
      height: 150px;
      border: 1px solid #eee;
      padding: 10px 16px;
      border-radius: 14px;
      font-family: inherit;
    }
    select {
      padding: 10px 16px;
      border-radius: 25px;
      cursor:pointer;
    }
    
  }
`
export const PostTitle = styled.h1`
  width: 100%;
  margin: 1rem auto;
  letter-spacing: 1px;
  border-bottom: 2px solid #ccc;
  max-width:300px;
  font-family: 'Montserrat Alternates', sans-serif;
  text-align: center;
`
const BtnImg = styled.button`
  ${commonBtnStyle} 
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  * {
    margin-right: 5px;
    font-size: 2.5rem;
  }
`

const InputsGroupHeading = styled.h4`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.35rem;
  margin-bottom: 1.5rem;
`
const ImagePreview = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns:1fr 1fr;
 grid-column-gap: 2px;
`
const ImagePreviewImg = styled.div`
  position: relative; 
  width: 100%;
  img {
    width: 100%;
    height: 200px;
    object-fit:cover;
  }
  .remove-img {
      position: absolute;
      top: 5px; right: 5px;
      font-size: 1.5rem;
      color: #1e1e1e;
      cursor: pointer;
  }
  h5 {
      position: absolute;
      width:auto;
      max-width: 98%;
      text-align:center;
      top: 45%;
      word-break: break-all;
      border-radius: 5px;
      left: 1%;
      padding: 8px 5px;
      background-color: rgba(0,0,0,0.5);
      color:#fff;
      letter-spacing: 1px;
  }
  label {
      font-weight: 600;
      padding: 8px;
  }
  textarea {
      display: inline-block;
      margin-top:0.5rem;
      width: 100%;
      height: 44px;
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      border: 2px solid #ccc;
      border-radius: 5px;
      padding: 8px;
      resize: none;
  }
`
const ArrayOfInputs = styled.div`
  margin: 0.75rem auto;
`
const InputElement = styled.div`
  margin: 0.5rem auto;
  button {
    ${commonBtnStyle}
    color: #df5f67;
    text-decoration: underline;
    &:hover {
      color: red;
    }
  } 
`
const BtnAdd = styled.button`
${commonBtnStyle}
font-size: 0.75rem;
padding: 6px 8px;
border-radius: 5px;
background-color: #000;
color: #fff;
`


export default function PostForm(props) {
  const {
         errors,
         destinationInfo,
         handleDestinationInfo,
         travellerInfo,
         handleTravellerInfo,
         recommendations,
         handleRecommendations,
         imageInputRef,
         imageUploader, 
         imgPreview,
         handleFileUpload,
         removeImg,
         removeInput,
         handleChange,
         addMoreInput,
         toggleForm,
         handleTitle
  } = props;
  
  const handleKeyUp = (e) => {
    e.target.style.height = '48px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  
  return (
    <Container>
        <PostTitle>
          { props.modalName }
        </PostTitle>
        <div className="form-group">
          <InputsGroupHeading>Destination Info: </InputsGroupHeading>
          <div className="form-group-input">
            <label htmlFor="destination">Name of Place</label>
            <input 
              id="destination" 
              name="destination" 
              type="text"
              value = { destinationInfo.destination }
              onChange = {(e) => handleDestinationInfo(e) }
              placeholder="Barcelona, Venice, Porto..."
              />
            { errors && errors.destination && <ErrorDisplay>{ errors.destination }</ErrorDisplay> }
          </div>
          <div className="form-group-input">
            <label htmlFor="country">Country</label>
            <input 
              id="country" 
              name="country" 
              type="text"
              value = { destinationInfo.country }
              onChange = {(e) => handleDestinationInfo(e) }
              placeholder="Italy, Greece, France..."
              required
              />
             { errors && errors.country && <ErrorDisplay>{ errors.country }</ErrorDisplay> }
          </div>
          <div className="form-group-input">
            <label htmlFor="summary">Summary</label>
            <textarea 
              id="summary"
              name="summary"
              value = { destinationInfo.summary }
              onChange = {(e) => handleDestinationInfo(e) }
            />
            { errors && errors.summary && <ErrorDisplay>{ errors.summary }</ErrorDisplay> }
          </div>
          <div className="form-group-input">
            <BtnImg htmlFor="images" onClick={ imageUploader }><IoIosImages /> 
              { imgPreview.length > 0 ? 'Add More Images' : 'Upload Images' }
            </BtnImg>
            <input 
              id="images" 
              name="images" 
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              ref={imageInputRef}
              onChange={(e) => handleFileUpload(e)}
            />
            { errors && errors.images && <ErrorDisplay>{ errors.images }</ErrorDisplay> }
          </div>
          { imgPreview.length > 0 && 
           <> 
              <label>Images({ imgPreview.length })</label>
              <ImagePreview>
                { imgPreview.map((img, index) => {
                  return  <ImagePreviewImg key={ img.name || index }>  
                            <img src={ img.imgFile } alt={img.imgTitle}/>
                            <span className="remove-img" onClick={ () => removeImg(index) }><MdClear/></span>
                            { img.imgTitle  && <h5>{img.imgTitle}</h5> }
                            <label>Add a Title</label>
                            <textarea
                                 type="text"
                                 value={img.imgTitle}
                                 maxLength="50" 
                                 placeholder="Add a Title..."
                                 onChange={(e) => handleTitle(e,index)}
                                 onKeyUp={(e) => handleKeyUp(e) }
                             />
                          </ImagePreviewImg>
                })
                }
              </ImagePreview>
            </>
          }
        </div>
        
        <div className="form-group">
          <InputsGroupHeading>Traveller's Info: </InputsGroupHeading>
          <div className="form-group-input">
            <label htmlFor="numOfPeople">Number of Travellers</label>
            <select id="numOfPeople" 
               name="numOfPeople"
               value={ travellerInfo.numOfPeople }
               onChange = {(e) => handleTravellerInfo(e) }
               >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div className="form-group-input">
            <label htmlFor="cost">Costs- <b>£/person</b></label>
            <input 
              id="cost" 
              name="cost" 
              type="number"
              value={ travellerInfo.cost }
              onChange = {(e) => handleTravellerInfo(e) }
              />
            { errors && errors.costs && <ErrorDisplay>{ errors.costs }</ErrorDisplay> }
          </div>
        </div>

        <div className="form-group">
          <InputsGroupHeading>Recommendations: </InputsGroupHeading>
          <div className="form-group-input">
            <label htmlFor="numOfDays">Number of Days To Spent</label>
            <select id="numOfDays" name="numOfDays" value = { recommendations.numOfDays } 
              onChange = {(e) => handleRecommendations(e) }>
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="4 days">4 days</option>
              <option value="5 days">5 days</option>
              <option value="6 days">6 days</option>
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="4 weeks">4 weeks</option>
            </select>
          </div>
          <div className="form-group-input">
            <label htmlFor="budget">Budget- <b>£ / person</b></label>
            <input 
              id="budget" 
              name="budget" 
              type="number"
              value={ recommendations.budget }
              onChange = {(e) => handleRecommendations(e) }
              />
            { errors && errors.budget && <ErrorDisplay>{ errors.budget }</ErrorDisplay> }
          </div>
          <div className="form-group-input">
            <label> Heritages To Visit</label>
            <ArrayOfInputs>
              { 
               recommendations.heritages.map((item, index) => {
                 return <InputElement key={index} >
                         <input 
                          name="heritage" 
                          type="text"
                          value={ item }
                          onChange={ (e) => handleChange( e, index, 'heritage') }
                          placeholder="Athens, Stonehenge..."
                         />
                        { item.trim() && <button onClick={ (e) => removeInput( e, index, 'heritage' ) }>Remove</button>}
                      </InputElement>
                })
              }
            </ArrayOfInputs>
             { errors && errors.heritages && <ErrorDisplay>{ errors.heritages }</ErrorDisplay> }
            <BtnAdd onClick={(e) => addMoreInput(e, 'heritage')}>Add More</BtnAdd>
          </div>
          <div className="form-group-input">
            <label> Places To See</label>
            <ArrayOfInputs>
              { 
                recommendations.places.map((item, index) => {
                  return <InputElement key={index} >
                         <input 
                          name="place" 
                          type="text"
                          value={ item }
                          onChange={ (e) => handleChange( e, index, 'place') }
                          placeholder="Toledo, Venice ..."
                         />
                        { item.trim() && <button onClick={ (e) => removeInput( e, index, 'place' ) }>Remove</button>}
                      </InputElement>
                })
              }
            </ArrayOfInputs>
            { errors && errors.places && <ErrorDisplay>{ errors.places }</ErrorDisplay> }
            <BtnAdd onClick={(e) => addMoreInput(e, 'place')}>Add More</BtnAdd>    
          </div>
          <div className="form-group-input">
            <label>Things To do </label>
            <ArrayOfInputs>
              { 
                recommendations.todos.map((item, index) => {
                return <InputElement key={index} >
                         <input 
                          name="todo" 
                          type="text"
                          value={ item }
                          onChange={ (e) => handleChange( e, index, 'todo') }
                          placeholder="Surfing, Bus Tour..."
                         />
                        { item.trim() && <button onClick={ (e) => removeInput( e, index, 'todo' ) }>Remove</button>}
                      </InputElement>
                })
              }
            </ArrayOfInputs>
            { errors && errors.todos && <ErrorDisplay>{ errors.todos }</ErrorDisplay> }
            <BtnAdd onClick={(e) => addMoreInput(e,'todo')}>Add More</BtnAdd>
          </div>
        </div>

        <div className="form-group">
          <InputsGroupHeading>Others: </InputsGroupHeading>   
          <div className="form-group-input">
            <label htmlFor="others">Access to community, ease of transportation, safety..</label>
            <textarea 
              id="others" 
              name="others" 
              value={ recommendations.others }
              onChange = {(e) => handleRecommendations(e) }
              />
          </div>
        </div>

      <div className="done-btn">
        <BtnAdd onClick={(e) => toggleForm(e, 'create')}>Done</BtnAdd>
      </div>
      </Container>
  )
}
