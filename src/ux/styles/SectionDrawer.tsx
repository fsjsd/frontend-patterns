import styled, { css } from "styled-components";
import { navigationBreakpoint } from "../designsystem/responsive/breakpoints";

export const SectionDrawer = styled.section<{ visible: boolean }>`
  flex: 0 0 auto;
  border-left: solid 1px rgb(218, 231, 241);
  background-color: rgb(246, 250, 253);

  position:absolute;
  width:100%;
  z-index:100;
  margin-top:60px;
  transition: transform 0.2s ease-in-out;

  ${props => props.visible
    ? css`
      transform: translateX(0);
    `
    : css`
      transform: translateX(-100%);
    `}


  @media ${navigationBreakpoint} {
    transform: translateX(0);
    margin-top:0px;
    position:inherit;
    z-index:inherit;
    width: 240px;
    display: block;
  }
`;
