import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const InfiniteScroll = React.lazy(() => import('./InfiniteScroll'))

const InfiniteScrollContainer = () => {

  return (
    <ContentWrapper
      title="Infinite Scroll"
      codeLink="/features/infinitescroll"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <InfiniteScroll />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default InfiniteScrollContainer
