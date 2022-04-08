import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { setPostDetails } from '../../../redux/globals/globalActions';
import { ErrorDisplay } from '../../signup/components/form';
import { Rating } from 'react-simple-star-rating';

//Icons CgAsterisk
import { IoIosImages } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { CgAsterisk } from "react-icons/cg";
import Loading from "./Loading";

const commonBtnStyle = css`
  border: none;
  outline: none;
  font-size: 1rem;
`
export const commonWrapper = css`
  margin: auto;
  margin-top: 6rem;
  border-radius: 6px;
  padding: 10px;
  width: 99%;
  max-width: 800px;
  background-color: #fff; 
`
export const commonLabel = css`
  display: block;
  color:#004684;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  letter-spacing: .5px;
`
export const commonGroupWrapper = css`
   margin: 1.5rem auto 2rem auto;
   padding: 10px;
   width: 100%;
  max-width: 700px;
`
export const commonInput = css`
  width: 100%;
  outline: none;
  border: 1px solid #ccc;
  padding: 16px 18px;
  border-radius: 2px;
  letter-spacing: 1px;
  font-size: 1rem;
  &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
  }
`

const Container = styled.form`
  ${commonWrapper}
  .form-group {
    ${commonGroupWrapper}
  }
  label {
      ${commonLabel}
    }
  
  .form-group-input {
    margin: 2.25rem 0;
    input {
     ${commonInput}
    }
    p {
      font-size: 0.95rem;
      margin: 0.85rem auto;
      font-style: italic; 
    }

    #summary, #others, #daysSummary, #budgetSummary{
      width: 100%;
      height: 150px;
      border: 1px solid #ccc;
      padding: 10px 16px;
      border-radius: 2px;
      font-size: 1rem;
      font-family: inherit;
      &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
      }
    }
    select {
      outline: none;
      padding: 16px 40px 16px 5px;
      border-radius: 2px;
      font-size: 1rem;
      cursor:pointer;
      &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
      }
    }
  }
`
export const PostTitle = styled.h1`
  width: 100%;
  margin: 3rem auto;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 1px;
  border-bottom: 2px solid #ccc;
  max-width:400px;
  font-family: 'Montserrat Alternates', sans-serif;
  text-align: center;
  color: #021b41;
  text-transform: capitalize;
`
const BtnImg = styled.button`
  ${commonBtnStyle} 
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  background-color: transparent;
  color:#021b41;
   &:hover {
    color: #2a78cd;
  }
`
export const InputsGroupHeading = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`
export const ImagePreview = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns:1fr 1fr;
  grid-column-gap: 2px;
`
export const ImagePreviewImg = styled.div`
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
      font-weight: 500;
      padding-top: 8px;
  }
  textarea {
      display: inline-block;
      width: 100%;
      height: 44px;
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 2px;
      padding: 8px;
      resize: none;
      &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
      }
  }
`
const ArrayOfInputs = styled.div`
  //margin: 0.75rem auto;
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
export const BtnAdd = styled.button`
 ${ commonBtnStyle }
 padding: 16px 40px;
 border-radius: 2px;
 background-color: #021b41;
 letter-spacing: .5px;
 color: #fff;
  &:hover {
 background-color: #2a78cd;
}
`

export default function PostForm(props) {
  const { loading } = useSelector(state => state.SinglePost);
  const {
         errors,
         destinationInfo,
         setDestinationInfo,
         handleDestinationInfo,
         travellerInfo,
         handleTravellerInfo,
         recommendations,
         handleRecommendations,
         images,
         imageInputRef,
         imageUploader, 
         imgPreview,
         deletedImageIDs,
         handleFileUpload,
         removeImg,
         removeInput,
         handleChange,
         addMoreInput,
         toggleForm,
         handleTitle
  } = props;
  const dispatch = useDispatch();

  const handleKeyUp = (e) => {
    e.target.style.height = '48px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleDone = (e) => {
    e.preventDefault();
    dispatch(setPostDetails({
      images,
      travellerInfo,
      recommendations,
      destinationInfo,
      imgPreview, 
      deletedImageIDs
    }))
    toggleForm(e,'create')
  }
  if(loading) {
    return <Loading msg="Post Loading" />
  }
  return (
    <Container>
        <PostTitle>
          { props.modalName }
        </PostTitle>
        <div className="form-group">
          <InputsGroupHeading>Destination Info: </InputsGroupHeading>
          <div className="form-group-input">
            <label htmlFor="destination">Name of Place<CgAsterisk style={{color:'#007bff'}}/></label>
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
            <label htmlFor="country">Country<CgAsterisk style={{color:'#007bff'}}/></label>
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
            <label htmlFor="summary">Summary<CgAsterisk style={{color:'#007bff'}}/></label>
            <textarea 
              id="summary"
              name="summary"
              value = { destinationInfo.summary }
              onChange = {(e) => handleDestinationInfo(e) }
            />
            { errors && errors.summary && <ErrorDisplay>{ errors.summary }</ErrorDisplay> }
          </div>
           <div>
            
           </div>
          <div className="form-group-input">
            <label htmlFor="ratings">Ratings<CgAsterisk style={{color:'#007bff'}}/> </label>
            <Rating
             ratingValue={ destinationInfo.ratings }
             iconsCount={5}
             fillColor='#2a78cd'
             allowHalfIcon={true}
             onClick={ newValue => setDestinationInfo({ ...destinationInfo, ratings: newValue }) }
            />
          { errors && errors.ratings && <ErrorDisplay>{ errors.ratings }</ErrorDisplay> }      
          </div>
          <div className="form-group-input">
            <BtnImg htmlFor="images" onClick={ imageUploader }><IoIosImages style={{fontSize: '2rem'}} /> 
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
                                 placeholder="Title/Name..."
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
          <InputsGroupHeading>Travel Details: </InputsGroupHeading>
          <div className="form-group-input">
            <label htmlFor="travelType">Type of Travel<CgAsterisk style={{color:'#007bff'}}/></label>
            <select id="travelType" 
               name="travelType"
               value={ travellerInfo.travelType }
               onChange = {(e) => handleTravellerInfo(e) }
               >
              <option value='' disabled>Select Type</option>
              <option value="Solo Travel">Solo Travel</option>
              <option value="Travel with Friends">Travel with Friends</option>
              <option value="Family Travel">Family Travel</option>
              <option value="Travel with Group">Travel with Group</option>
              <option value="Luxury Travel">Luxury Travel</option>
              <option value="Adventure Travel">Adventure Travel</option>
              <option value="Business Travel">Business Travel</option>          
            </select>
            { errors && errors.travelType && <ErrorDisplay>{ errors.travelType }</ErrorDisplay> }
          </div>
          <div className="form-group-input">
            <label htmlFor="time">Length of the Holiday<CgAsterisk style={{color:'#007bff'}} /></label>
            <select id="time" name="time" value = { travellerInfo.time } 
              onChange = {(e) => handleTravellerInfo(e) }>
              <option disabled>Select No. of Days</option>
              <option value=''>0</option>
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="4 days">4 days</option>
              <option value="5 days">5 days</option>
              <option value="6 days">6 days</option>
              <option value="1 week">1 week</option>
              <option value="8 days">8 days</option>
              <option value="9 days">9 days</option>
              <option value="10 days">10 days</option>
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="4 weeks">4 weeks</option>
            </select>
          { errors && errors.time && <ErrorDisplay>{ errors.time }</ErrorDisplay> }
          </div>
        </div>

        <div className="form-group">
          <InputsGroupHeading>Recommendations: </InputsGroupHeading>
          <div className="form-group-input">
            <label htmlFor="numOfDays">Number of Days To Spend</label>
            <select id="numOfDays" name="numOfDays" value = { recommendations.numOfDays } 
              onChange = {(e) => handleRecommendations(e) }>
              <option disabled>Select No. of Days </option>
              <option value=''>0</option>
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="4 days">4 days</option>
              <option value="5 days">5 days</option>
              <option value="6 days">6 days</option>
              <option value="1 week">1 week</option>
              <option value="8 days">8 days</option>
              <option value="9 days">9 days</option>
              <option value="10 days">10 days</option>
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="4 weeks">4 weeks</option>
            </select>
            <p> Description (Optional) </p>
            <textarea 
               id="daysSummary"
               name="daysSummary"
               value = { recommendations.daysSummary }
               disabled={ !recommendations.numOfDays }
               onChange = {(e) => handleDestinationInfo(e) }
              />      
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
              <p> Description (Optional) </p>
              <textarea 
               id="budgetSummary"
               name="budgetSummary"
               disabled={!recommendations.budget }
               value = { recommendations.budgetSummary }
               onChange = {(e) => handleDestinationInfo(e) }
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

        <div className="form-group" style={{marginBottom:'0'}}>
          <InputsGroupHeading>Others: </InputsGroupHeading>   
          <div className="form-group-input" style={{marginBottom:'0'}}>
            <label htmlFor="others">Access to community, ease of transportation, safety..</label>
            <textarea 
              id="others" 
              name="others" 
              value={ recommendations.others }
              onChange = {(e) => handleRecommendations(e) }
              />
          </div>
        </div> 
      <div className="form-group" style={{marginTop:'0'}}>
        <BtnAdd onClick={(e) => handleDone(e, 'create')}>Done</BtnAdd>
      </div>
      </Container>
  )
}
