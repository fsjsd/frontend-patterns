import React from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader';
import { ContentWrapper } from '../../ux/ContentWrapper';
//import ReactMarkdown from 'react-markdown'

const ReactMarkdown = React.lazy(() => import('react-markdown'));

const InfiniteScrollContainer = () => {

  return (
    <>
      <ContentHeader>
        <ContentHeaderLabel>Infinite Scroll</ContentHeaderLabel>
      </ContentHeader>
      <ContentWrapper>


        <ReactMarkdown>
          # Hello, *world*!
        </ReactMarkdown>
      </ContentWrapper>
    </>
  )
}

export default InfiniteScrollContainer