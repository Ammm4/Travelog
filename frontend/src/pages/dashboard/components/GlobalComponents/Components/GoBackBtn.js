import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../StyledComponents/Buttons';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { GoBackContainer } from '../StyledComponents/Containers'


export default function GoBackBtn() {
  const history = useHistory();
  const handleGoBack = () => {
    history.push('/dashboard');
  }
  return (
    <GoBackContainer className='sticky'>
      <Button onClick={ handleGoBack }><FaArrowAltCircleLeft style={{ fontSize: '2.85rem'}}/></Button>
    </GoBackContainer>
  )
}
