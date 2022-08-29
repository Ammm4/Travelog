import styled from "styled-components";
import { Link } from "react-router-dom";
import { CommonButtonTheme } from "./Buttons";

export const StyledLink = styled(Link)`
  text-decoration: none;
  ${ CommonButtonTheme }
`
export const PostForumLink = styled(Link)`
text-decoration: none;
color: #021b41;
`
export const AuthLink = styled(Link)`
 text-decoration: none;
 display: flex;
 align-items: center;
 color: #021b41;
 &:hover {
   color: #2a78cd;
 }
`