import React from 'react';
import { BiHappy } from 'react-icons/bi';
import { SeenAllHeading } from '../StyledComponents/Headings';
import { SeenAllContainer } from '../StyledComponents/Containers';

export default function SeenAll() {
  return (
    <SeenAllContainer>
      <p style={{ fontSize: '2rem', textAlign:'center' }}> <BiHappy /> </p>
      <SeenAllHeading> You have seen it all !!</SeenAllHeading>
    </SeenAllContainer>
    
  )
}
