import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { FormGroupInput } from '../GlobalComponents/StyledComponents/Containers';
import { InputLabel } from '../GlobalComponents/StyledComponents/Inputs';
import { Rating } from 'react-simple-star-rating';
import Asterisk from '../../../../GlobalComponents/Components/Asterisk';
import ErrorDisplay from '../../../../GlobalComponents/Components/Error';
import { editPostInfo } from '../../../../redux/globals/globalActions';

export default function RatingForm({errorRef}) {
  const { Globals: { postInfo: { destinationInfo, errors }} } = useReduxSelector();
  const dispatch = useReduxDispatch();
  return (
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
  )
}
