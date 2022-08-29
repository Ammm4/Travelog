import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { FormGroup, FormGroupInput, InputWrapper } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading } from '../GlobalComponents/StyledComponents/Headings';
import { TextArea, Select } from '../GlobalComponents/StyledComponents/Inputs';
import { BtnAdd, ClearInputBtn } from '../GlobalComponents/StyledComponents/Buttons';
import { InputElement, InputLabel } from '../GlobalComponents/StyledComponents/Inputs';
import { editPostInfo } from '../../../../redux/globals/globalActions';
import { recommendationsFormSelect, recommendationsFormArrays } from '../../../../constants';
export default function RecommendationsInputForm() {
  const { Globals: { postInfo: { recommendations }} } = useReduxSelector();
  const dispatch = useReduxDispatch()
  const handleRecommendations = (e) => {
    recommendations[e.target.name] = e.target.value;
    dispatch(editPostInfo('recommendations', recommendations))
  }
  const removeInput = (e, i, recommendationsKey) => {
    e.preventDefault(); 
    if(recommendations[recommendationsKey].length === 1) return dispatch(editPostInfo('recommendations', {...recommendations, [recommendationsKey]: ['']} ))
    let newInputs = recommendations[recommendationsKey].filter((item, index) => index !== i)
    return dispatch(editPostInfo('recommendations', {...recommendations, [recommendationsKey]: newInputs}))
    
  }

  const handleChange = (e, i) => {
    const newValues = recommendations[e.target.name].map((item, index) => {
        if(index === i) return e.target.value
        return item
      })
    return dispatch(editPostInfo('recommendations', { ...recommendations, [e.target.name]: newValues}));
  } 
  const addMoreInput = (e, recommendationsKey) => {
    e.preventDefault();
    dispatch(editPostInfo('recommendations',{ ...recommendations, [recommendationsKey]: [ ...recommendations[recommendationsKey], '']}))
  }
  
  return (
    <>
      <FormGroup>
          <InputsGroupHeading>Recommendations: </InputsGroupHeading>
          <FormGroupInput>
            <InputLabel htmlFor="numOfDays">Time To Spend</InputLabel>
            <Select id="numOfDays" name="numOfDays" value = { recommendations.numOfDays } 
              onChange = {(e) => handleRecommendations(e) }>
              {
                 recommendationsFormSelect.map((item,i) => <option key={item} value={item} disabled={ i === 0 ? true : false}>{ item }</option>)
              } 
            </Select>
            <p> Description (Optional) </p>
            <TextArea 
               id="daysSummary"
               name="daysSummary"
               value = { recommendations.daysSummary }
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
               value = { recommendations.budgetSummary }
               onChange = {(e) => handleRecommendations(e) }
               />
          </FormGroupInput>
          {
            recommendationsFormArrays.map(item => {
              const { inputName, title, description } = item;
              return (
                <FormGroupInput key={inputName}>
                  <InputLabel> { title }</InputLabel>
                  { 
                     recommendations[inputName].map((element, index) => {
                       return <InputWrapper key={index} >
                         <InputElement 
                          name={inputName} 
                          type="text"
                          value={ element }
                          onChange={ (e) => handleChange( e, index ) }
                          placeholder={description}
                          />
                        { element.trim() && <ClearInputBtn onClick={ (e) => removeInput( e, index, inputName ) }>Remove</ClearInputBtn>}
                      </InputWrapper>
                    })
                   }
                  <BtnAdd onClick={(e) => addMoreInput(e, inputName)}>Add More</BtnAdd>
                </FormGroupInput>
              )
            })
          }   
        </FormGroup>
        <FormGroup style={{ marginBottom:'0' }}>
          <InputsGroupHeading>Others: </InputsGroupHeading>   
          < FormGroupInput style={{ marginBottom:'0' }}>
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
