import styled from "styled-components";

export const TypeAheadWrapper = styled.div`
  box-sizing:border-box;
`;

export const TypeAheadInput = styled.input`
  padding: 0.5rem;
  width:200px;
  box-sizing:border-box;
  border:solid 1px #ccc;
  border-radius:3px;
  :active{
    outline: solid 1px #bbb;
    border:solid 1px #bbb;
  }
`;

export const TypeAheadResultsWrapper = styled.div`
  position:absolute;
  width:300px;
  max-height:400px;
  overflow-y:auto;
  border:solid 1px #ccc;
  border-radius:3px;
  background-color:white;
  padding:3px;
  box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 10%);
  margin-top:2px;
`;

export const TypeAheadResultItem = styled.div`
  padding: 0.5rem;
  background-color:transparent;
  border:none;
  text-align:left;
  font-size:0.85em;
  border-radius:3px;
  cursor:pointer;
  &[aria-selected="true"],
  &:active {
    background-color: #ccc;
  }
  &:hover{
    background-color: #ddd;
  }
`;

export default {};