import React, { useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const sharedBtnCss = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%; 
  height: 48px;
  width: 48px;
  padding: 12px;
  background-color: #888;
  transition: 1s all ease;
  &:hover {
     background-color: #eee
   }
`

const Container = styled.div`
 position: relative;
 margin-bottom: 0.75rem;
 height: 340px;
 overflow:hidden;
 .prev-btn {
   ${sharedBtnCss}
   left:.5rem;
   &:hover {
     left: 0.25rem;
   }
 }
 .next-btn{
   ${sharedBtnCss}
   right:.5rem;
   transform: translateY(-50%);
   border-radius: 50%; 
    &:hover {
     right: 0.25rem;
   }
 }
 
`
const ImgContainer = styled.div`
  position: absolute;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  transform: ${props => props.index === props.currentIndex ? 'translateX(0)' : props.index > props.currentIndex? 'translateX(100%)' : 'translateX(-100%)'};
  transition: 1s all ease;
  img {
   display: block;
   width: 100%;
   height: 100%;
   object-fit: cover;
  }
  span {
    display: inline-block;
    position: absolute; 
    padding: 3px 6px;
    border-radius: 10px;
    font-size: 0.85rem;
    background-color: rgba(0,0,0,0.75);
    color: #fff;
    letter-spacing: 2px;
  }
  .image_number{
    right: 5px;
    top: 5px;
  }
  .image_name {
    left: 5px;
    bottom: 5px;
    padding: 5px 12px;
    font-size: 0.95rem;
    border-radius: 25px;
  }
`

export default function PostImages({ images, postId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  
  const location = useLocation();
  const history = useHistory();

  const handleImageClick = (e) => {
    e.preventDefault();
    history.push(`${location.pathname}/posts/${postId}`)
  }

  useEffect(() => {
    if(currentIndex === 0) {
      return setShowPrevBtn(false)
    } 
    if(currentIndex === images.length - 1){
      return setShowNextBtn(false)
    }
    setShowPrevBtn(true);
    setShowNextBtn(true)
  }, [currentIndex, images]);

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  }

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  }
  
  if(images.length === 1) {
    return <Container>
             <ImgContainer>
               <img src={ images[0] } alt="destination" />
             </ImgContainer>  
           </Container>
  }
  return (
    <Container>
        { 
         images.map((image, index) => {
          return (
            <ImgContainer 
              key={index} 
              index={index} 
              currentIndex={currentIndex}
              onClick={(e) => handleImageClick(e)}
            >
              <img src={ image.imgURL } alt="barcelona"/>
              <span className="image_number">{`${index + 1}/${ images.length }`}</span>
              <span className="image_name">{image.imgName}</span>
            </ImgContainer>)  
        })}
      {showPrevBtn && <GrPrevious className="prev-btn" onClick={() => handlePrevClick()}/>}
      {showNextBtn && <GrNext className="next-btn" onClick={() => handleNextClick() }/>}
    </Container>
  )
}
