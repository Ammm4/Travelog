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
export const ScrollUpBtn = styled.button`
  ${CommonButtonTheme}
  display: block;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`
export const BtnImg = styled.button`
  ${CommonButtonTheme}
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  background-color: transparent;
`
export const BtnAdd = styled.button`
 ${ CommonButtonTheme }
 padding: 16px 40px;
 border-radius: 2px;
 background-color: #021b41;
 letter-spacing: .5px;
 color: #fff;
  &:hover {
  background-color: #2a78cd;
  color: #fff;
}
`
export const ClearInputBtn = styled.button`
 ${ CommonButtonTheme }
 color: #ff0909;
`
export const CloseModalBtn = styled.button`
  ${ CommonButtonTheme }
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 2.5rem;
  color: #fff;
  &:hover {
    color: #f00;
  }
`