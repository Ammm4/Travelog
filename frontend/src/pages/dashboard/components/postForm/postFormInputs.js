import React from 'react';

import PostImgInput from './postImgInput';
import DestinationInputForm from './destinationForm';
import RecommendationsInputForm from './recommendationsForm';
import TravellerForm from './travellerForm';

export default function PostFormInputs() {
  return (
    <>
     <DestinationInputForm />
     <PostImgInput />
     <TravellerForm />
     <RecommendationsInputForm />
    </>
  )
}
