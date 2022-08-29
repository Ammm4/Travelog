import React from 'react';
import { Rating } from 'react-simple-star-rating';

function Ratings({ ratings }) {
  return (
    <>
       <Rating 
        ratingValue={ ratings }
        iconsCount={5}
        allowHalfIcon={true}
        size={15}
        readonly={true}
        style={{ marginTop: '-0.5rem' }}
        />
    </>)
}

export default Ratings;