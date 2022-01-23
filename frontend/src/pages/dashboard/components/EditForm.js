import React from 'react';
import styled, { css } from 'styled-components';

const sharedInputCss = css`
  outline: none;
  width: 100%;
  max-width: 400px;
  border: 1px solid #eee;
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 10px 16px;
  border-radius: 10px;
`
const Container = styled.div`
 padding: 30px 10px;
 h3 {
   letter-spacing: 2px;
 }
`
export const Form = styled.form`
.form-group {
  margin: 1rem auto 0.5rem auto;
  padding: 10px;
  width: 100%;
}
input {
  ${sharedInputCss}
}
label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  letter-spacing: 1px;
}
textarea {
  resize: none;
  font-family: 'Roboto', sans-serif;
  height: 150px;
  ${sharedInputCss}
}
input:focus, textarea:focus {
  border: 1px solid blue;
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
      <h3>INFOs</h3>
      <Form>
        <div className="form-group">
          <label htmlFor="username"><b>Username</b></label>
            <input 
              id="username" 
              name="username" 
              type="text"
              value={ infos.username }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter Username Please"/>

        </div>
        <div className="form-group">
          <label htmlFor="email"><b>Email</b></label>
            <input 
              id="email" 
              name="email" 
              type="email"
              value={ infos.email }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter Email Please!"/>
        </div>
        <div className="form-group">
          <label htmlFor="about"><b>About</b></label>
            <textarea 
              id="about"
              name="about"
              value={ infos.about }
              onChange = {(e) => handleChange(e) }
            />
        </div>
        <div className="form-group">
          <label htmlFor="hobbies"><b>Hobbies</b></label>
            <textarea 
              id="hobbies"
              name="hobbies"
              value={ infos.hobbies }
              onChange = {(e) => handleChange(e) }
            />
        </div>
         <div className="form-group">
          <label htmlFor="city"><b>City</b></label>
            <input 
              id="city" 
              name="city" 
              type="city"
              value={ infos.city }
              onChange = {(e) => handleChange(e) }
              placeholder="Enter City Please!"/>
        </div>
         <div className="form-group">
          <label htmlFor="email"><b>Country</b></label>
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
