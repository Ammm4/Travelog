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
export const ShowLikesBtn = styled.button`
 ${CommonButtonTheme}
  margin-right: 0.65rem;
  font-size: 0.825rem;
  letter-spacing: 1px;
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
export const DeleteButton = styled(BtnAdd)`
   display: block;
   margin: 1.65rem auto;
   width: 99%;
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
export const CreateReplyBtn = styled.button`
  display: inline-block;
  background-color: #2a78cd;
  color: #fff;
  min-height: 35px;
  max-height: 35px;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
  align-self: end;
  &:disabled {
    background-color: #f1f1f1;
    color: #aaa;
  }
`
export const ViewReplyBtn = styled.button`
  ${ CommonButtonTheme };
  display: inline-flex;
  align-items: center;
  margin-left: 0.3rem;
  padding: 0.5rem 0.25rem;
  border-radius: 3px;
  &:hover {
    background-color:#ccc;
    color:#fff
  }
`
export const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #e1e1e1;
`
export const ViewPostReplyBtn = styled.button`
  ${ CommonButtonTheme};
  font-size: 0.825rem;
  margin-right: 0.5rem;
`