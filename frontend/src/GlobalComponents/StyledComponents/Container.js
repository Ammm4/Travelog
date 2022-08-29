import styled from "styled-components";

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  p {
   padding-top: 0.5rem;
   font-size: 0.95rem;
  }
`
export const InputContainer = styled.div`
  margin: 2.25rem auto;
`
export const ToggleLinkContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  font-size: 0.95rem;
`
export const NavContainer = styled.div`
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 75px;
  background-color: transparent;
  color: #021b41;
  padding: 5px 8px;
  display: flex;
  justify-items: center;
  align-items: center;
  transition: .5s all ease-in;
  &:hover {
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
  }
`

export const ForgotPasswordContainer = styled.div`
width: 100%;
padding-top: 5rem;
min-height: 100vh;
background-color: #fff;
`