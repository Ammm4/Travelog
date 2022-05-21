import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '../../../GlobalComponents/StyledComponents/Paragraphs';
import { useReduxSelector } from '../../../utils';
const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 10px;
  border: 1px solid #dd0000;
  border-radius: 4px;
  -moz-box-shadow:    inset 0 0 5px #aaaaaa;
   -webkit-box-shadow: inset 0 0 5px #aa0000;
   box-shadow:         inset 0 0 5px #ffaaaa;
`
export default function ErrorBox({ errorRef }) {
  const { Globals: { loginData: { errors } } } = useReduxSelector();
  useEffect(() => {
    errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [errorRef])
  return (
    <Container ref={errorRef}>
      <ErrorMessage>There was a problem</ErrorMessage>
      <p>{errors.message}</p>
    </Container>
  )
}
