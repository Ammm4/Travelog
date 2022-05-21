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