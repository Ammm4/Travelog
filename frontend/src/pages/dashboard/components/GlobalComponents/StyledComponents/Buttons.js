import styled,{ css } from 'styled-components';

export const CommonButtonTheme = css`
  display: inline-block;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
  color: #021b41;
  font-size: 1rem;
  &:hover {
    color: #2a78cd;
  }
`
export const Button = styled.button`
${CommonButtonTheme}
`