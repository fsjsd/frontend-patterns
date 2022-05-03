import React, { PropsWithChildren, Suspense, useEffect, useState } from "react";
import { MdNotes, MdOutlinePlayCircleOutline } from "react-icons/md";
import { GoMarkGithub } from "react-icons/go";
import styled from "styled-components";
import { GITHUB_ROOT } from "../utils/constants/urls";
import { ScreenTransitionLoading } from './Loading';
import { ContentHeader, ContentHeaderLabel, ContentHeaderRight, ContentHeaderIcon, ContentArticle } from "./ContentContainerStyles";
const ReactMarkdown = React.lazy(() => import('react-markdown'))

/**
 * Content Wrapper is the central container for all screens, and scrolls within
 * the horseshoe by default.
 */
export const ContentWrapper = styled.section<{ noPadding: boolean }>`
  ${props => props.noPadding ? '' : 'padding: 15px;'}
  flex-grow: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling:touch;
`;

interface ContentContainerProps {
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
export const ContentContainer: React.FC<PropsWithChildren<ContentContainerProps>> = ({ children, title, markDownPromise, codeLink, noPadding }) => {
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
            href={deriveCodeLink(codeLink)}
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
          <Suspense fallback={<ScreenTransitionLoading />}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Suspense>
        </ContentArticle>}
      {!viewNotes &&
        <ContentWrapper role="document" noPadding={!!noPadding}>{children}</ContentWrapper>}
    </>
  </>
};

function deriveCodeLink(codeLink: string): string {
  return codeLink.startsWith("/") ? `${GITHUB_ROOT}${codeLink}` : codeLink;
}
