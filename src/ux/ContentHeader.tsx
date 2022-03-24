import React, { ReactChild } from 'react'
import styled from 'styled-components'

const Header = styled.div`
  background-color: white;
  border-bottom: solid 1px #e0e0e0;
  box-shadow: 0 -6px 15px 0px rgb(0 0 0 / 10%);
`;

export const ContentHeaderLabel = styled.div`
  padding: 15px;
`

const ContentHeader = ({ children }: { children: ReactChild }) => {
  return (
    <Header>
      {children}
    </Header>
  )
}

export default ContentHeader