import React from 'react';
import { ReplyTextArea } from '../StyledComponents/Inputs';

export default function ReplyInputArea({ handleChange, body }) {
  const handleKeyUp = (e) => {
    e.target.style.height = '35px';
    e.target.style.height = `${ e.target.scrollHeight }px`;
  }
  return (
      <ReplyTextArea 
        placeholder='Add a Reply'
        onKeyUp={(e) => handleKeyUp(e)}
        onChange={(e) => handleChange(e)}
        value={body}
      />
  )
}
