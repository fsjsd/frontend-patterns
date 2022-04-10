import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LogoGithub } from "./icons/Github.svg";
import { ReactComponent as LogoYoutube } from "./icons/Youtube.svg";

const Header = styled.header`
  padding: 1rem;
  background-color: #0091ff;
  display: flex;
  flex-direction: row;
  color: white;
`;

const HeaderPageTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  flex-grow: 2;
`;

const Links = styled.div`
  align-self: flex-end;
  font-size: 1px;
  color: white;
`

const externalLinkIcon = {
  height: "24px",
  marginLeft: "10px",
  cursor: "pointer"
}

const appLogoLink = {
  display: "block"
}

export const PageHeader = () => {
  return (
    <Header>
      <HeaderPageTitle>
        <b>
          Front-End
        </b>
        {" "}
        Design Patterns
      </HeaderPageTitle>
      <Links>
        <a href="https://github.com/fsjsd/frontend-patterns" target="_blank" rel="noreferrer">
          <LogoGithub style={externalLinkIcon} />
        </a>
        <a
          href="https://www.youtube.com/channel/UC6ndgitE_bgJ02nyrrue-1A"
          target="_blank" rel="noreferrer"
        >
          <LogoYoutube style={externalLinkIcon} />
        </a>
        <a
          href="https://fsjs.dev"
          target="_blank"
          style={appLogoLink} rel="noreferrer"
          title="fsjs.dev - Full Stack Javascript Development"
        >
        </a>
      </Links>
    </Header>
  )
}
