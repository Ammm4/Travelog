import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { FormGroup, FormGroupInput } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading } from '../GlobalComponents/StyledComponents/Headings';
import ErrorDisplay from '../../../../globalComponents.js/components/error';
import { TextArea, InputLabel, InputElement } from '../GlobalComponents/StyledComponents/Inputs';
import { editPostInfo } from '../../../../redux/globals/globalActions';
import { CgAsterisk } from "react-icons/cg";
import { Rating } from 'react-simple-star-rating';


export default function DestinationInputForm() {
   const { Globals: { postInfo: { destinationInfo, errors }} } = useReduxSelector();
   const dispatch = useReduxDispatch();
   const handleDestinationInfo = (e) => {
      destinationInfo[e.target.name] = e.target.value;
      dispatch(editPostInfo('destinationInfo', destinationInfo))
   }
  return (
    <FormGroup>
          <InputsGroupHeading>Destination Info: </InputsGroupHeading>
          <FormGroupInput>
            <InputLabel htmlFor="destination">Name of Place<CgAsterisk style={{color:'#007bff'}}/></InputLabel>
            <InputElement 
              id="destination" 
              name="destination" 
              type="text"
              value = { destinationInfo.destination }
              onChange = {(e) => handleDestinationInfo(e) }
              placeholder="Barcelona, Venice, Porto..."
              />
            { errors && errors.destination && <ErrorDisplay>{ errors.destination }</ErrorDisplay> }
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel htmlFor="country">Country<CgAsterisk style={{color:'#007bff'}}/></InputLabel>
            <InputElement 
              id="country" 
              name="country" 
              type="text"
              value = { destinationInfo.country }
              onChange = {(e) => handleDestinationInfo(e) }
              placeholder="Italy, Greece, France..."
              required
              />
             { errors && errors.country && <ErrorDisplay>{ errors.country }</ErrorDisplay> }
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel htmlFor="summary">Summary<CgAsterisk style={{color:'#007bff'}}/></InputLabel>
            <TextArea 
              id="summary"
              name="summary"
              value = { destinationInfo.summary }
              onChange = {(e) => handleDestinationInfo(e) }
            />
            { errors && errors.summary && <ErrorDisplay>{ errors.summary }</ErrorDisplay> }
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel htmlFor="ratings">Ratings<CgAsterisk style={{color:'#007bff'}}/> </InputLabel>
            <Rating
             ratingValue={ destinationInfo.ratings }
             iconsCount={5}
             fillColor='#2a78cd'
             allowHalfIcon={true}
             onClick={ newValue => dispatch(editPostInfo('destinationInfo', {...destinationInfo, ratings: newValue}))  }
            />
            { errors && errors.ratings && <ErrorDisplay>{ errors.ratings }</ErrorDisplay> }      
          </FormGroupInput>
        </FormGroup>
  )
}
