import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  background-color: white;
  border-bottom: solid 1px #e0e0e0;
  box-shadow: 0 -6px 15px 0px rgb(0 0 0 / 10%);
  display:flex;
`;

export const ContentHeaderLabel = styled.div`
  padding: 13px;
  flex-grow: 2;
`
export const ContentHeaderRight = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25em;
  padding:0;
  a {
    display:flex;
    padding:0;
    line-height:normal;
    color: rgb(0 100 176);
    text-decoration: underline;
    opacity:0.7;
    transition: opacity 0.2s ease-in-out;
    &:hover{
      color:rgb(0, 145, 255);
      opacity:1;
    }
  }
`
export const ContentHeaderIcon = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display:flex;
  padding:15px 15px 12px 15px;
  border-bottom: solid 3px transparent;
  ${props => props.selected && 'border-bottom: solid 3px rgb(0, 127, 224);'}
`;

const ContentHeader: React.FC = ({ children }) => {
  return (
    <Header>
      {children}
    </Header>
  )
}

export default ContentHeader