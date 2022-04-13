import styled from "styled-components";
import { navigationBreakpoint } from './designsystem/responsive/breakpoints';

export const ContentHeaderLabel = styled.h2`
  font-size: 1em;
  font-weight: inherit;
  color: inherit;
  padding: 13px;
  flex-grow: 2;
  display:flex;
  align-items:center;
`;

export const ContentHeaderRight = styled.div`
  align-items: center;
  font-size: 1.25em;
  padding:0;

  a {
    display:flex;
    padding:0;
    line-height:normal;
    color: rgb(0 100 176);
    text-decoration: underline;
    transition: opacity 0.2s ease-in-out;
  }
  
  display: none;
  @media ${navigationBreakpoint} { 
    display: flex;
  }
`
export const ContentHeaderIcon = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  padding: 15px 15px 12px 15px;
  border-bottom: solid 3px transparent;
  ${props => props.selected && 'border-bottom: solid 3px rgb(0, 127, 224);'}
  opacity:0.6;

  &:hover{
    color:rgb(0, 145, 255);
    opacity:1;
  }
`;

export const ContentHeader = styled.header`
  background-color: white;
  border-bottom: solid 1px #e0e0e0;
  box-shadow: 0 -6px 15px 0px rgb(0 0 0 / 10%);
  display:flex;
  flex-grow:0;
`;

/**
 * Styling for loaded Markdown files 
 */
export const ContentArticle = styled.div`
  scroll-behavior: smooth;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
  flex-grow: 1;
  font-size:0.85em;
  padding: 15px;
  
  h1{
    font-weight:700;
    font-size:1.25em;
  }
  h2{
    font-weight:700;
    font-size:1em;
  }
  h3,h4{
    font-weight:700;
  }
  p{
    margin-bottom:0.75em;
  }
  ul {
    padding-left: 1.5em;
    margin-bottom:0.75em;
  }
  li{
    list-style:disc;
  }
`;

export const ContentFooter = styled.section`
  border-top: solid 1px #ccc;
  background-color: white;
  padding: 10px;
  box-shadow: 0 -3px 15px 0px rgb(0 0 0 / 10%);
  font-size: 12px;
  display: flex;  
`;