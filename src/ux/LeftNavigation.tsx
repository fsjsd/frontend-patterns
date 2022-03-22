import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DrawerNavigationStyled = styled.div`
  width: 240px;
  overflow: hidden;
`;

const DrawerWrapper = styled.div<{ isOpen: boolean }>`
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

const NavLinks = styled.ul`
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
`;

const LinkStyled = styled(Link)`
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

const LeftNavigation = () => {
  return (
    <DrawerNavigationStyled>
      <DrawerWrapper isOpen={false}>
        <NavLinks>
          <LinkStyled to="/carousel">Carousel</LinkStyled>
        </NavLinks>
      </DrawerWrapper>
    </DrawerNavigationStyled>
  )
}

export default LeftNavigation