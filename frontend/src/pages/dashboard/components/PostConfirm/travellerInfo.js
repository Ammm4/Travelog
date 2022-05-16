import React from 'react';
import { useReduxSelector, infoRequiredToDisplay } from '../../../../utils';
import { Infos, InfoGroup, StyledParagraph } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading, InfoLabel } from '../GlobalComponents/StyledComponents/Headings';
import { Answer } from '../GlobalComponents/StyledComponents/Paragraphs';

export default function TravellerInfo() {
  const { Globals: { postInfo: { travellerInfo } } } = useReduxSelector();
  return (
    <InfoGroup>
      <InputsGroupHeading>Travel Details</InputsGroupHeading>
        <Infos>
          <InfoLabel>Type of Travel</InfoLabel>
          <Answer>{ travellerInfo.travelType }</Answer>
        </Infos>
        <Infos>
          <InfoLabel>Length of Holiday</InfoLabel>
            <Answer>{ travellerInfo.time }</Answer>
        </Infos>
    </InfoGroup>
  )
}
