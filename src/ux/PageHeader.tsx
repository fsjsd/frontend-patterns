import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components'
import { navigationBreakpoint } from './designsystem/responsive/breakpoints';
import { ReactComponent as LogoGithub } from "./icons/Github.svg";
import { ReactComponent as LogoYoutube } from "./icons/Youtube.svg";

const Header = styled.header`
  padding: 1rem;
  background-color: #0076D1;
  display: flex;
  flex-direction: row;
  color: white;
`;

const HeaderPageTitle = styled.h1`
  font-weight: 400;
  font-size: 20px;
  flex-grow: 2;
  color:inherit;
  margin:0;
`;

const Links = styled.div`
  align-self: flex-end;
  font-size: 1px;
  color: white;
  display: none;
  @media ${navigationBreakpoint} { 
    display: block;
  }
`

const externalLinkIcon = {
  height: "24px",
  marginLeft: "10px",
  cursor: "pointer"
}

const MenuButton = styled(GiHamburgerMenu)`
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
  display: block;
  @media ${navigationBreakpoint} { 
    display: none;
  }
`

export const PageHeader = ({ onMenuClick }) => {

  const handleMenuClick = () => {
    onMenuClick();
  }

  return (
    <Header role="banner">
      <MenuButton role="button" onClick={handleMenuClick} />
      <HeaderPageTitle>
        <b>
          Front-End
        </b>
        {" "}
        Design Patterns
      </HeaderPageTitle>
      <Links>
        <a
          href="https://github.com/fsjsd/frontend-patterns"
          aria-label="View fsjs.dev on GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <LogoGithub style={externalLinkIcon} />
        </a>
        <a
          href="https://www.youtube.com/channel/UC6ndgitE_bgJ02nyrrue-1A"
          aria-label="View videos on Youtube"
          target="_blank"
          rel="noreferrer"
        >
          <LogoYoutube style={externalLinkIcon} />
        </a>
        <a
          href="https://fsjs.dev"
          target="_blank"
          style={{ display: "block" }} rel="noreferrer"
          title="fsjs.dev - Full Stack Javascript Development"
        >
        </a>
      </Links>
    </Header>
  )
}
