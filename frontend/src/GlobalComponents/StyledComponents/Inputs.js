import styled from "styled-components";
export const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
  text-transform: capitalize;
  color:#004684;
  line-height: 2.4rem;
  letter-spacing: 0.8px;
  font-weight: bold;
`

export const Input = styled.input`
  outline: none;
  width: 100%;
  max-width: 400px;
  border: ${ props => props.errors ? '1px solid #f00' : '1px solid #ccc' };
  color:#666666;
  font-size: 1.2rem;
  line-height: 2rem;
  padding: 17px 14px 17px 4px;
  &:focus {
      border: 1px solid #2e5c99;
      border-left: 5px solid #2e5c99;
  }
`
export const Submit = styled.input`
 width: 100%;
 outline: none;
 padding: 16px 40px;
 background-color: #2e5c99;
 border: 1px solid #2e5c99;
 color: #fff;
 margin: 1rem auto;
 font-weight: 400;
 font-size: 1rem;
 letter-spacing: .4px;
 border-radius: 2px;
  &:hover {
      background-color: #2a78cd;
    }
  }
  &:disabled {
    background-color: #ccc;
    border: none;
  }
`
