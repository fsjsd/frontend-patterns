import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
//import ReactMarkdown from 'react-markdown'

const ReactMarkdown = React.lazy(() => import('react-markdown'))

const InfiniteScrollContainer = () => {
  return (
    <>
      <ContentHeader>
        <ContentHeaderLabel>Infinite Scroll</ContentHeaderLabel>
      </ContentHeader>
      <ContentWrapper>
        <Suspense fallback={<Loading />}>
          <ReactMarkdown># Hello, *world*!</ReactMarkdown>
        </Suspense>
      </ContentWrapper>
    </>
  )
}

export default InfiniteScrollContainer
