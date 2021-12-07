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
`
const Form = styled.form`
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
}
textarea {
  resize: none;
  font-family: 'Roboto', sans-serif;
  height: 150px;
  ${sharedInputCss}
}
`
export default function EditForm(props) {
  const { infos, setInfos } = props;

  return (
    <Container>
      <h3>Edit Info</h3>
      <Form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
            <input 
              id="username" 
              name="username" 
              type="text"
              value={ infos.username }
              onChange = {(e) => setInfos({...infos, [e.target.name] : e.target.value}) }
              placeholder="Enter Username Please"/>

        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email"
              value={ infos.email }
              onChange = {(e) => setInfos({...infos, [e.target.name] : e.target.value}) }
              placeholder="Enter Email Please!"/>
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
            <textarea 
              id="about"
              name="about"
              value={ infos.about }
              onChange = {(e) => setInfos({...infos, [e.target.name] : e.target.value}) }
            />
        </div>
        <div className="form-group">
          <label htmlFor="hobbies">Hobbies</label>
            <textarea 
              id="hobbies"
              name="hobbies"
              value={ infos.hobbies }
              onChange = {(e) => setInfos({...infos, [e.target.name] : e.target.value}) }
            />
        </div>
         <div className="form-group">
          <label htmlFor="city">City</label>
            <input 
              id="city" 
              name="city" 
              type="city"
              value={ infos.city }
              onChange = {(e) => setInfos({...infos, [e.target.name] : e.target.value}) }
              placeholder="Enter City Please!"/>
        </div>
         <div className="form-group">
          <label htmlFor="email">Country</label>
            <input 
              id="country" 
              name="country" 
              type="country"
              value={ infos.country }
              onChange = {(e) => setInfos({...infos, [e.target.name] : e.target.value}) }
              placeholder="Enter Country Please!"/>
        </div>
      </Form>
    </Container>
  )
}
