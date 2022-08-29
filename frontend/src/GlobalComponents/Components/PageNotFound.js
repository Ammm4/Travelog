import React from 'react';
import styled from 'styled-components';
import { H2, H3 } from '../../GlobalComponents/StyledComponents/Headings';
import { GoToHomeLink } from '../StyledComponents/Links';
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding-top: 6rem;
  background-color: #fff;
`
const Container = styled.div`
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
`
export default function PageNotFound({ home, msg }) {
  return (
    <Wrapper>
      <Container>
        <H2>Oops!!</H2>
        <H3>{ msg }</H3>
        <GoToHomeLink to={ home }>Go To Home</GoToHomeLink>
      </Container>
    </Wrapper>
  )
}
