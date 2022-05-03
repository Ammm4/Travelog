import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from './GlobalComponents/StyledComponents/Buttons';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { resetGlobals } from '../../../redux/globals/globalActions';

const Container = styled.div`
  padding: 0.2rem 0 0 0.2rem;
  z-index: 5;
`

export default function GoBackBtn({ reset }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleGoBack = () => {
    if(reset) {
      dispatch(resetGlobals())
    }
    history.goBack();
  }
  return (
    <Container className='sticky'>
      <Button onClick={handleGoBack}><FaArrowAltCircleLeft style={{ fontSize: '2.85rem'}}/></Button>
    </Container>
  )
}
