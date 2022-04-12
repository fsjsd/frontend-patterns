import styled from "styled-components";

/**
 * Styling for loaded Markdown files 
 */
const ContentArticle = styled.div`
  scroll-behavior: smooth;
  overflow-y: auto;
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

export default ContentArticle;