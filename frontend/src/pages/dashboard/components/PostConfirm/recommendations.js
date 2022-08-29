import React from 'react';
import styled from 'styled-components';
import { useReduxSelector, infoRequiredToDisplay } from '../../../../utils';
import { Infos, InfoGroup } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading, InfoLabel } from '../GlobalComponents/StyledComponents/Headings';
import { Answer } from '../GlobalComponents/StyledComponents/Paragraphs';

const List = styled.ul`
  padding-left: 1.75rem;
`
export default function Recommendations() {
  const { Globals: { postInfo: { recommendations }}} = useReduxSelector();
  const { requiredInfo } = infoRequiredToDisplay(recommendations);
  return (
    <>
    <InfoGroup>
          <InputsGroupHeading>Recommendations</InputsGroupHeading>
          {
            requiredInfo.includes('days') &&
            <Infos>
              <InfoLabel>No. of Days</InfoLabel>
              {
                recommendations.numOfDays && <Answer>{ recommendations.numOfDays }</Answer>
              }
              {
                recommendations.daysSummary && <Answer>{ recommendations.daysSummary }</Answer>
              }
            </Infos>
          }
          {
            requiredInfo.includes('budget') &&
            <Infos>
              <InfoLabel>Budget- £/p</InfoLabel>
              {
                recommendations.budget && <Answer>{ recommendations.budget }</Answer>
              }
              {
                recommendations.budgetSummary && <Answer>{ recommendations.budgetSummary}</Answer>
              }
              
            </Infos>
          }
          {
            requiredInfo.includes('heritages') && 
            <Infos>
              <InfoLabel>Heritages to See</InfoLabel>
              <List>
              { 
                recommendations.heritages.map((item, index) => {
                return <li key={index}><Answer>{item}</Answer></li>
               })
             }
              </List>
            </Infos>
          }
          {
            requiredInfo.includes('places') && 
            <Infos>
              <InfoLabel>Places to Visit</InfoLabel>
              <List>
              { 
                recommendations.places.map((item, index) => {
                 return <li key={index}><Answer>{item}</Answer></li>
               })
              }
             </List>
            </Infos>  
          }
          {
            requiredInfo.includes('todos') &&
            <Infos>
          <InfoLabel>Things to Do</InfoLabel>
            <List>
            { 
             recommendations.todos.map((item, index) => {
              return <li key={index}><Answer>{item}</Answer></li>
            })
            }
          </List>
          </Infos>
          }      
      </InfoGroup>
      { 
        recommendations.others && 
        <InfoGroup>
          <InputsGroupHeading>Others</InputsGroupHeading>
          <Infos>
            <InfoLabel>Transportations, Amneties, Safety, etc.</InfoLabel>
            <Answer>{ recommendations.others }</Answer>
          </Infos>
        </InfoGroup>
       }
  </>
  )
}
