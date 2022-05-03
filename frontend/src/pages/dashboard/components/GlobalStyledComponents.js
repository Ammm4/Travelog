
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AuthLink = styled(Link)`
 text-decoration: none;
 display: flex;
 align-items: center;
 color: #021b41;
 &:hover {
   color: #2a78cd;
 }
`
export const AuthSpan = styled.span`
 display: flex;
 align-items: center;
 color: #021b41;
`
export const AvatarImage = styled.img`
  display: inline-block;
  width: 35px;
  height: 35px;
  margin: 0 0.3rem 0 0.35rem;
`
export const AuthorName = styled.span`
 font-weight: 600;
`
export const PostInteractions = styled.div`
margin: 0.55rem 0;
text-align: right;
cursor: pointer;
`
export const InteractionButton = styled.button`
  font-size: 1.4rem;
  height: 2.2rem;
  width: 2.2rem;
  line-height: 1rem;
  display: inline-block;
  
  margin-right: 18px;
  &:hover {
    background-color: #aaa;
    color:#fff;
  }
`
