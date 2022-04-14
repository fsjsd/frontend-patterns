import styled from 'styled-components';

const Button = styled.button`
  border-radius: 6px;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  background-color: rgb(0, 127, 224);
  padding: 10px 14px;
  transition: background-color 0.3s ease;
  outline: none;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;

  &:hover {
    background-color: rgb(13, 150, 255);
  }

  &:active,
  &:hover:active {
    background-color: rgb(0, 98, 173);
  }
`;

export default Button