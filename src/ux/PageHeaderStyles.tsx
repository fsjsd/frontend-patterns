import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components'
import { navigationBreakpoint } from './designsystem/responsive/breakpoints';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3.5rem;

  height: 3.5rem;
  padding: 0rem 1rem;
  background-color: #0076D1;
  color: white;
`;

export const HeaderPageTitle = styled.h1`
  font-weight: 400;
  font-size: 1.25rem;
  line-height:inherit;
  flex-grow: 2;
  color:inherit;
  margin:0;
  padding:0;
`;

export const Links = styled.div`
  font-size: 1px;
  color: white;
  display: none;
  @media ${navigationBreakpoint} { 
    display: block;
    align-items: center;
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