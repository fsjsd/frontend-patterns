import React, { Suspense, useEffect, useState } from "react";
import { MdNotes, MdOutlinePlayCircleOutline } from "react-icons/md";
import { GoMarkGithub } from "react-icons/go";
import styled from "styled-components";
import { GITHUB_ROOT } from "../utils/constants/urls";
import ContentHeader, { ContentHeaderIcon, ContentHeaderLabel, ContentHeaderRight } from "./styles/ContentHeader";
import Loading from "./Loading";
import ContentArticle from "./styles/ContentWrapperArticle";
const ReactMarkdown = React.lazy(() => import('react-markdown'))

/**
 * Content Wrapper is the central container for all screens, and scrolls within
 * the horseshoe by default.
 */
export const ContentWrapperStyled = styled.section<{ noPadding: boolean }>`
  ${props => props.noPadding ? '' : 'padding: 15px;'}
  flex-grow: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

interface ContentWrapperProps {
  /** Screen title */
  title: string;
  /** Optional link to source code on GitHub */
  codeLink?: string;
  /** Optional promise to load Markdown notes */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markDownPromise?: Promise<any>;
  /** Optional flag to remove padding */
  noPadding?: boolean;
}

/**
 * Content Wrapper is the central container for all screens, and scrolls within
 * the horseshoe by default.
 * @param param0 props
 * @returns 
 */
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
      <ContentHeaderLabel>{title}</ContentHeaderLabel>
      <ContentHeaderRight>
        <ContentHeaderIcon role="button" selected={!viewNotes} title="Run demo" onClick={() => setViewNotes(false)}>
          <MdOutlinePlayCircleOutline />
        </ContentHeaderIcon>
        {markDownPromise !== undefined &&
          <ContentHeaderIcon
            role="button"
            selected={viewNotes}
            title="View notes"
            onClick={() => setViewNotes(true)}>
            <MdNotes />
          </ContentHeaderIcon>
        }
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
        <ContentArticle role="article">
          <Suspense fallback={<Loading />}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Suspense>
        </ContentArticle>}
      {!viewNotes &&
        <ContentWrapperStyled role="document" noPadding={!!noPadding}>{children}</ContentWrapperStyled>}
    </>
  </>
};