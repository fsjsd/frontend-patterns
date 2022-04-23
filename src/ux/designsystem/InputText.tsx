import styled from "styled-components";


const InputText = styled.input<{ error?: boolean }>`
  color: inherit;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1rem;
  margin-top: 0.25rem;
  display: block;
  width: -moz-fit-content;
  width: fit-content;
  border-radius: 0.375rem;
  border-color: rgb(209 213 219 / 1);
  box-shadow: 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);
  appearance: none;
  background-color: #fff;
  border-width: 1px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  margin: 0;
  &:focus{
    outline-style: none;
    border-color: rgb(99 102 241 / 1);
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: none;
  }
  ${({ error }) => error && `
  outline-style: none;
  box-shadow: none;
  border-color: transparent;
  border-color: red;
  &:focus{
    outline-style: none;
    border-color: red;
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: none;
  }
  `}
`;


export default InputText;