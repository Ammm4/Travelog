import styled, { css } from "styled-components";

export const CommonTextAreaTheme = css`
  width: 99%;
  height: 40px;
  padding: 8px;
  resize: none;
  border: 1px solid #888;
  font-family: inherit;
  font-size: 0.9rem;
  border-radius: 2px;
  letter-spacing: 1px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.5)
  }
`
export const InputLabel = styled.label`
  display: block;
  margin: 0 0 0.95rem 0;
  font-weight: 600;
  letter-spacing: 0.8px;
  color:#004684;
`
export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: ${ props => props.errors ? '1px solid #f00' : '1px solid #ccc'};
  padding: 10px 16px;
  border-radius: 2px;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
    }
`
export const Select = styled.select`
  outline: none;
  padding: 16px 40px 16px 5px;
  border-radius: 2px;
  border: ${ props => props.errors ? '1px solid #f00' : '1px solid #ccc'};
  font-size: 1rem;
  cursor:pointer;
    &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
      }
`
export const InputElement = styled.input`
  width: 100%;
  outline: none;
  border: ${ props => props.errors ? '1px solid #f00' : '1px solid #ccc'};
  padding: 16px 18px;
  border-radius: 2px;
  letter-spacing: 1px;
  font-size: 1rem;
  &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
  }
`
export const CommentTextArea = styled.textarea`
  ${CommonTextAreaTheme}
`
export const ReplyTextArea =  styled.textarea`
  ${CommonTextAreaTheme}
`
