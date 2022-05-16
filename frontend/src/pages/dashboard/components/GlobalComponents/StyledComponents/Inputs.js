import styled from "styled-components";
export const InputLabel = styled.label`
  display: block;
  margin: 0 0 0.95rem 0;
  font-weight: 600;
  letter-spacing: 0.8px;
`
export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: 1px solid #ccc;
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
  border: 1px solid #ccc;
  padding: 16px 18px;
  border-radius: 2px;
  letter-spacing: 1px;
  font-size: 1rem;
  &:focus {
        border: 1px solid #021b41;
        border-left: 5px solid #021b41;
  }
`