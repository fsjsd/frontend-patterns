import React from 'react'
import { ReactComponent as LogoGithub } from "./icons/Github.svg";
import { ReactComponent as LogoYoutube } from "./icons/Youtube.svg";
import { Header, HeaderPageTitle, Links, MenuButton } from './PageHeaderStyles';

const externalLinkIcon = {
  height: "24px",
  marginLeft: "10px",
  cursor: "pointer"
}

/**
 * Top header for site
 * @param param0
 * @returns 
 */
export const PageHeader = ({ onMenuClick, showLinks }) => {

  const handleMenuClick = () => {
    onMenuClick();
  }

  return (
    <Header role="banner">
      {showLinks && <MenuButton
        role="button"
        aria-label='Site navigation'
        onClick={handleMenuClick}
      />}
      <HeaderPageTitle>
        <b>
          Front-End
        </b>
        {" "}
        Design Patterns
      </HeaderPageTitle>
      {showLinks && <Links>
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
      </Links>}
    </Header>
  )
}
