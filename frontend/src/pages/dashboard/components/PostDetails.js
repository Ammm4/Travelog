import React, { useState } from 'react';
import styled from 'styled-components';
import BtnArray from './BtnArray';
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
  const { numOfDays, budget, heritages, places, todos, others }  = data.recommendations;
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
  return (
    <Container>
      {
        BtnArray.map(item => {
          return <InfoBtn
                   key={item.btnType} 
                   
                   onClick={(e) => handleClick(e,item.btnType)}
                   btnType={item.btnType}
                   infoType={infoType}> 
                  {item.name}
                 </InfoBtn>
        })
      }
        
      { 
        info 
         &&
        <PostRecommendation>
           { 
             infoType === 'days' 
              && <>
                   <PostHeading>No. of days :</PostHeading>
                   <p>{ numOfDays }</p>
                 </>
           } 
           { 
             infoType === 'budget' 
              && 
             <>
              <PostHeading>Budget:</PostHeading>
              <p>£{ budget} per person</p>
             </>
           } 
           { 
             infoType === 'others' 
               && 
             <>
               <PostHeading>Others:</PostHeading>
               <p>{ others }</p>
             </>
           }   
           { infoType === 'heritages'  
             && <>
              <PostHeading>Heritages To See:</PostHeading>
              <ul>
                {heritages.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
             </>
           }    
            { infoType === 'places'  
             && <>
              <PostHeading>Places To Visit:</PostHeading>
              <ul>
                {places.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
             </>
           }  
           { infoType === 'todos'  
             && <>
              <PostHeading>Things To Do:</PostHeading>
              <ul>
                {todos.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
             </>
           }  
        </PostRecommendation>
      }
     
        
    </Container>
  )
}

          
  