import styled from "styled-components";
import { navigationBreakpoint } from "../designsystem/responsive/breakpoints";

export const HeaderBrand = styled.header`
  padding: 1rem;
  background-color: #0091ff;
  color: #fff;
  background-color: #007fe0;
  font-size: 1px;
  display: none;
  @media ${navigationBreakpoint} { 
    display: block;
  }
`