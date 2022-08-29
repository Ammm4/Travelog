import { Link } from "react-router-dom";
import styled from "styled-components";

export const AuthLink = styled(Link)`
 color: #2671d3;
 text-decoration: none;
 letter-spacing: 1.8px;
 &:hover {
   border-bottom: 1px solid #2671d3;
 }
`
export const SignUpLink = styled(Link)`
   display: inline-block;
   width: 100%;
   max-width: 400px;
   border: 1px solid #2e5c99;
   color: #2e5c99;
   padding: 16px 40px;
   text-align: center;
   text-decoration: none;
   &:hover {
     background-color: #2a78cd;
     border: 1px solid #2a78cd;
     color: #fff;
   }
`
export const LogoLink = styled(Link)`
  text-decoration: none;
`
export const GoToHomeLink = styled(Link)`
  text-decoration: none;
  display: block;
  background-color: #021b41;
  color: #fff;
  letter-spacing: 0.8px;
  font-size: 1.2rem;
  margin: 1rem auto;
  padding: 16px;
  border-radius: 3px;
  width: 200px;
  text-align: center;
  &:hover {
    background-color: #2a78cd;
  }
`