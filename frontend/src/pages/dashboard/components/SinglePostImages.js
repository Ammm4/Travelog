import React, { useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SINGLE_POST_RESET } from '../../../redux/posts/postTypes';

//========================   Icons =====================================//
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import { SiYourtraveldottv } from "react-icons/si";
import { AiOutlineShrink } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { AiOutlineExpandAlt } from "react-icons/ai"

// ========================= Styled Components =========================//
const sharedBtnCss = css`
  border-radius: 50%; 
  height: 48px;
  width: 48px;
  padding: 12px;
  z-index: 2223;
  background-color: #888;
  transition: 1s all ease;
  &:hover {
     background-color: #eee
   }
`
const commonDivStyles = css`
  position: absolute;
  top:0;
  left:0;
  z-index: 2222;
  overflow:hidden;
  padding: 0 2rem ;
  height: 100%;
  width: 100%;
  background-color: #111111;
`
const Container = styled.div`
 position: relative;
 width:100%;
 height: 100%;
 padding: 0 2%;
 overflow:hidden;
 .prev-btn, .next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
 }
 .prev-btn {
   ${sharedBtnCss}
   left:0.5rem;
   &:hover {
     left: 0.25rem;
   }
 }
 .next-btn {
   ${sharedBtnCss}
   right:0.5rem;
   transform: translateY(-50%);
    &:hover {
     right: 0.25rem;
   }
 }
 .close-btn {
   display: inline-block;
   margin-right: 0.5rem;
   ${sharedBtnCss}
 }
`
const ImgContainer = styled.div`
  ${commonDivStyles}
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto 100%;
  transform: ${props => props.index === props.currentIndex ? 'translateX(0)' : props.index > props.currentIndex? 'translateX(100%)' : 'translateX(-100%)'};
  transition: 1s all ease;

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
    right: 2%;
    top: 2%;
  }

  .image_name {
    left: 5px;
    bottom: 5px;
    padding: 5px 12px;
    font-size: 0.95rem;
    border-radius: 4px;
  }
`
const NoImgContainer = styled.div`
  ${commonDivStyles}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color:#fff;
    font-size: 1.5rem;
  }
`
const BtnGroup = styled.div`
  display: inline-block;
  position: absolute;
  z-index: 2223;
  top: 2%;
  left: 1%;
`
const Button = styled.button`
  background: none;
  outline: none;
  border: none;
`
const HomeLink = styled(Link)`
  text-decoration: none;
`
const SmHomeLink = styled(Link)`
  text-decoration: none;
  display: none;
  @media only screen and (max-width: 600px) {
    display: inline;
  }
`
export default function SinglePostImages({ expand, setExpand}) {
  const { singlepost: { images } } = useSelector(state => state.SinglePost);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const dispatch = useDispatch()
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
  const handleClose = () => {
    dispatch({ type: SINGLE_POST_RESET});
    history.goBack()
  }

  return (
    <Container>
        { 
          images.length < 1 && 
          <NoImgContainer>
            <IoIosImages style={{color: '#fff', fontSize: '6rem'}}/>
            <p>No Images Available</p>
          </NoImgContainer> 
         }
        {
          images.map((img, index) => {
            return (<ImgContainer key={ index } index={index} currentIndex={ currentIndex } url={ img.imgURL }>
                      <span className='image_number'>{`${index + 1}/${ images.length }`}</span>
                      <span className='image_name'>{ img.imgName }</span>
                    </ImgContainer>)  
          })
        }
        <BtnGroup>
          <Button><GrClose className='close-btn' onClick={ handleClose }/></Button>
          { images.length > 0 && <Button onClick={() => setExpand(!expand)}> { expand ? <AiOutlineShrink className='close-btn' title='Exit Full-Screen'/> : <AiOutlineExpandAlt className='close-btn' title='Set Full-Screen'/> }</Button> }
          {
            expand && <HomeLink to='/dashboard/home'><SiYourtraveldottv className='close-btn' title='Back Home'/></HomeLink>
          }
          {
            !expand && <SmHomeLink to='/dashboard/home'><SiYourtraveldottv className='close-btn' title='Back Home'/></SmHomeLink>
          }
        </BtnGroup>
        
        {
         images.length > 1 && 
          <>
            {showPrevBtn && <Button><GrPrevious className='prev-btn' onClick={() => handlePrevClick()}/></Button>}
            {showNextBtn && <Button><GrNext className='next-btn' onClick={() => handleNextClick() }/></Button>}
          </>
         } 
       
    </Container>
  )
}

