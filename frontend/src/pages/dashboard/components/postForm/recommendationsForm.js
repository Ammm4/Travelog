import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { FormGroup, FormGroupInput, InputWrapper } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading } from '../GlobalComponents/StyledComponents/Headings';
import { TextArea,Select } from '../GlobalComponents/StyledComponents/Inputs';
import { BtnAdd, ClearInputBtn } from '../GlobalComponents/StyledComponents/Buttons';
import { InputElement, InputLabel } from '../GlobalComponents/StyledComponents/Inputs';

import { editPostInfo } from '../../../../redux/globals/globalActions';


export default function RecommendationsInputForm() {
  const { Globals: { postInfo: { recommendations }} } = useReduxSelector();
  const dispatch = useReduxDispatch()
  const handleRecommendations = (e) => {
    recommendations[e.target.name] = e.target.value;
    console.log(e.target.name)
    dispatch(editPostInfo('recommendations', recommendations))
  }
  const removeInput = (e, i, inputName) => {
    e.preventDefault(); 
    if(inputName === 'heritage') {
      if(recommendations.heritages.length === 1) return dispatch(editPostInfo('recommendations', {...recommendations, heritages: ['']} ))
      let newInputs = recommendations.heritages.filter((item, index) => index !== i)
      return dispatch(editPostInfo('recommendations', {...recommendations, heritages: newInputs}))
      
    }

    if(inputName === 'place') {
      if(recommendations.places.length === 1) return dispatch(editPostInfo('recommendations', {...recommendations, places: ['']} ))
      let newInputs = recommendations.places.filter((item, index) => index !== i)
      return dispatch(editPostInfo('recommendations', {...recommendations, places: newInputs}))
    }

    if(inputName === 'todo') {
      if(recommendations.todos.length === 1) return dispatch(editPostInfo('recommendations', {...recommendations, todos: ['']} ))
      let newInputs = recommendations.todos.filter((item, index) => index !== i)
      return dispatch(editPostInfo('recommendations', {...recommendations, todos: newInputs}))
    }  
  }

  const handleChange = (e, i, inputName) => {
    if(inputName === 'heritage') {
      const newValues = recommendations.heritages.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
     return dispatch(editPostInfo('recommendations', { ...recommendations, heritages: newValues}));
     
    }

    if(inputName === 'place') {
      const newValues = recommendations.places.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
     return dispatch(editPostInfo('recommendations', { ...recommendations, places: newValues}));
    }

    if(inputName === 'todo') {
      const newValues = recommendations.todos.map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
      return dispatch(editPostInfo('recommendations',{ ...recommendations, todos: newValues}));
    } 
  } 
  const addMoreInput = (e, inputName) => {
    e.preventDefault();
    if(inputName === 'heritage'){
      return dispatch(editPostInfo('recommendations',{ ...recommendations, heritages: [ ...recommendations.heritages,'']}))
    }
    if(inputName === 'place'){
      return dispatch(editPostInfo('recommendations',{ ...recommendations, places: [ ...recommendations.places,'']}))
    }

    if(inputName === 'todo'){
      return dispatch(editPostInfo('recommendations',{ ...recommendations, todos: [ ...recommendations.todos,'']}))
    }
  }
  
  return (
    <>
      <FormGroup>
          <InputsGroupHeading>Recommendations: </InputsGroupHeading>
          <FormGroupInput>
            <InputLabel htmlFor="numOfDays">Number of Days To Spend</InputLabel>
            <Select id="numOfDays" name="numOfDays" value = { recommendations.numOfDays } 
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
            </Select>
            <p> Description (Optional) </p>
            <TextArea 
               id="daysSummary"
               name="daysSummary"
               value = { recommendations.daysSummary }
               disabled={ !recommendations.numOfDays }
               onChange = {(e) => handleRecommendations(e) }
              />      
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel htmlFor="budget">Budget- <b>£ / person</b></InputLabel>
            <InputElement 
              id="budget" 
              name="budget" 
              type="number"
              value={ recommendations.budget }
              onChange = {(e) => handleRecommendations(e) }
              />
              <p> Description (Optional) </p>
              <TextArea 
               id="budgetSummary"
               name="budgetSummary"
               disabled={!recommendations.budget }
               value = { recommendations.budgetSummary }
               onChange = {(e) => handleRecommendations(e) }
               />
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel> Heritages To Visit</InputLabel>
              { 
               recommendations.heritages.map((item, index) => {
                 return <InputWrapper key={index} >
                         <InputElement 
                          name="heritage" 
                          type="text"
                          value={ item }
                          onChange={ (e) => handleChange( e, index, 'heritage') }
                          placeholder="Athens, Stonehenge..."
                          />
                        { item.trim() && <ClearInputBtn onClick={ (e) => removeInput( e, index, 'heritage' ) }>Remove</ClearInputBtn>}
                      </InputWrapper>
                })
              }
          <BtnAdd onClick={(e) => addMoreInput(e, 'heritage')}>Add More</BtnAdd>
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel> Places To See</InputLabel>
              { 
                recommendations.places.map((item, index) => {
                  return <InputWrapper key={index} >
                         <InputElement 
                          name="place" 
                          type="text"
                          value={ item }
                          onChange={ (e) => handleChange( e, index, 'place') }
                          placeholder="Toledo, Venice ..."
                         />
                        { item.trim() && <button onClick={ (e) => removeInput( e, index, 'place' ) }>Remove</button>}
                      </InputWrapper>
                })
              }
            <BtnAdd onClick={(e) => addMoreInput(e, 'place')}>Add More</BtnAdd>    
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel>Things To do </InputLabel>
              { 
                recommendations.todos.map((item, index) => {
                return <InputWrapper key={index} >
                         <InputElement 
                          name="todo" 
                          type="text"
                          value={ item }
                          onChange={ (e) => handleChange( e, index, 'todo') }
                          placeholder="Surfing, Bus Tour..."
                         />
                        { item.trim() && <button onClick={ (e) => removeInput( e, index, 'todo' ) }>Remove</button>}
                      </InputWrapper>
                })
              }
              <BtnAdd onClick={(e) => addMoreInput(e,'todo')}>Add More</BtnAdd>
              </FormGroupInput>
            </FormGroup>

        <FormGroup style={{marginBottom:'0'}}>
          <InputsGroupHeading>Others: </InputsGroupHeading>   
          < FormGroupInput style={{marginBottom:'0'}}>
            <InputLabel htmlFor="others">Access to community, ease of transportation, safety..</InputLabel>
            <TextArea 
              id="others" 
              name="others" 
              value={ recommendations.others }
              onChange = {(e) => handleRecommendations(e) }
              />
           </FormGroupInput>
         </FormGroup>     
    </>
  )
}
