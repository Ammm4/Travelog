import React from 'react';
import { InputContainer } from '../StyledComponents/Container';
import { Input } from '../StyledComponents/Inputs';

export default function FormInput({ email, errors }) {
  return (
    <InputContainer >
      <label htmlFor="email">Email</label>
      <Input 
        type="email" 
        name="email"
        id="email"
        value={ email }
          //onChange={ (e) => handleChange(e) }
        errors={ errors && errors.email }
        />
    </InputContainer>
  )
}
