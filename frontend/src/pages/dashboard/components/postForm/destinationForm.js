import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import Asterisk from '../../../../GlobalComponents/Components/Asterisk';
import { FormGroup, FormGroupInput } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading } from '../GlobalComponents/StyledComponents/Headings';
import ErrorDisplay from '../../../../GlobalComponents/Components/Error';
import { TextArea, InputLabel, InputElement } from '../GlobalComponents/StyledComponents/Inputs';
import { editPostInfo } from '../../../../redux/globals/globalActions';
import { destinationInputs } from '../../../../constants';
import { Rating } from 'react-simple-star-rating';

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
          {destinationInputs.map(input => {
            return (
              <FormGroupInput key={input}>
                <InputLabel htmlFor={input}>{input === 'destination' ? 'Name of Place' : input}<Asterisk/></InputLabel>
                <InputElement 
                  id={input}
                  name={input}
                  type="text"
                  value = { destinationInfo[input] }
                  onChange = {(e) => handleDestinationInfo(e) }
                  placeholder={ input === 'destination' ? 'Barcelona, Venice, Porto...' : 'Italy, Greece, France...' }
                  errors = { errors && errors[input]}
                 />
                { errors && errors[input] && <ErrorDisplay errorRef={ errors.errorMarker === input ? errorRef : null}>{ errors.destination }</ErrorDisplay> }
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
          <FormGroupInput>
            <InputLabel htmlFor="ratings">Ratings<Asterisk/> </InputLabel>
            <Rating
             ratingValue={ destinationInfo.ratings }
             iconsCount={5}
             fillColor='#2a78cd'
             allowHalfIcon={true}
             onClick={ newValue => dispatch(editPostInfo('destinationInfo', {...destinationInfo, ratings: newValue}))  }
            />
            { errors && errors.ratings && <ErrorDisplay errorRef={ errors.errorMarker === 'ratings' ? errorRef : null}>{ errors.ratings }</ErrorDisplay> }      
          </FormGroupInput>
        </FormGroup>
  )
}
