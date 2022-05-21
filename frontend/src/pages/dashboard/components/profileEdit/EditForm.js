import React from 'react';
import styled from 'styled-components';
import { useReduxSelector, useReduxDispatch } from '../../../../utils'
import { InfoHeader } from '../GlobalComponents/StyledComponents/Headings';
import { TextArea, InputLabel, InputElement} from '../GlobalComponents/StyledComponents/Inputs';
import { editUserInfo } from '../../../../redux/globals/globalActions';
import { profileInputs, profileTextAreas } from '../../../../constants';

const Container = styled.div`
 padding: 25px 10px;
`
export const Form = styled.form`
.form-group {
  margin: 1rem auto 0.5rem auto;
  padding: 10px;
  width: 100%;
}
`

export default function EditForm() {
  const { Globals: { userInfo } } = useReduxSelector()
  const dispatch = useReduxDispatch();
  const handleChange = (e) => {
    dispatch(editUserInfo(e.target.name, e.target.value ))
  }
  return (
    <Container>
      <InfoHeader>Infos</InfoHeader>
      <Form>
        { profileInputs.map(item => {
          const {name, inputType, description, title} = item;
          return(
            <div className="form-group" key ={name}>
              <InputLabel htmlFor={name}>{title}</InputLabel>
              <InputElement
                id={name} 
                name={name}  
                type={inputType}
                value={ userInfo[name] }
                onChange = {(e) => handleChange(e) }
                placeholder={description}/>
            </div>
          )
        })}
        { profileTextAreas.map(item => {
          const {name, description, title} = item;
          return(
            <div className="form-group" key={name}>
            <InputLabel htmlFor={name}>{title}</InputLabel>
              <TextArea 
                id={name}
                name={name}
                value={ userInfo[name] }
                onChange = {(e) => handleChange(e) }
                placeholder = { description }
              />
            </div>
          )
         })}
      </Form>
    </Container>
  )
}
