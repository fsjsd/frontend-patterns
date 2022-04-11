import React, { Suspense, useEffect, useState } from "react";
import { MdNotes, MdOutlinePlayCircleOutline } from "react-icons/md";
import { GoMarkGithub } from "react-icons/go";
import styled from "styled-components";
import { GITHUB_ROOT } from "../utils/constants/urls";
import ContentHeader, { ContentHeaderIcon, ContentHeaderLabel, ContentHeaderRight } from "./styles/ContentHeader";
import Loading from "./Loading";
const ReactMarkdown = React.lazy(() => import('react-markdown'))

export const ContentWrapperStyled = styled.section<{ noPadding: boolean }>`
  ${props => props.noPadding ? '' : 'padding: 15px;'}
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
  noPadding?: boolean;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, title, markDownPromise, codeLink, noPadding }) => {
  const [viewNotes, setViewNotes] = useState(false);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    (async () => {
      if (viewNotes && markDownPromise !== undefined) {
        const markdownModule = await markDownPromise;
        const markdownResponse = await fetch(markdownModule.default)
        const markdown = await markdownResponse.text()
        setMarkdown(markdown);
      }
    })();
  }, [viewNotes])
  return <>
    <ContentHeader>
      <ContentHeaderLabel role="complementary">{title}</ContentHeaderLabel>
      <ContentHeaderRight>
        <ContentHeaderIcon role="button" selected={!viewNotes} title="Run demo" onClick={() => setViewNotes(false)}>
          <MdOutlinePlayCircleOutline />
        </ContentHeaderIcon>
        {markDownPromise !== undefined && <ContentHeaderIcon role="button" selected={viewNotes} title="View notes" onClick={() => setViewNotes(true)}>
          <MdNotes />
        </ContentHeaderIcon>}
        {codeLink &&
          <a
            href={`${GITHUB_ROOT}${codeLink}`}
            role="button"
            aria-label="View source code on GitHub"
            target="_blank"
            rel="noopener noreferrer">
            <ContentHeaderIcon selected={false} title="View code on github">
              <GoMarkGithub />
            </ContentHeaderIcon>
          </a>}
      </ContentHeaderRight>
    </ContentHeader>
    <>
      {viewNotes &&
        <ContentWrapperArticle role="article">
          <Suspense fallback={<Loading />}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Suspense>
        </ContentWrapperArticle>}
      {!viewNotes &&
        <ContentWrapperStyled role="document" noPadding={!!noPadding}>{children}</ContentWrapperStyled>}
    </>
  </>
};