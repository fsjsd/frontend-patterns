import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components'
import { navigationBreakpoint } from './designsystem/responsive/breakpoints';

export const Header = styled.header`
  padding: 1rem;
  background-color: #0076D1;
  display: flex;
  flex-direction: row;
  color: white;
`;

export const HeaderPageTitle = styled.h1`
  font-weight: 400;
  font-size: 20px;
  flex-grow: 2;
  color:inherit;
  margin:0;
`;

export const Links = styled.div`
  align-self: flex-end;
  font-size: 1px;
  color: white;
  display: none;
  @media ${navigationBreakpoint} { 
    display: block;
  }
`
export const MenuButton = styled(GiHamburgerMenu)`
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
  display: block;
  @media ${navigationBreakpoint} { 
    display: none;
  }
`