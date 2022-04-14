import styled from 'styled-components';

export const Toolbar = styled.div.attrs({
  role: "toolbar"
})`
  background-color:#eff8ff;
  display:flex;
  flex-direction:row;
  cursor:pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const ToolbarButton = styled.div.attrs({
  role: "button"
})`
  flex-grow:0;

  display: flex;
  align-items: center;

  background-color:#eff8ff;
  padding:1em;
  
  &:hover{
    background-color:#f6fbff;
    color:black;
  }

  svg {
    margin-right:0.25em;
  }
`;

export const ToolbarSpacer = styled.div`
  flex-grow:2;
`;

export const ToolbarLabel = styled.label.attrs({
  role: "label"
})`
  padding:1em;
  align-items:flex-end;
`;