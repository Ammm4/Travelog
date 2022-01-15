import React, { useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import { useHistory } from 'react-router-dom';

//Icons
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrClose } from "react-icons/gr";

const sharedBtnCss = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%; 
  height: 48px;
  width: 48px;
  padding: 12px;
  background-color: #888;
  z-index: 2223;
  transition: 1s all ease;
  &:hover {
     background-color: #eee
   }
`

const Container = styled.div`
 position: relative;
 width:100%;
 height: 100%;
 padding: 0 2%;
 overflow:hidden;
 .prev-btn {
   ${sharedBtnCss}
   left:.5rem;
   &:hover {
     left: 0.25rem;
   }
 }
 .next-btn {
   ${sharedBtnCss}
   right:.5rem;
   transform: translateY(-50%);
    &:hover {
     right: 0.25rem;
   }
 }
 .close-btn {
 ${sharedBtnCss}
 
 top: 2%;
 left: 2%;
 transform: translateY(0%);
 }
 
`
const ImgContainer = styled.div`
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  z-index: 2222;
  overflow:hidden;
  padding: 0 2rem ;
  height: 100%;
  width: 100%;
  background-color: #111111;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto 100%;
  
  transform: ${props => props.index === props.currentIndex ? 'translateX(0)' : props.index > props.currentIndex? 'translateX(100%)' : 'translateX(-100%)'};
  transition: 1s all ease;
  img {
   display: block;
   width: 100%;
   height: 100vh;
   object-fit: contain;
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


export default function SinglePostImages({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const history = useHistory();

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
  
  return (
    <Container>
        {
          images && images.map((img, index) => {
            return (<ImgContainer key={ index } index={index} currentIndex={currentIndex} url={img.imgURL}>
                  <span className="image_number">{`${index + 1}/${images.length}`}</span>
                  <span className="image_name">{img.imgName}</span>
              </ImgContainer>)  
          })
        }
        <GrClose className="close-btn" onClick={ () => history.goBack() }/>
      
       {  
         images.length > 1 && 
          <>
            {showPrevBtn && <GrPrevious className="prev-btn" onClick={() => handlePrevClick()}/>}
            {showNextBtn && <GrNext className="next-btn" onClick={() => handleNextClick() }/>}
          </>
       } 
    </Container>
  )
}

