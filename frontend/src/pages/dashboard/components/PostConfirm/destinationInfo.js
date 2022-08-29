import React from 'react';
import { useReduxSelector } from '../../../../utils';
import { Infos, InfoGroup, StyledParagraph } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading, InfoLabel } from '../GlobalComponents/StyledComponents/Headings';
import { Answer } from '../GlobalComponents/StyledComponents/Paragraphs';
import Ratings from '../GlobalComponents/Components/Ratings';

export default function DestinationInfo() {
  const { Globals: { postInfo: { destinationInfo }} } = useReduxSelector();
  return (
    <InfoGroup>
        <InputsGroupHeading>Destination</InputsGroupHeading>
        <Infos>
          <InfoLabel>Place</InfoLabel>
          <Answer>{ destinationInfo.destination }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Country</InfoLabel>
          <Answer>{ destinationInfo.country }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Summary</InfoLabel>
          <StyledParagraph style={{ fontSize: '1rem'}} >{ destinationInfo.summary }</StyledParagraph>
        </Infos>
        <Infos>
          <InfoLabel>Ratings</InfoLabel> 
            <Ratings ratings={ destinationInfo.ratings } />   
        </Infos>
      </InfoGroup>
  )
}

