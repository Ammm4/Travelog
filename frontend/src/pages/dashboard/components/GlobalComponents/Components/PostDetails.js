import React, { useState } from 'react';
import styled from 'styled-components';
import { PostTitle } from '../StyledComponents/Containers';
import { BtnArray } from '../../../../../constants';

const Container = styled.div`
`
const PostHeading = styled.h4`
  font-weight: 600;
  margin-bottom: 0.4rem;
`
const PostRecommendation = styled.div`
  margin: 0.5rem 0;
  font-size: 0.935rem;
  ul{
    padding-left: 1.3rem;
  }
`
const InfoBtn = styled.button`
  outline: none;
  border: none;
  padding: 7px 12px;
  display: inline-block;
  letter-spacing: 0.8px;
  margin: 0rem 0.75rem 0.6rem 0;
  border-radius: 2px;
  background-color: #e1e1e1;
  color:${props => props.infoType === props.btnType ? '#2a78cd' : '#021b41'};
  &:hover {
    text-decoration: underline;
    color: ${props => props.infoType === props.btnType ? '#021b41' : '#2a78cd'}
  }
`

export default function PostDetails({ data }) {
  const [info, setInfo] = useState(false);
  const [infoType, setInfoType] = useState('');
  const { numOfDays, 
    daysSummary, 
    budget,
    budgetSummary, 
    heritages, 
    places, 
    todos, 
    others }  = data.recommendations;

  const handleClick = (e, btnType) => {
    e.preventDefault();
    if(btnType === infoType) {
      setInfo(false);
      setInfoType('');
      return
    }
    setInfo(true);
    setInfoType(btnType);
  }
  let requiredBtn = checkRecommendations( data );

  if(requiredBtn.length < 1) {
    return null
  }
  return (
    <>
      <PostTitle>
        <h4>Recommendations</h4>
      </PostTitle>
      <Container>
      {
        BtnArray.map(item => {
          if(requiredBtn.includes(item.btnType)) {
            return <InfoBtn
                   key={item.btnType}                
                   onClick={(e) => handleClick(e,item.btnType)}
                   btnType={item.btnType}
                   infoType={infoType}> 
                  {item.name}
                 </InfoBtn>
          }
          return null
        })
      }
        
      { 
        info 
         &&
        <PostRecommendation>
           { 
             infoType === 'days' 
              && <>
                   <PostHeading>No. of days</PostHeading>
                   <p>{ numOfDays !=='Select Time to Spend' && numOfDays }</p>
                   <p>{ daysSummary }</p>
                 </>
           } 
           { 
             infoType === 'budget' 
              && 
             <>
              <PostHeading>Budget</PostHeading>
              <p>£{ budget && budget } per person</p>
              <p>{ budgetSummary } </p>
             </>
           } 
           { 
             infoType === 'others' 
               && 
             <>
               <PostHeading>Others</PostHeading>
               <p>{ others }</p>
             </>
           }   
           { infoType === 'heritages'  
             && <>
              <PostHeading>Heritages To See</PostHeading>
              <ul>
                {heritages.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
             </>
           }    
            { infoType === 'places'  
             && <>
              <PostHeading>Places To Visit</PostHeading>
              <ul>
                {places.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
             </>
           }  
           { infoType === 'todos'  
             && <>
              <PostHeading>Things To Do</PostHeading>
              <ul>
                {todos.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
             </>
           }  
        </PostRecommendation>
      }     
    </Container>
    </>
  )
}

const checkRecommendations = ( data ) => {
  const { numOfDays, 
    daysSummary, 
    budget,
    budgetSummary, 
    heritages, 
    places, 
    todos, 
    others }  = data.recommendations;
  let requiredBtn = []; 
if(( numOfDays !== 'Select Time to Spend') || ( daysSummary.trim() !== '')) {
  requiredBtn.push('days')
}
if (( budget !== 0) || ( budgetSummary.trim() !== '')) {
  requiredBtn.push('budget')
}
if (heritages.length > 0 ) {
  requiredBtn.push('heritages')
}
if (places.length > 0 ) {
  requiredBtn.push('places')
}
if (todos.length > 0 ) {
  requiredBtn.push('todos')
}
if (others.trim() !== '') {
  requiredBtn.push('others')
}
 return requiredBtn
}         
  