import styled from "styled-components";
import { navigationBreakpoint } from "./ux/designsystem/responsive/breakpoints";

/** Sets contents to fixed, full screen */
export const FixedApp = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

/** Core styling and container, flex has to be separate from fixed treatment */
export const SiteContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: Roboto, Arial, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const SectionMain = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`

export const HeaderBrand = styled.header`
  padding: 1rem;
  background-color: #0091ff;
  color: #fff;
  background-color: #007fe0;
  font-size: 1px;
  visibility: hidden;
  pointer-events: none;
  @media ${navigationBreakpoint} { 
    visibility: visible;
    pointer-events:all;
  }
`