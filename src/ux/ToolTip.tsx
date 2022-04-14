import React, { PropsWithChildren } from 'react'
import styled from 'styled-components';

const ToolTipStyled = styled.div<{ isVisible: boolean }>`
  position: absolute;
  display: ${props => props.isVisible ? "inline-block" : "none"};
  bottom: 50px;
  max-width: 300px;
  color: rgb(31 41 55 / 1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0,  0.1);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #fff;
  border: solid #ccc 1px;
  border-radius: 0.25rem;
  z-index: 10;
`;

const ToolTip: React.FC<PropsWithChildren<{ isVisible: boolean }>> = ({ isVisible, children }) => {
  return (
    <ToolTipStyled
      role="tooltip"
      isVisible={isVisible}
      aria-hidden={!isVisible}
    >
      {children}
    </ToolTipStyled >
  )
}

export default ToolTip