import React from 'react';
import { ScrollUpBtn } from "../StyledComponents/Buttons";
import { IoArrowUpCircle } from "react-icons/io5";
const options = {
  top: 0,
  left: 0,
  behavior: 'smooth'
}
export default function ScrollUp() {
  return (
    <ScrollUpBtn onClick={ () => window.scrollTo(options)}>
        <IoArrowUpCircle style={{fontSize: '2.85rem'}} />
    </ScrollUpBtn>
  )
}



