import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const InfiniteScroll = React.lazy(() => import('./InfiniteScroll'))

const InfiniteScrollContainer = () => {

  return (
    <ContentContainer
      title="Infinite Scroll"
      codeLink="/features/infinitescroll"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <InfiniteScroll />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default InfiniteScrollContainer
