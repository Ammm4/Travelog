import React, { useState, useEffect } from 'react';
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
  color: #021b41;
  &:hover {
    text-decoration: underline;
    color: #2a78cd;
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
                   style={{ color: infoType === item.btnType? '#f00' : ''}} 
                   onClick={(e) => handleClick(e,item.btnType)}> 
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
/*  <div className="traveller_info">
          <PostHeading>Travellers' Info:</PostHeading>
          <p><h5>No. of people: </h5><span>{ data.numOfPeople}</span></p>
          <p><h5>Costs: </h5><span>£{ data.cost }</span> </p>     
      </div>
      <div className="recommendations">
          <PostRecommendation>
            <p><h5>No. of days:</h5><span>{ numOfDays}</span></p> 
            <p><h5>Budget:</h5><span> £{ budget } pp.</span> </p>
          </PostRecommendation>
          <PostRecommendation>
            <h5>Heritages To See:</h5>
            <ul>
              {heritages.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          <h5>Places to See:</h5> 
            <ul>
              {places.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </PostRecommendation>
          <PostRecommendation>
            <h5>Things To Do:</h5>
            <ul>
              {todos.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </PostRecommendation>
        </div>
        <div>
          <PostHeading>Others: </PostHeading>
           <p>{others}</p>
        </div> 
      
      
      */