import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import Asterisk from '../../../../GlobalComponents/Components/Asterisk';
import { FormGroup, FormGroupInput } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading } from '../GlobalComponents/StyledComponents/Headings';
import ErrorDisplay from '../../../../GlobalComponents/Components/Error';
import { TextArea, InputLabel, InputElement } from '../GlobalComponents/StyledComponents/Inputs';
import { editPostInfo } from '../../../../redux/globals/globalActions';
import { destinationInputs } from '../../../../constants';
import RatingForm from './ratingForm';

export default function DestinationInputForm({ errorRef }) {
   const { Globals: { postInfo: { destinationInfo, errors }} } = useReduxSelector();
   const dispatch = useReduxDispatch();
   const handleDestinationInfo = (e) => {
      destinationInfo[e.target.name] = e.target.value;
      dispatch(editPostInfo('destinationInfo', destinationInfo))
   }
  return (
    <FormGroup>
          <InputsGroupHeading>Destination Info: </InputsGroupHeading>
          {destinationInputs.map(item => {
            const {inputName, title, description } = item;
            return (
              <FormGroupInput key={inputName}>
                <InputLabel htmlFor={inputName}>{title}<Asterisk/></InputLabel>
                <InputElement 
                  id={inputName}
                  name={inputName}
                  type="text"
                  value = { destinationInfo[inputName] }
                  onChange = {(e) => handleDestinationInfo(e) }
                  placeholder={ description }
                  errors = { errors && errors[inputName]}
                 />
                { errors && errors[inputName] && <ErrorDisplay errorRef={ errors.errorMarker === inputName ? errorRef : null}>{ errors.destination }</ErrorDisplay> }
              </FormGroupInput>
            )
          })}
          <FormGroupInput>
            <InputLabel htmlFor="summary">Summary<Asterisk/></InputLabel>
            <TextArea 
              id="summary"
              name="summary"
              value = { destinationInfo.summary }
              onChange = {(e) => handleDestinationInfo(e) }
              errors = { errors && errors.summary }
            />
            { errors && errors.summary && <ErrorDisplay errorRef={ errors.errorMarker === 'summary' ? errorRef : null}>{ errors.summary }</ErrorDisplay> }
          </FormGroupInput>
          <RatingForm errorRef={errorRef}/>
        </FormGroup>
  )
}
