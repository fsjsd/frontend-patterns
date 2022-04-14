import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { navigationBreakpoint } from "./designsystem/responsive/breakpoints";

/**
 * Container for navigation drawer, applying slide out treatment
 * on Mobile screens by default, fixed position on larger screens
 */
export const NavigationDrawer = styled.section<{ visible: boolean }>`
  display:flex;
  flex: 0 0 auto;
  flex-direction:column;
  pointer-events:none;

  position:absolute;
  width:100%;
  height:100%;
  z-index:100;
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
  }
`;

export const NavigationScrollArea = styled.div`
  width: 100%;
  flex-grow:1;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling:touch;
  border-left: solid 1px rgb(218, 231, 241);
  background-color: rgb(246, 250, 253);
  pointer-events:all;
  
  @media ${navigationBreakpoint} { 
    width: 240px;
  }
`;

export const SubMenuWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  left: 0;
  transition: ease 0.3s left;
  ${props =>
    props.isOpen
      ? `left: -240px;`
      : ``}

  width: 100%;
  @media ${navigationBreakpoint} { 
    width: 480px;
  }

`;

export const NavGroup = styled.div`
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  padding: 0 20px;
  font-size: 13px;

  margin: 24px 0 10px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.66);
`;

export const NavLinks = styled.ul`
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
`;

/**
 * $wip is a transient prop: https://styled-components.com/docs/api#transient-props
 */
export const LinkStyled = styled(Link) <{ $wip: boolean }>`
  width: 100%;
  font-size: 0.85rem;
  ${props => props.$wip
    ? 'color: #949494;'
    : 'color: #444;'}
  
  padding: 12px 16px;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  transition: ease 0.5s color, ease 0.2s background-color;
  display: flex;

  &.active {
    background-color: rgb(220, 240, 255);
    color: rgb(33, 111, 212);
    span,
    label {
      color: rgb(33, 111, 212);
    }
  }

  &:hover, &.active:hover {
    background-color: rgb(242, 249, 255);
    color: rgb(33, 111, 212);
    span,
    label {
      color: rgb(33, 111, 212);
    }
  }

  label {
    color: rgba(0, 0, 0, 0.75);
    flex-grow: 2;
    cursor: pointer;
  }

  svg{
    font-size: 18px;
  }

  svg:first-child {
    margin-right: 10px;
  }
  
  @media ${navigationBreakpoint} { 
    width: 240px;
  }
`;