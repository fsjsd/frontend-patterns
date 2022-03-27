import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const NewsFeed = React.lazy(() => import('./NewsFeed'))

const NewsFeedContainer = () => {
  return (
    <ContentWrapper
      title='News feed'
      codeLink="/features/newsfeed"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <NewsFeed />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default NewsFeedContainer