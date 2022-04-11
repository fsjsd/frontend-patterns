import styled from "styled-components";

export const TypeAheadWrapper = styled.div`
  border:solid 1px #ccc;
  padding:10px;
  width:200px;
  box-sizing:border-box;
`;

export const TypeAheadInput = styled.input`
  padding: 0.5rem;
  width:100%;
  box-sizing:border-box;
  border:solid 1px #ccc;
`;

export const TypeAheadResultItem = styled.button`
  padding: 0.5rem;
  background-color:transparent;
  border:none;
  width:100%;
  text-align:left;
  :active{
    background-color: #ccc;
  }
`;

export default {};