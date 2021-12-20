import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
 border-top: 2px solid #fff;
 padding:0.5rem 1rem;
 letter-spacing: 1px;
 font-size: 0.9rem;
 line-height: 20px;
 div {
  margin-bottom: 1rem;
 }
 div h5 {
  margin-bottom: 0.4rem;
  margin-right: 0.35rem;
 }
 div p {
  display: flex;
 }
 
`
const PostHeading = styled.h4`
  color: #000;
  font-weight: 700;
  margin-bottom: 0.5rem;
`
const PostRecommendation = styled.div`
  margin-bottom: 1rem;
  ul{
    padding-left: 1.5rem;
  }
`

export default function PostDetails({ data }) {
  if(!data) return;
  return (
    <Container>
      <div className="traveller_info">
          <PostHeading>Travellers' Info:</PostHeading>
          <p><h5>No. of people: </h5><span>{ data.numOfPeople}</span></p>
          <p><h5>Costs: </h5><span>£{ data.cost }</span> </p>     
        </div>
        <div className="recommendations">
          <PostHeading>Recommendations:</PostHeading>
          <PostRecommendation>
            <p><h5>No. of days:</h5><span>{ data.numOfDays}</span></p> 
            <p><h5>Budget:</h5><span> £{ data.budget } pp.</span> </p>
            <h5>Heritages To See:</h5>
            <ul>
              {data.heritages.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </PostRecommendation>
          <PostRecommendation>
          <h5>Places to Visit:</h5> 
            <ul>
              {data.places.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </PostRecommendation>
          <PostRecommendation>
            <h5>Things To Do:</h5>
            <ul>
              {data.todos.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </PostRecommendation>
        </div>
        <div>
          <PostHeading>Others: </PostHeading>
           <p>{data.others}</p>
        </div>
    </Container>
  )
}
