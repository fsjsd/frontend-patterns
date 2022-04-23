import styled from 'styled-components';

const Legend = styled.legend<{ error?: boolean }>`
  display: block;
  float:left;
  padding: 4px 0px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  color: rgb(55 65 81 / 1); 
  ${({ error }) => error && `color: red;`}
`;

export default Legend