import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { SinglePostImagesContainer, SinglePostImagesBtnGroup, ImgContainer, NoImgContainer } from '../GlobalComponents/StyledComponents/Containers';
import { Button } from '../GlobalComponents/StyledComponents/Buttons';
import { setPostData } from '../../../../redux/posts/postActions';
import { StyledLink } from '../GlobalComponents/StyledComponents/Link'
import { resetGlobals } from '../../../../redux/globals/globalActions';
import { SINGLE_POST_RESET } from '../../../../redux/posts/postTypes';

//========================   Icons =====================================//
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import { SiYourtraveldottv } from "react-icons/si";
import { AiOutlineShrink } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { AiOutlineExpandAlt } from "react-icons/ai"

// ========================= Styled Components =========================//

const SmHomeLink = styled(Link)`
  ${StyledLink}
  display: none;
  @media only screen and (max-width: 600px) {
    display: inline;
  }
`
export default function SinglePostImages() {
  const { Post: { post: { images, expand } }} = useReduxSelector();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const dispatch = useReduxDispatch()
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
    dispatch({ type: SINGLE_POST_RESET });
    history.push('/dashboard')
  }
  const handleClick = () => {
    dispatch(resetGlobals());
  }
  
  return (
    <SinglePostImagesContainer>
        { images && images.length < 1 && 
          <NoImgContainer>
            <IoIosImages style={{color: '#fff', fontSize: '6rem'}}/>
            <p>No Images Available</p>
          </NoImgContainer> 
         }
        {
          images && images.map((img, index) => {
            return (<ImgContainer key={ index } index={index} currentIndex={ currentIndex } url={ img.imgURL }>
                      <span className='image_number'>{`${index + 1}/${ images.length }`}</span>
                      <span className='image_name'>{ img.imgName }</span>
                    </ImgContainer>)  
          })
        }
        <SinglePostImagesBtnGroup>
          <Button><GrClose className='close-btn' onClick={ handleClose }/></Button>
          { images && images.length > 0 && <Button onClick={() => dispatch(setPostData('expand', !expand))}> { expand ? <AiOutlineShrink className='close-btn' title='Exit Full-Screen'/> : <AiOutlineExpandAlt className='close-btn' title='Set Full-Screen'/> }</Button> }
          {
            expand && <StyledLink to='/dashboard/home' onClick={handleClick}><SiYourtraveldottv className='close-btn' title='Back Home'/></StyledLink>
          }
          {
            !expand && <SmHomeLink to='/dashboard/home' onClick={handleClick}><SiYourtraveldottv className='close-btn' title='Back Home'/></SmHomeLink>
          }
        </SinglePostImagesBtnGroup>
        
        {
         images && images.length > 1 && 
          <>
            {showPrevBtn && <Button><GrPrevious className='prev-btn' onClick={() => handlePrevClick()}/></Button>}
            {showNextBtn && <Button><GrNext className='next-btn' onClick={() => handleNextClick() }/></Button>}
          </>
         }   
    </SinglePostImagesContainer>
  )
}

