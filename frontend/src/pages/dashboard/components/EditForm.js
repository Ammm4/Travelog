import React from 'react';
import styled from 'styled-components';
import { commonLabel, commonInput } from './PostForm';
import { InfoHeader } from '../pages/profile';

const Container = styled.div`
 padding: 25px 10px;
`
export const Form = styled.form`
.form-group {
  margin: 1rem auto 0.5rem auto;
  padding: 10px;
  width: 100%;
}
input {
  ${ commonInput }
}
label {
  ${ commonLabel }
}
textarea {
  resize: none;
  font-family: 'Roboto', sans-serif;
  height: 150px;
  ${ commonInput }
}
textarea:focus {
  border: 1px solid #021b41;
  border-left: 5px solid #021b41;
}
`
export default function EditForm(props) {
  const { infos, setInfos, saveButton, setSave } = props;
  const handleChange = (e) => {
    if(!saveButton) setSave(true);
    setInfos({...infos, [e.target.name] : e.target.value})
  }
  return (
    <Container>
      <InfoHeader>Infos</InfoHeader>
      <Form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
            <input 
              id="username" 
              name="username" 
              type="text"
              value={ infos.username }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter Username Please"/>

        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email"
              value={ infos.email }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter Email Please!"/>
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
            <textarea 
              id="about"
              name="about"
              value={ infos.about }
              onChange = {(e) => handleChange(e) }
            />
        </div>
        <div className="form-group">
          <label htmlFor="hobbies">Hobbies</label>
            <textarea 
              id="hobbies"
              name="hobbies"
              value={ infos.hobbies }
              onChange = {(e) => handleChange(e) }
            />
        </div>
         <div className="form-group">
          <label htmlFor="city">City</label>
            <input 
              id="city" 
              name="city" 
              type="city"
              value={ infos.city }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter City Please!"/>
        </div>
         <div className="form-group">
          <label htmlFor="email">Country</label>
            <input 
              id="country" 
              name="country" 
              type="country"
              value={ infos.country }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter Country Please!"/>
        </div>
      </Form>
    </Container>
  )
}
