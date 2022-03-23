import { Link } from "react-router-dom";
import styled from "styled-components";

export const DrawerNavigationStyled = styled.div`
  width: 240px;
  overflow: hidden;
`;

export const DrawerWrapper = styled.div<{ isOpen: boolean }>`
  position: relative;
  width: 480px;
  left: 0;
  display: flex;
  transition: ease 0.3s left;
  ${props =>
    props.isOpen
      ? `
    left: -240px;`
      : ``}
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

export const LinkStyled = styled(Link)`
  width: 240px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.55);
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
`;