import React, { Suspense, useEffect, useState } from "react";
import { MdCode, MdNotes, MdOutlinePlayCircleOutline } from "react-icons/md";
import styled from "styled-components";
import { GITHUB_ROOT } from "../utils/constants/urls";
import ContentHeader, { ContentHeaderIcon, ContentHeaderLabel, ContentHeaderRight } from "./ContentHeader";
import Loading from "./Loading";
const ReactMarkdown = React.lazy(() => import('react-markdown'))

export const ContentWrapperStyled = styled.section`
  padding: 15px;
  flex-grow: 1;
  overflow-y: auto;
`;

const ContentWrapperArticle = styled.div`
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

interface ContentWrapperProps {
  title: string;
  codeLink?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markDownPromise?: Promise<any>;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, title, markDownPromise, codeLink }) => {
  const [viewNotes, setViewNotes] = useState(false);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    (async () => {
      if (viewNotes && markDownPromise !== undefined) {
        const markdownModule = await markDownPromise;
        console.log(markdownModule.default)
        const markdownResponse = await fetch(markdownModule.default)
        const markdown = await markdownResponse.text()
        setMarkdown(markdown);
      }
    })();
  }, [viewNotes])
  return <>
    <ContentHeader>
      <ContentHeaderLabel role="heading">{title}</ContentHeaderLabel>
      <ContentHeaderRight>
        <ContentHeaderIcon role="button" selected={!viewNotes} title="Run demo" onClick={() => setViewNotes(false)}>
          <MdOutlinePlayCircleOutline />
        </ContentHeaderIcon>
        {markDownPromise !== undefined && <ContentHeaderIcon role="button" selected={viewNotes} title="View notes" onClick={() => setViewNotes(true)}>
          <MdNotes />
        </ContentHeaderIcon>}
        {codeLink && <ContentHeaderIcon role="button" selected={false} title="View code on github">
          <a href={`${GITHUB_ROOT}${codeLink}`} target="_blank" rel="noopener noreferrer"><MdCode /></a>
        </ContentHeaderIcon>}
      </ContentHeaderRight>
    </ContentHeader>
    <>
      {viewNotes &&
        <ContentWrapperArticle role="main">
          <Suspense fallback={<Loading />}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Suspense>
        </ContentWrapperArticle>}
      {!viewNotes &&
        <ContentWrapperStyled role="main">{children}</ContentWrapperStyled>}
    </>
  </>
};