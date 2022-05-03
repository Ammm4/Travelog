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