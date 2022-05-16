import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { commonLabel, commonInput } from '../PostForm';
import { InfoHeader } from '../GlobalComponents/StyledComponents/Headings';
import { TextArea, InputLabel, InputElement} from '../GlobalComponents/StyledComponents/Inputs';
import { editUserInfo } from '../../../../redux/globals/globalActions';

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
  const { Globals: { userInfo: { username, email, about, hobbies, city, country }} } = useSelector(state => state)
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(editUserInfo(e.target.name, e.target.value ))
  }
  return (
    <Container>
      <InfoHeader>Infos</InfoHeader>
      <Form>
        <div className="form-group">
          <InputLabel htmlFor="username">Username</InputLabel>
          <input 
              id="username" 
              name="username" 
              type="text"
              value={ username }
              onChange = {(e) => handleChange(e) }
              placeholder="Add Username Please"/>

        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
            <InputElement 
              id="email" 
              name="email" 
              type="email"
              value={ email }
              onChange = {(e) => handleChange(e) }
              placeholder="Add Email Please!"/>
        </div>
        <div className="form-group">
          <InputLabel htmlFor="about">About</InputLabel>
            <TextArea 
              id="about"
              name="about"
              value={ about }
              onChange = {(e) => handleChange(e) }
              placeholder = { !about && 'Add Something About You'}
            />
        </div>
        <div className="form-group">
          <InputLabel htmlFor="hobbies">Hobbies</InputLabel>
            <TextArea 
              id="hobbies"
              name="hobbies"
              value={ hobbies }
              onChange = {(e) => handleChange(e) }
              placeholder={ !hobbies && 'Add Your Hobbies'}
            />
        </div>
         <div className="form-group">
          <label htmlFor="city">City</label>
            <InputElement 
              id="city" 
              name="city" 
              type="city"
              value={ city }
              onChange = {(e) => handleChange(e) }
              placeholder={ !city && 'Add the city where you live'}/>
        </div>
         <div className="form-group">
          <InputLabel htmlFor="country">Country</InputLabel>
            <InputElement 
              id="country" 
              name="country" 
              type="country"
              value={ country }
              onChange = {(e) => handleChange(e) }
              placeholder={ !country && 'Add the country where you live'}/>
        </div>
      </Form>
    </Container>
  )
}
