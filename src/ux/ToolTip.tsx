import React from 'react'
import styled from 'styled-components';

const ToolTipStyled = styled.div<{ isVisible: boolean }>`
  position: absolute;
  display: ${props => props.isVisible ? "inline-block" : "none"};
  bottom: 50px;
  max-width: 300px;
  color: rgb(31 41 55 / 1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0,  0.05);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgb(255 255 255 / 1);
  border-color: rgb(229 231 235 / 1);
  border-width: 1px;
  border-radius: 0.5rem;
  z-index: 10;
`;

const ToolTip: React.FC<{ isVisible: boolean }> = ({ isVisible, children }) => {
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